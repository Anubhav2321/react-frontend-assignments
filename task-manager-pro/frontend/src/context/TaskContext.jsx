import React, { createContext, useState, useEffect, useContext } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load from local storage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('taskManagerData');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Failed to parse tasks from local storage', error);
        setTasks([]);
      }
    }
    setLoading(false);
  }, []);

  // Save to local storage whenever tasks change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('taskManagerData', JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'taskManagerData') {
        try {
          setTasks(JSON.parse(e.newValue) || []);
        } catch (err) {
          console.error('Failed to sync tasks from storage event', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      _id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id, updatedFields) => {
    setTasks(prev => prev.map(t => t._id === id ? { ...t, ...updatedFields } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(t => t.status !== 'Completed'));
  };

  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `tasks-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      loading, 
      addTask, 
      updateTask, 
      deleteTask, 
      clearCompleted,
      exportTasks 
    }}>
      {children}
    </TaskContext.Provider>
  );
};
