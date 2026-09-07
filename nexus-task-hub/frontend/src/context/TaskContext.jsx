import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const API_URL = 'http://localhost:5000/api/tasks/';

  const getConfig = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchTasks = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await axios.get(API_URL, getConfig());
      setTasks(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  const addTask = async (taskData) => {
    try {
      const res = await axios.post(API_URL, taskData, getConfig());
      setTasks([...tasks, res.data]);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding task');
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const res = await axios.put(API_URL + id, taskData, getConfig());
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating task');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(API_URL + id, getConfig());
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting task');
      throw err;
    }
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
