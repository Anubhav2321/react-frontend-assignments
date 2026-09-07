import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu } from 'lucide-react';
import './Form.css';

const AddTask = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('General');
  const [dueDate, setDueDate] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAutoSuggest = async () => {
    if (!description) return;
    setIsSuggesting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/groq-suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description })
      });
      
      if (response.ok) {
        const data = await response.json();
        setPriority(data.suggestedPriority);
        setCategory(data.suggestedCategory);
      }
    } catch (error) {
      console.error('Error suggesting category/priority:', error);
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('dummy-auth-token')}`
        },
        body: JSON.stringify({
          description, priority, category, dueDate
        })
      });
      
      if (res.ok) {
        navigate('/tasks');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="page-container form-page">
      <h2 className="page-title">Initialize New Task</h2>
      
      <div className="form-card">
        <form onSubmit={handleSubmit} className="cyber-form">
          <div className="form-group">
            <label>Task Description</label>
            <div className="input-with-action">
              <input 
                type="text" 
                value={description} 
                onChange={handleDescriptionChange} 
                className="cyber-input"
                placeholder="Describe the objective..."
                required 
              />
              <button 
                type="button" 
                className="ai-btn"
                onClick={handleAutoSuggest}
                disabled={!description || isSuggesting}
                title="Use AI to auto-suggest Priority and Category"
              >
                <Cpu size={18} className={isSuggesting ? 'spin' : ''} />
                <span>AI Suggest</span>
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                className="cyber-select"
              >
                <option value="High">High (Critical)</option>
                <option value="Medium">Medium (Standard)</option>
                <option value="Low">Low (Minor)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <input 
                type="text" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="cyber-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input 
              type="date" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)} 
              className="cyber-input"
            />
          </div>

          <div className="form-actions mt-6">
            <button type="button" className="cyber-btn secondary-btn" onClick={() => navigate('/tasks')}>
              Cancel
            </button>
            <button type="submit" className="cyber-btn primary-btn">
              CREATE TASK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
