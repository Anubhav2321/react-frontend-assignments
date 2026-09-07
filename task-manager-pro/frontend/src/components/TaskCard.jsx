import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Tag, AlertCircle } from 'lucide-react';
import './TaskCard.css';

const TaskCard = ({ task, onStatusToggle, onDelete }) => {
  const navigate = useNavigate();
  
  // Neon glow class based on priority
  let priorityClass = 'priority-medium';
  if (task.priority === 'High') priorityClass = 'priority-high';
  if (task.priority === 'Low') priorityClass = 'priority-low';

  const isCompleted = task.status === 'Completed';

  return (
    <div className={`task-card ${priorityClass} ${isCompleted ? 'completed-card' : ''}`}>
      <div className="task-card-content" onClick={() => navigate(`/tasks/${task._id}`)}>
        <h3 className={`task-title ${isCompleted ? 'strike-through' : ''}`}>
          {task.description}
        </h3>
        
        <div className="task-meta">
          <span className="meta-item category">
            <Tag size={14} /> {task.category || 'General'}
          </span>
          <span className={`meta-item priority ${priorityClass}-text`}>
            <AlertCircle size={14} /> {task.priority}
          </span>
          {task.dueDate && (
            <span className="meta-item due-date">
              <Calendar size={14} /> {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      
      <div className="task-card-actions">
        <button 
          className={`action-btn toggle-btn ${isCompleted ? 'undo' : 'complete'}`}
          onClick={(e) => { e.stopPropagation(); onStatusToggle(task); }}
        >
          {isCompleted ? 'Undo' : 'Complete'}
        </button>
        <button 
          className="action-btn delete-btn"
          onClick={(e) => { e.stopPropagation(); onDelete(task._id); }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
