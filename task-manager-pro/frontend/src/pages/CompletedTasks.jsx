import React from 'react';
import TaskCard from '../components/TaskCard';
import { useTasks } from '../context/TaskContext';

const CompletedTasks = () => {
  const { tasks, loading, updateTask, deleteTask, clearCompleted } = useTasks();
  
  const completedTasks = tasks.filter(t => t.status === 'Completed');

  const toggleStatus = (task) => {
    updateTask(task._id, { status: 'Pending' });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Confirm deletion of task?')) return;
    deleteTask(id);
  };

  const handleClearAll = () => {
    if (!window.confirm('Are you sure you want to clear all completed tasks?')) return;
    clearCompleted();
  };

  return (
    <div className="page-container">
      <div className="flex-between">
        <h2 className="page-title text-success">Completed Tasks</h2>
        {completedTasks.length > 0 && (
          <button className="btn btn-danger" onClick={handleClearAll}>
            Clear All Completed
          </button>
        )}
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="task-list mt-6">
          {completedTasks.length === 0 ? (
            <div className="empty-state">No completed tasks yet.</div>
          ) : (
            completedTasks.map(task => (
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

export default CompletedTasks;
