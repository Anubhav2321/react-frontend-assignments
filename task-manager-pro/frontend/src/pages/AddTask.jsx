import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import './Form.css';

const AddTask = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('General');
  const [dueDate, setDueDate] = useState('');

  const { addTask } = useTasks();

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      description,
      priority,
      category,
      dueDate
    });
    navigate('/tasks');
  };

  return (
    <div className="page-container form-page">
      <h2 className="page-title">Initialize New Task</h2>
      
      <div className="form-card glass-card">
        <form onSubmit={handleSubmit} className="premium-form">
          <div className="form-group">
            <label className="form-label">Task Description</label>
            <input 
              type="text" 
              value={description} 
              onChange={handleDescriptionChange} 
              className="form-input"
              placeholder="Describe the objective..."
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
                <option value="High">High (Critical)</option>
                <option value="Medium">Medium (Standard)</option>
                <option value="Low">Low (Minor)</option>
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
            <label className="form-label">Due Date</label>
            <input 
              type="date" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)} 
              className="form-input"
            />
          </div>

          <div className="form-actions mt-6">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/tasks')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
