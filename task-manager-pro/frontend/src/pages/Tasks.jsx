import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All'); // All, High, Medium, Low
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

  const toggleStatus = async (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('dummy-auth-token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Confirm deletion of task?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('dummy-auth-token')}` }
      });
      if (res.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (t.status === 'Completed') return false; // Show only pending in this view
    if (filter === 'All') return true;
    return t.priority === filter;
  });

  return (
    <div className="page-container">
      <div className="flex-between">
        <h2 className="page-title">Active Tasks</h2>
        <div className="filter-group">
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
      </div>

      {loading ? (
        <div className="loading neon-text">LOADING...</div>
      ) : (
        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="empty-state">No active tasks found matching criteria.</p>
          ) : (
            filteredTasks.map(task => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onStatusToggle={toggleStatus}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
