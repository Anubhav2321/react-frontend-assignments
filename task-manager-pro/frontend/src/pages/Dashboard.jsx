import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('dummy-auth-token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  
  const highPriority = tasks.filter(t => t.priority === 'High' && t.status === 'Pending').length;
  
  const pieData = [
    { name: 'Pending', value: pendingTasks },
    { name: 'Completed', value: completedTasks }
  ];
  
  const COLORS = ['#00f3ff', '#39ff14']; // Cyan for pending, Neon Green for completed

  const priorityData = [
    { name: 'High', count: tasks.filter(t => t.priority === 'High').length },
    { name: 'Medium', count: tasks.filter(t => t.priority === 'Medium').length },
    { name: 'Low', count: tasks.filter(t => t.priority === 'Low').length }
  ];

  if (loading) return <div className="loading neon-text">LOADING METRICS...</div>;

  return (
    <div className="page-container dashboard-page">
      <h2 className="page-title">System Status Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p className="stat-value neon-text">{tasks.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-value cyan-text">{pendingTasks}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-value green-text">{completedTasks}</p>
        </div>
        <div className="stat-card alert-card">
          <h3>High Priority</h3>
          <p className="stat-value red-text">{highPriority}</p>
        </div>
      </div>

      <div className="charts-container mt-6">
        <div className="chart-wrapper">
          <h3 className="chart-title">Completion Ratio</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#050505', border: '1px solid #00f3ff' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-wrapper">
          <h3 className="chart-title">Tasks by Priority</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <XAxis dataKey="name" stroke="#888" tick={{ fill: '#00f3ff' }} />
              <YAxis stroke="#888" tick={{ fill: '#00f3ff' }} />
              <Tooltip 
                cursor={{ fill: 'rgba(0, 243, 255, 0.1)' }}
                contentStyle={{ backgroundColor: '#050505', border: '1px solid #ff003c' }}
              />
              <Bar dataKey="count" fill="#ff003c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
