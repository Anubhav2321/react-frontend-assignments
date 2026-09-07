/**
 * Hybrid data persistence strategy: Sync backend API data with localStorage.
 */
const STORAGE_KEY = 'expense_tracker_data';
const API_URL = 'http://localhost:5000/api/transactions';

// Get local data instantly
export const getLocalTransactions = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Update local cache
export const setLocalTransactions = (transactions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

// Fetch from API and sync local
export const fetchAndSyncTransactions = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    setLocalTransactions(data);
    return data;
  } catch (error) {
    console.error('Failed to fetch from API, falling back to local storage', error);
    return getLocalTransactions();
  }
};

// Add new transaction to API and update local
export const addTransaction = async (transactionData) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionData),
    });
    if (!res.ok) throw new Error('Network response was not ok');
    const newTx = await res.json();
    
    // update local cache
    const current = getLocalTransactions();
    const updated = [newTx, ...current];
    setLocalTransactions(updated);
    
    return updated;
  } catch (error) {
    console.error('Failed to add via API', error);
    // Optimistic offline update could go here
    throw error;
  }
};

// Delete transaction via API and update local
export const deleteTransaction = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Network response was not ok');
    
    const current = getLocalTransactions();
    const updated = current.filter(t => t._id !== id);
    setLocalTransactions(updated);
    
    return updated;
  } catch (error) {
    console.error('Failed to delete via API', error);
    throw error;
  }
};
