import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TaskContext } from '../context/TaskContext';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, loading: contextLoading } = useContext(TaskContext);
  
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const task = tasks.find((t) => t._id === id);
    if (task) {
      // format date for input field (YYYY-MM-DD)
      const formattedDate = new Date(task.dueDate).toISOString().split('T')[0];
      setFormData({
        ...task,
        dueDate: formattedDate,
      });
    }
  }, [id, tasks]);

  if (contextLoading || !formData) {
    return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading task details...</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      await updateTask(id, {
        description: formData.description,
        priority: formData.priority,
        category: formData.category,
        dueDate: formData.dueDate,
        status: formData.status,
      });
      navigate('/tasks');
    } catch (err) {
      setErrorMsg('Failed to update task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Edit Task Details</h2>
        
        {errorMsg && <div className="error-msg" style={{ marginBottom: '1rem' }}>{errorMsg}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Description</label>
            <input 
              type="text" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="premium-input"
              required 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.25rem' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange} className="premium-input">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="premium-input">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Category</label>
            <input 
              type="text" 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              className="premium-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Due Date</label>
            <input 
              type="date" 
              name="dueDate" 
              value={formData.dueDate} 
              onChange={handleChange} 
              className="premium-input"
              required 
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="premium-button secondary" onClick={() => navigate(-1)}>
              Back
            </button>
            <button type="submit" className="premium-button" disabled={loading}>
              {loading ? 'Updating...' : 'Update Task'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default TaskDetails;
