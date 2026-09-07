import React, { useState, useEffect } from 'react';
import { Moon, Sun, Download } from 'lucide-react';

import DashboardStats from './components/DashboardStats';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategoryPieChart from './components/charts/CategoryPieChart';
import CashflowBarChart from './components/charts/CashflowBarChart';
import DailyTrendLine from './components/charts/DailyTrendLine';
import CumulativeBalanceChart from './components/charts/CumulativeBalanceChart';

import { 
  fetchAndSyncTransactions, 
  addTransaction as apiAddTransaction, 
  deleteTransaction as apiDeleteTransaction,
  getLocalTransactions
} from './utils/localStoreSync';
import { exportToCSV } from './utils/csvExporter';

function App() {
  const [theme, setTheme] = useState('light');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Fetch Data on Load
  useEffect(() => {
    // Optimistically load from local storage
    const localData = getLocalTransactions();
    if (localData && localData.length > 0) {
      setTransactions(localData);
      setLoading(false);
    }

    // Sync with backend
    fetchAndSyncTransactions().then(data => {
      setTransactions(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const handleAddTransaction = async (tx) => {
    // Optimistic UI update could be added here
    try {
      const updated = await apiAddTransaction(tx);
      setTransactions(updated);
    } catch (error) {
      alert("Failed to add transaction. Please check your backend connection.");
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const updated = await apiDeleteTransaction(id);
      setTransactions(updated);
    } catch (error) {
      alert("Failed to delete transaction.");
    }
  };

  const handleExport = () => {
    exportToCSV(transactions);
  };

  return (
    <div className="container">
      <header className="app-header">
        <div className="logo">
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem' }}>
            ₹
          </div>
          Expense Tracker Pro
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn btn-outline" onClick={handleExport} style={{ padding: '0.5rem 1rem' }}>
            <Download size={18} style={{ marginRight: '0.5rem' }} /> Export CSV
          </button>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </header>

      <main>
        {loading && transactions.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '3rem' }}>Loading data...</p>
        ) : (
          <>
            <DashboardStats transactions={transactions} />
            
            <div className="dashboard-grid">
              <div>
                <TransactionForm onAddTransaction={handleAddTransaction} />
                <div style={{ marginTop: '1.5rem' }}>
                  <CategoryPieChart transactions={transactions} />
                </div>
              </div>
              
              <div>
                <TransactionList 
                  transactions={transactions} 
                  onDeleteTransaction={handleDeleteTransaction} 
                />
                <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                  <CashflowBarChart transactions={transactions} />
                  <DailyTrendLine transactions={transactions} />
                  <CumulativeBalanceChart transactions={transactions} />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
