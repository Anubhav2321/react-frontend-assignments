import React from 'react';

const DashboardStats = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const totalExpense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const balance = totalIncome - totalExpense;

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(num);
  };

  return (
    <div className="stats-container">
      <div className="stat-card">
        <span className="stat-title">Current Balance</span>
        <span className={`stat-value ${balance < 0 ? 'danger' : 'success'}`}>
          {formatCurrency(balance)}
        </span>
      </div>
      <div className="stat-card">
        <span className="stat-title">Total Income</span>
        <span className="stat-value success">{formatCurrency(totalIncome)}</span>
      </div>
      <div className="stat-card">
        <span className="stat-title">Total Expense</span>
        <span className="stat-value danger">{formatCurrency(totalExpense)}</span>
      </div>
    </div>
  );
};

export default DashboardStats;
