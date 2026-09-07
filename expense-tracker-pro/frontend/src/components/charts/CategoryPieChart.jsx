import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

const CategoryPieChart = ({ transactions }) => {
  const expenses = transactions.filter(t => t.type === 'Expense');
  
  const categoryMap = {};
  expenses.forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const data = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  }));

  if (data.length === 0) {
    return (
      <div className="panel" style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>No expense data for pie chart.</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <h3 style={{ marginBottom: '1rem' }}>Expenses by Category</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryPieChart;
