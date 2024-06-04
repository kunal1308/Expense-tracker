import React,{useState} from 'react';
import Modal from "react-modal";
import { useSnackbar } from 'notistack';
import { Box } from '@mui/material';
import styles from './Income.module.css';

Modal.setAppElement("#root");

const IncomeForm = ({addIncome, closeModal}) => {
    const {enqueueSnackbar} = useSnackbar();
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!amount) {
            enqueueSnackbar("Please fill out all fields",{variant: "error"});
        return;
        }
        const newIncome = parseFloat(amount);
        addIncome(newIncome);
        closeModal();
        enqueueSnackbar("Amount added successfully", {variant: "success"})
    }
  return (
    <Modal
    isOpen={true}
    onRequestClose={closeModal}
    className="modal"
    overlayClassName="overlay"
    contentLabel='Income Form Modal'
    >
        <Box display="flex" flexDirection='column' width="110%" height="100%" bgcolor="lightgrey" borderRadius="10px">
            <p className={styles.heading}>Add Balance</p>
            <form onSubmit={handleSubmit}
            style={{
                display:"flex",
                flexDirection:"column",
                width:"100%",
                height:"auto"
            }}>
                 <Box display="flex" flexDirection="row" justifyContent="space-evenly" marginBottom={2.5}>
                 <input type='number'className={styles.input} placeholder='Income Amount'
                    value={amount}
                    onChange={(e)=> setAmount(e.target.value)} />
                    <button type='submit' className={styles.addIncomeBtn}>Add Balance</button>
                    <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                </Box>
            </form>
        </Box>
    </Modal>
  )
}

export default IncomeForm
