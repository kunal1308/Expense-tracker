import React,{useEffect, useState} from 'react';
import Modal from "react-modal";
import { useSnackbar } from 'notistack';
import { Box } from '@mui/material';
import styles from './Expense.module.css'

Modal.setAppElement("#root");

const ExpenseForm = ({addExpense,editExpense,closeModal,currentExpense}) => {
  const {enqueueSnackbar} = useSnackbar();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] =useState("");
  const [date, setDate] = useState("");

  useEffect(()=> {
    if(currentExpense){
        setTitle(currentExpense.title);
        setPrice(currentExpense.price);
        setCategory(currentExpense.category);
        setDate(currentExpense.date);
    }
  },[currentExpense]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const handleTitleChange = (e) => {
        const newValue = capitalizeFirstLetter(e.target.value);
        setTitle(newValue)
    }
    const handleCategoryChange = (e) => {
        const newValue = capitalizeFirstLetter(e.target.value);
        setCategory(newValue)
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title || !price || !category || !date) {
        enqueueSnackbar("Please fill out all fields",{variant: "error"});
        return;
    }
    const newExpense = {
        id: currentExpense ? currentExpense.id : Math.random().toString(36).substring(2,9),
        title,
        price: parseFloat(price),
        category,
        date: new Date(date).toLocaleDateString('en-US', {
            month: "long",
            day: "numeric",
            year: "numeric"
        })
    };
    if(currentExpense) {
        editExpense(newExpense);
        enqueueSnackbar("Expense updated successfully",{variant: "success"});
    }else {
        addExpense(newExpense);
    }
    closeModal();
  }
    return (
    <Modal
    isOpen={true}
    onRequestClose={closeModal}
    className="modal"
    overlayClassName="overlay"
    contentLabel='Expense Form Modal'
    >
        <Box display="flex" flexDirection='column' width="100%" height="100%" bgcolor="lightgrey" borderRadius="10px">
            <p className={styles.heading}>{currentExpense ? "Edit Expense" : "Add Expenses"}</p>
            <form onSubmit={handleSubmit}
            style={{
                display:"flex",
                flexDirection:"column",
                width:"100%",
                height:"auto"
            }}>
                <Box display="flex" flexDirection="row" justifyContent="space-around" marginBottom={2.5}>
                    <input className={styles.input} type='text' placeholder='Title'
                    value={title}
                    onChange={handleTitleChange}></input>

                    <input className={styles.input} type='number' placeholder='Price' 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="space-around" marginBottom={2.5}>
               
                    <input className={styles.input} type='text' placeholder='Select category'
                    value={category}
                    onChange={handleCategoryChange}></input>

                    <input className={styles.input1} type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}></input>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="space-around" paddingBottom={2}>
                <button className={styles.submitBtn} type='submit'>{currentExpense ? "Edit Expense" : "Add Expense"}</button>
                <button className={styles.cancelBtn} type="button"
                onClick={closeModal}>Cancel</button>
                </Box>
            </form>
        </Box>
    </Modal>
  )
}

export default ExpenseForm
