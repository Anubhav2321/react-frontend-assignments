import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';

const CompletedTasks = () => {
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
        // Filter only completed
        setTasks(data.filter(t => t.status === 'Completed'));
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (task) => {
    const newStatus = 'Pending';
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

  return (
    <div className="page-container">
      <h2 className="page-title text-success">Completed Tasks</h2>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">No completed tasks yet.</div>
          ) : (
            tasks.map(task => (
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

export default CompletedTasks;
