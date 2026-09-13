import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import AddTask from './pages/AddTask';
import TaskDetails from './pages/TaskDetails';
import CompletedTasks from './pages/CompletedTasks';
import './App.css';
import './responsive.css';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/new" element={<AddTask />} />
            <Route path="/tasks/:id" element={<TaskDetails />} />
            <Route path="/completed" element={<CompletedTasks />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
