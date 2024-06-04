import React, {useEffect, useState} from 'react';
import {Box,Container} from "@mui/material";
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import IncomeForm from '../IncomeForm/IncomeForm';
import { useSnackbar } from 'notistack';
import ExpenseChart from '../ExpenseChart/ExpenseChart';
import Transactions from '../Recent-Transactions/Transactions';
import TopExpenses from '../TopExpenses/TopExpenses';
import styles from './ExpenseTracker.module.css'

const ExpenseTracker = () => {
  const {enqueueSnackbar} = useSnackbar();
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [totalExpenses, setTotalExpenses] = useState(null);
  const [walletBal, setWalletBal] = useState(()=>{
    const storedBal = localStorage.getItem("walletBal");
    return storedBal ? parseFloat(storedBal) : 5000;
  });
  const [expenses, setExpenses] = useState(()=> {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  const [currentExpense,setCurrentExpense] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, expenses.length);

  const currentPageExpenses = expenses.slice(startIndex,endIndex);


  useEffect(()=> {
    localStorage.setItem("walletBal", walletBal.toString());
  },[walletBal]);

  useEffect(()=> {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  },[expenses]);

  const addIncome = (newIncome) => {
    setWalletBal(prevBal => prevBal + parseFloat(newIncome));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
};

  const addExpense = (newExpense) => {
    const {id, title, price, category, date} = newExpense;
    if(parseFloat(newExpense.price) > walletBal) {
      enqueueSnackbar("Insufficient funds", {variant:"error"});
      return;
    }else {
      setExpenses([...expenses, {id, title,price,category,date}]);
      enqueueSnackbar("Expense added successfully", {
        variant: "success"
    });
    const updatedWalletBal = walletBal - parseFloat(newExpense.price);
    setWalletBal(updatedWalletBal);
    }
  };

  const handleDeleteExpense = (id) => {
    const filteredTransactions = expenses.filter(expense => expense.id !== id);
    setExpenses(filteredTransactions);
    const deletedExpense = expenses.find(expense => expense.id === id);
    setWalletBal(walletBal + deletedExpense.price);
  };

  const editExpense = (updatedExpense) =>{
    const updatedExpenses =  expenses.map(expense=> expense.id === updatedExpense.id ? updatedExpense: expense);
    setExpenses(updatedExpenses);
    const expenseDifference = updatedExpense.price - currentExpense.price;
    setWalletBal(walletBal - expenseDifference);
    setCurrentExpense(null);
  };

  const handleEditClick = (expense) => {
    setCurrentExpense(expense);
    setShowExpenseForm(true);
  }


  useEffect(() => {
    const getTotalExpenses = () => {
      return expenses.reduce((total,expense) => {
        const expenseAmount = parseFloat(expense.price);
        return isNaN(expenseAmount) ? 
        total : total + expenseAmount},0);
    }
    console.log(getTotalExpenses())
    setTotalExpenses(getTotalExpenses);
  },[expenses]);

const topExpenses = expenses.reduce((acc,expense) => {
    const category = expense.category.toUpperCase();
    const existingCategory = acc.find(item => item.category === category);
    if(existingCategory) {
      existingCategory.price += parseFloat(expense.price);
    }else {
      acc.push({
        category: category,
        price: parseFloat(expense.price)
      });
    }
    return acc;
  },[]);




  return (
    <Container>
      <Box height="100%" width="100%" display="flex" flexDirection="column" alignItems="center">
      <div className={styles.container}>
        <div className={styles.left}>
        <div className={styles.wallet}>
        <span className={styles.typographyLeft}>Wallet Balance: <span className={styles.valueLeft}>{walletBal}</span></span>
        <button className={styles.addBtn} variant="contained" style={{background:'green'}} onClick={()=>setShowIncomeForm(true)}>+ Add Income</button>
      </div>
      <div className={styles.expense}>
      <span className={styles.typographyLeft}>Expenses: <span className={styles.valueLeft} style={{color:"orange"}}>{totalExpenses}</span></span>
      <button className={styles.addBtn} variant="contained" style={{background:'red'}} onClick={()=>setShowExpenseForm(true)}>+ Add Expense</button>
      </div>
        </div>
        {showExpenseForm && <ExpenseForm 
        addExpense={addExpense}
        editExpense={editExpense}
        closeModal={()=> setShowExpenseForm(false)}
        currentExpense={currentExpense} />}
        {showIncomeForm && <IncomeForm 
        addIncome={addIncome}
        closeModal={()=>setShowIncomeForm(false)}/>}
        <ExpenseChart topExpenses={topExpenses} />
      </div>
      <Box mt={2} ml={0} display="flex" flexDirection="row" justifyContent="space-evenly" height="55vh" width="100%">
      <Box width="62%" height="95%" display="flex" flexDirection='column'>
        <span className={styles.transactionHead}>Recent Transactions</span>
        <Box width="100%" height="85%" bgcolor="white" borderRadius="10px" display="flex" flexDirection="column" justifyContent="space-between">
          <div>{currentPageExpenses.map((expense,index) => (
            <div key={expense.id}>
              <Transactions key={expense.id}
            expenses={expense}
            onDelete={()=>handleDeleteExpense(expense.id)}
            onEdit={()=>handleEditClick(expense)}
            />
            {index < expenses.length && <hr />}
            </div>
          ))}</div>
         <div style={{display:"flex", justifyContent:"center", height:"2em", alignItems:"center"}}>
        {currentPage > 1 && <button onClick={()=>handlePageChange(currentPage - 1)}>&lsaquo;</button>}
        <p style={{padding:"0.5rem"}}>{currentPage}</p>
        {currentPage < Math.ceil(expenses.length/itemsPerPage) && <button onClick={()=>handlePageChange(currentPage + 1)}>&rsaquo;</button>}
      </div>
        </Box>
      </Box>
      <Box width="35%" height="95%" display="flex" flexDirection='column' alignItems="flex-start">
        <span className={styles.transactionHead} color="white">Top Expenses</span>
        <Box width="100%" height="85%" bgcolor="white" borderRadius="10px">
          <TopExpenses topExpenses={topExpenses}/>
        </Box>
      </Box>
      </Box>
      </Box>
      </Container>
  )
}

export default ExpenseTracker;
