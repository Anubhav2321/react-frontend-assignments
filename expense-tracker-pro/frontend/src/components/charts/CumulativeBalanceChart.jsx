import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CumulativeBalanceChart = ({ transactions }) => {
  // Sort transactions by date ascending
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  let currentBalance = 0;
  const dataMap = {};

  sorted.forEach(t => {
    const dateStr = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    if (t.type === 'Income') {
      currentBalance += t.amount;
    } else {
      currentBalance -= t.amount;
    }

    // Keep the latest balance for that day
    dataMap[dateStr] = currentBalance;
  });

  const data = Object.keys(dataMap).map(key => ({
    date: key,
    balance: dataMap[key]
  }));

  if (data.length === 0) {
    return (
      <div className="panel" style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>No data for cumulative balance chart.</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <h3 style={{ marginBottom: '1rem' }}>Cumulative Balance Over Time</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
            <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} />
            <Tooltip 
              formatter={(value) => `₹${value.toFixed(2)}`}
              contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--text-primary)' }}
            />
            <Area type="monotone" dataKey="balance" stroke="var(--accent-color)" fillOpacity={1} fill="url(#colorBalance)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CumulativeBalanceChart;
