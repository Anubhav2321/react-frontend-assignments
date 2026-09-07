import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TaskContext } from '../context/TaskContext';
import { Calendar, Tag, Trash2, CheckCircle } from 'lucide-react';

const TasksList = ({ filter = 'all' }) => {
  const { tasks, loading, deleteTask, updateTask } = useContext(TaskContext);
  const navigate = useNavigate();

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading tasks...</div>;
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.status === 'Completed';
    return true; // For 'all' tasks, we can show everything, or maybe filter out completed based on preference. Let's show all.
  });

  const handleStatusToggle = (e, task) => {
    e.stopPropagation();
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    updateTask(task._id, { status: newStatus });
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if(window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="task-grid"
    >
      {filteredTasks.length === 0 ? (
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          No tasks found in this view.
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div 
            key={task._id} 
            className="glass-panel task-card"
            onClick={() => navigate(`/tasks/${task._id}`)}
          >
            <div className="task-card-header">
              <span className={`badge ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              <span className={`badge ${task.status.toLowerCase().replace(' ', '-')}`}>
                {task.status}
              </span>
            </div>
            
            <h3 className="task-card-title">{task.description}</h3>
            
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="task-card-meta">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Tag size={14} /> {task.category}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Calendar size={14} /> {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <button 
                  onClick={(e) => handleStatusToggle(e, task)}
                  className="theme-toggle" 
                  title={task.status === 'Completed' ? 'Mark Pending' : 'Mark Completed'}
                  style={{ color: task.status === 'Completed' ? 'var(--success)' : 'var(--text-muted)' }}
                >
                  <CheckCircle size={18} />
                </button>
                <button 
                  onClick={(e) => handleDelete(e, task._id)}
                  className="theme-toggle" 
                  title="Delete Task"
                  style={{ color: 'var(--danger)' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </motion.div>
  );
};

export default TasksList;
