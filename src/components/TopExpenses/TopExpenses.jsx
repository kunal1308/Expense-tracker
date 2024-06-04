import React from 'react';
import styles from './TopExpenses.module.css'

const TopExpenses = ({topExpenses}) => {
    const sortedExpenses = topExpenses.sort((a,b) => b.price-a.price);
    const maxPrice = Math.max(...sortedExpenses.map(expense => expense.price));
  return (
   <>
    {sortedExpenses.map((category, index)=> (
        <div className={styles.main}>
            <span className={styles.category}>{category.category}</span>
            <span className={styles.graph} key={index} style={{width:`${(category.price/maxPrice)*100}%`}}>
        </span>
        </div>
        
    ))}
   </>
  )
}

export default TopExpenses
