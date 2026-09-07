import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('');

  const filteredTransactions = transactions.filter(t => {
    const matchType = filterType === 'All' || t.type === filterType;
    const matchCat = filterCategory === '' || t.category.toLowerCase().includes(filterCategory.toLowerCase());
    return matchType && matchCat;
  });

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(num);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <div className="panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>Recent Transactions</h3>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <select 
          className="form-control" 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
          style={{ flex: 1 }}
        >
          <option value="All">All Types</option>
          <option value="Income">Income Only</option>
          <option value="Expense">Expense Only</option>
        </select>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Filter by category..." 
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{ flex: 2 }}
        />
      </div>

      <div className="list-group">
        {filteredTransactions.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '2rem 0' }}>No transactions found.</p>
        ) : (
          filteredTransactions.map(t => (
            <div key={t._id || Math.random()} className="list-item">
              <div className="list-item-content">
                <span className="list-item-title">{t.description}</span>
                <span className="list-item-meta">
                  {formatDate(t.date)} &bull; {t.category}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontWeight: 600, color: t.type === 'Income' ? 'var(--success)' : 'var(--text-primary)' }}>
                  {t.type === 'Income' ? '+' : '-'}{formatCurrency(t.amount)}
                </span>
                <button 
                  className="btn-icon danger" 
                  onClick={() => onDeleteTransaction(t._id)}
                  title="Delete Transaction"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;
