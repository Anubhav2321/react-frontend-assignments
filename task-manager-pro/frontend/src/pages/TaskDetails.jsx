import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import './Form.css';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask } = useTasks();
  
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form states for updating
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const foundTask = tasks.find(t => t._id === id);
    if (foundTask) {
      setTask(foundTask);
      setDescription(foundTask.description);
      setPriority(foundTask.priority);
      setCategory(foundTask.category || '');
      setStatus(foundTask.status);
    }
    setLoading(false);
  }, [id, tasks]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTask(id, { description, priority, category, status });
    navigate(status === 'Completed' ? '/completed' : '/tasks');
  };

  if (loading) return <div className="loading">Loading Data...</div>;
  if (!task) return <div className="error text-danger text-center mt-6">Task Not Found</div>;

  return (
    <div className="page-container form-page">
      <h2 className="page-title">Task Details</h2>
      
      <div className="form-card glass-card">
        <form onSubmit={handleUpdate} className="premium-form">
          <div className="form-group">
            <label className="form-label">Description</label>
            <input 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="form-input"
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                className="form-input"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <input 
                type="text" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="form-input"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-actions mt-6">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
