import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DailyTrendLine = ({ transactions }) => {
  const expenses = transactions.filter(t => t.type === 'Expense');
  
  const dailyData = {};
  expenses.forEach(t => {
    const dateStr = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (!dailyData[dateStr]) {
      dailyData[dateStr] = 0;
    }
    dailyData[dateStr] += t.amount;
  });

  const data = Object.keys(dailyData).map(key => ({
    date: key,
    amount: dailyData[key]
  }));

  // Sort by actual date if possible, assuming keys are like 'Jan 1', 'Jan 2' might be tricky to sort purely alphabetically.
  // A better approach is to sort the transactions first.
  
  // Since we want recent 7-14 days maybe? Let's just show what we have.
  // Actually, we should parse the dates back or ensure transactions are sorted ascending for the chart.

  if (data.length === 0) {
    return (
      <div className="panel" style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>No daily expense data for trend line.</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <h3 style={{ marginBottom: '1rem' }}>Daily Expense Trend</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
            <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} />
            <Tooltip 
              formatter={(value) => `₹${value.toFixed(2)}`}
              contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--text-primary)' }}
            />
            <Line type="monotone" dataKey="amount" stroke="var(--accent-color)" strokeWidth={3} dot={{ r: 4, fill: 'var(--accent-color)' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyTrendLine;
