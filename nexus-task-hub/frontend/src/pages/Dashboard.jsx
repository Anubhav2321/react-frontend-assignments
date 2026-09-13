import React, { useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TaskContext } from '../context/TaskContext';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { CheckCircle2, Clock, AlertCircle, ListTodo } from 'lucide-react';

const Dashboard = () => {
  const { tasks } = useContext(TaskContext);

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const highPriority = tasks.filter(t => t.priority === 'High' && t.status !== 'Completed').length;

  // Mock data for the chart based on last 7 days
  const chartData = useMemo(() => {
    const data = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      // For a real app, you would filter completed tasks by date here.
      // Mocking a rising trend for the premium 3D look.
      data.push({
        name: dateString,
        completed: Math.floor(Math.random() * 5) + (completedTasks / 7),
        added: Math.floor(Math.random() * 8) + 2,
      });
    }
    return data;
  }, [completedTasks]);

  const stats = [
    { label: 'Total Tasks', value: totalTasks, icon: <ListTodo size={24} />, color: 'var(--primary)' },
    { label: 'Completed', value: completedTasks, icon: <CheckCircle2 size={24} />, color: 'var(--success)' },
    { label: 'Pending', value: pendingTasks, icon: <Clock size={24} />, color: 'var(--warning)' },
    { label: 'High Priority', value: highPriority, icon: <AlertCircle size={24} />, color: 'var(--danger)' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', borderRadius: '12px', background: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>{stat.label}</p>
              <h3 style={{ fontSize: '1.875rem', margin: 0, color: 'var(--text-main)' }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel chart-container">
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Productivity Overview</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Task completion rate over the last 7 days</p>
        </div>
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
              </linearGradient>
              <filter id="shadow" height="200%">
                <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="var(--primary)" floodOpacity="0.2"/>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)', borderRadius: '8px', backdropFilter: 'blur(10px)', color: 'var(--text-main)' }}
              itemStyle={{ color: 'var(--text-main)' }}
            />
            <Area 
              type="monotone" 
              dataKey="completed" 
              stroke="var(--primary)" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorCompleted)" 
              filter="url(#shadow)"
              activeDot={{ r: 8, strokeWidth: 0, fill: 'var(--primary)', filter: 'url(#shadow)' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default Dashboard;
