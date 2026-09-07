import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TaskContext } from '../context/TaskContext';

const AddTask = () => {
  const [formData, setFormData] = useState({
    description: '',
    priority: 'Medium',
    category: 'General',
    dueDate: '',
    status: 'Pending',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const { addTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      await addTask(formData);
      navigate('/tasks');
    } catch (err) {
      setErrorMsg('Failed to add task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Create New Task</h2>
        
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
              placeholder="What needs to be done?"
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
              placeholder="e.g., Work, Personal, Assignment"
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
              Cancel
            </button>
            <button type="submit" className="premium-button" disabled={loading}>
              {loading ? 'Saving...' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddTask;
