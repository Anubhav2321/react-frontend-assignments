import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListTodo, 
  CheckSquare, 
  PlusCircle, 
  LogOut 
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'All Tasks', path: '/tasks', icon: <ListTodo size={20} /> },
    { name: 'Completed Tasks', path: '/tasks/completed', icon: <CheckSquare size={20} /> },
    { name: 'Add Task', path: '/tasks/add', icon: <PlusCircle size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="icon">
          <ListTodo size={28} />
        </div>
        Nexus Tasks
      </div>
      
      <div className="nav-links">
        {navItems.map((item) => (
          <NavLink 
            key={item.name}
            to={item.path}
            end={item.path === '/tasks'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <button onClick={logout} className="nav-item" style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', fontSize: '1rem' }}>
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
