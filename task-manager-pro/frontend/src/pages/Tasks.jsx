import React, { useState } from 'react';
import TaskCard from '../components/TaskCard';
import { useTasks } from '../context/TaskContext';

const Tasks = () => {
  const { tasks, loading, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState('All'); // All, High, Medium, Low
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt'); // createdAt, dueDate, priority

  const toggleStatus = (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    updateTask(task._id, { status: newStatus });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Confirm deletion of task?')) return;
    deleteTask(id);
  };

  const filteredTasks = tasks.filter(t => {
    if (t.status === 'Completed') return false; // Show only pending in this view
    if (search && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === 'All') return true;
    return t.priority === filter;
  }).sort((a, b) => {
    if (sortBy === 'priority') {
      const p = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return (p[b.priority] || 0) - (p[a.priority] || 0);
    }
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="page-container">
      <div className="flex-between mb-4">
        <h2 className="page-title">Active Tasks</h2>
        
        <div className="actions-group flex items-center gap-4">
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="form-input" 
            style={{ width: 'auto', padding: '0.4rem 1rem' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
          <select 
            className="form-input" 
            style={{ width: 'auto', padding: '0.4rem 1rem' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Newest</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
      
      <div className="filter-group mb-4">
        {['All', 'High', 'Medium', 'Low'].map(f => (
          <button 
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">No active tasks found matching criteria.</div>
          ) : (
            filteredTasks.map(task => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onStatusToggle={toggleStatus}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
