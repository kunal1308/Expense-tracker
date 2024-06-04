import React from 'react';
import styles from "./Transaction.module.css";


const Transactions = ({expenses, onDelete, onEdit}) => {
    const {title,price,date} = expenses;

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <div className={styles.data}>
        <div>{title}</div>
        <div>{date}</div>
        </div>
        <div className={styles.price}>{price}</div>
      </div>
      <div className={styles.right}>
        <button className={styles.deleteBtn} onClick={onDelete}>{String.fromCharCode(10006)}</button>
        <button className={styles.editBtn} onClick={onEdit}>{String.fromCharCode(9998)}</button>
      </div>
    </div>
  )
}

export default Transactions
