import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CashflowBarChart = ({ transactions }) => {
  // Aggregate data by month-year
  const monthlyData = {};

  transactions.forEach(t => {
    const date = new Date(t.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { name: monthYear, Income: 0, Expense: 0 };
    }
    
    if (t.type === 'Income') {
      monthlyData[monthYear].Income += t.amount;
    } else {
      monthlyData[monthYear].Expense += t.amount;
    }
  });

  const data = Object.values(monthlyData).reverse(); // Assuming older first if we reverse, actually let's not reverse here, better to sort by date.

  // To sort properly by date
  data.sort((a, b) => {
    const timeA = new Date(a.name).getTime();
    const timeB = new Date(b.name).getTime();
    return timeA - timeB;
  });

  if (data.length === 0) {
    return (
      <div className="panel" style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>No data for cashflow chart.</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <h3 style={{ marginBottom: '1rem' }}>Income vs Expense</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
            <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} />
            <Tooltip 
              formatter={(value) => `₹${value.toFixed(2)}`}
              contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--text-primary)' }}
            />
            <Legend />
            <Bar dataKey="Income" fill="var(--success)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expense" fill="var(--danger)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CashflowBarChart;
