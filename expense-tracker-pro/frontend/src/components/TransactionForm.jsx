import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'Expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category || !formData.description) return;
    
    onAddTransaction({
      ...formData,
      amount: Number(formData.amount),
    });

    setFormData({
      amount: '',
      type: 'Expense',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
    });
  };

  return (
    <div className="panel">
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <div className="form-group">
          <label className="form-label">Type</label>
          <select 
            name="type" 
            className="form-control" 
            value={formData.type} 
            onChange={handleChange}
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Amount</label>
          <input 
            type="number" 
            name="amount" 
            className="form-control" 
            value={formData.amount} 
            onChange={handleChange}
            placeholder="e.g. 50"
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <input 
            type="text" 
            name="category" 
            className="form-control" 
            value={formData.category} 
            onChange={handleChange}
            placeholder="e.g. Groceries"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date</label>
          <input 
            type="date" 
            name="date" 
            className="form-control" 
            value={formData.date} 
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <input 
            type="text" 
            name="description" 
            className="form-control" 
            value={formData.description} 
            onChange={handleChange}
            placeholder="What was this for?"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Add Record
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
