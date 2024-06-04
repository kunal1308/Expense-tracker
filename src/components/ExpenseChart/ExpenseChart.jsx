import React from 'react';
import { PieChart,Pie,Cell,ResponsiveContainer,Tooltip,Label} from 'recharts';
import styles from './ExpenseChart.module.css';
const Categories_colors = {
  ENTERTAINMENT: "#FFA500",
  FOOD: "#800080",
  TRAVEL: "#FFFF00",
  OTHER: "#8884d8"
};

const ExpenseChart = ({topExpenses}) => {
  const categoriesInData = topExpenses.map(entry => entry.category);
  const colorsForChart = Object.keys(Categories_colors).filter(category => categoriesInData.includes(category));


  return (
    <ResponsiveContainer width="30%" height="78%" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
   <PieChart>
    <Pie dataKey="price" 
    nameKey="category"
    data={topExpenses}
    cx="50%"
    cy="50%"
    outerRadius="5em"
    fill="green">
    {topExpenses.map((entry,index)=>(
      <Cell key={`cell-${index}`} 
      fill={Categories_colors[entry.category] || Categories_colors.OTHER} />
    ))}
    <Label />
    </Pie>
    <Tooltip />
   </PieChart>
   <div className={styles.labels}>
    {colorsForChart.map(category => (
      <div className={styles.label} key={category}>
      <span style={{display:"inline-block",width:"1em",height:"1em", marginRight:"0.5em", marginLeft:"0.5em", backgroundColor:Categories_colors[category]}}></span>
      {category}
    </div>
    ))}
   </div>
   </ResponsiveContainer>
  )
}

export default ExpenseChart
