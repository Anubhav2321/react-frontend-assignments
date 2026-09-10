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
  
  const COLORS = ['#3b82f6', '#10b981']; // Primary Blue for pending, Success Green for completed

  const priorityData = [
    { name: 'High', count: tasks.filter(t => t.priority === 'High').length },
    { name: 'Medium', count: tasks.filter(t => t.priority === 'Medium').length },
    { name: 'Low', count: tasks.filter(t => t.priority === 'Low').length }
  ];

  if (loading) return <div className="loading">Loading Metrics...</div>;

  return (
    <div className="page-container dashboard-page">
      <h2 className="page-title">System Status Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card glass-card">
          <h3>Total Tasks</h3>
          <p className="stat-value">{tasks.length}</p>
        </div>
        <div className="stat-card glass-card">
          <h3>Pending</h3>
          <p className="stat-value text-primary">{pendingTasks}</p>
        </div>
        <div className="stat-card glass-card">
          <h3>Completed</h3>
          <p className="stat-value text-success">{completedTasks}</p>
        </div>
        <div className="stat-card glass-card alert-card">
          <h3>High Priority</h3>
          <p className="stat-value text-danger">{highPriority}</p>
        </div>
      </div>

      <div className="charts-container mt-6">
        <div className="chart-wrapper glass-card">
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
                contentStyle={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-dim)', borderRadius: '8px', color: 'var(--text-main)' }}
                itemStyle={{ color: 'var(--text-main)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-wrapper glass-card">
          <h3 className="chart-title">Tasks by Priority</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-dim)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
              <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
              <Tooltip 
                cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                contentStyle={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-dim)', borderRadius: '8px', color: 'var(--text-main)' }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
