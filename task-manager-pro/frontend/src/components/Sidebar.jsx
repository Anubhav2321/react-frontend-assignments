import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ListTodo, PlusSquare, CheckCircle, LogOut } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('dummy-auth-token');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="neon-text">TaskPro</h1>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/tasks" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <ListTodo size={20} />
          <span>All Tasks</span>
        </NavLink>
        <NavLink to="/tasks/new" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <PlusSquare size={20} />
          <span>Add Task</span>
        </NavLink>
        <NavLink to="/completed" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <CheckCircle size={20} />
          <span>Completed</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
