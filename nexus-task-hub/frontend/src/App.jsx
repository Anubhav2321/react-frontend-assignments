import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';

import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TasksList from './pages/TasksList';
import AddTask from './pages/AddTask';
import TaskDetails from './pages/TaskDetails';
import CompletedTasks from './pages/CompletedTasks';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes enclosed in Layout */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<TasksList filter="all" />} />
          <Route path="/tasks/completed" element={<CompletedTasks />} />
          <Route path="/tasks/add" element={<AddTask />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Route>
    </Routes>
  );
};

import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="822342760278-c6uu3b8asqdn1s2pfdecl02v9pv252rt.apps.googleusercontent.com">
      <ThemeProvider>
        <AuthProvider>
          <TaskProvider>
            <Router>
              <AnimatedRoutes />
            </Router>
          </TaskProvider>
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
