import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

// Helper to get tasks for a specific user from localStorage
const getStoredTasks = (userId) => {
  if (!userId) return [];
  try {
    return JSON.parse(localStorage.getItem(`nexus_tasks_${userId}`)) || [];
  } catch {
    return [];
  }
};

// Helper to save tasks for a specific user to localStorage
const saveStoredTasks = (userId, tasks) => {
  if (!userId) return;
  localStorage.setItem(`nexus_tasks_${userId}`, JSON.stringify(tasks));
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  // Load tasks when user changes
  useEffect(() => {
    if (user) {
      const stored = getStoredTasks(user.id);
      setTasks(stored);
      setError(null);
    } else {
      setTasks([]);
    }
    setLoading(false);
  }, [user]);

  const fetchTasks = () => {
    if (!user) return;
    const stored = getStoredTasks(user.id);
    setTasks(stored);
  };

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    saveStoredTasks(user.id, updated);
    return newTask;
  };

  const updateTask = (id, taskData) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, ...taskData } : task
    );
    setTasks(updated);
    saveStoredTasks(user.id, updated);
    return updated.find((t) => t.id === id);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    saveStoredTasks(user.id, updated);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
