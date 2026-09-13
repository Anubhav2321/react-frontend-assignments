import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Helper to get registered users from localStorage
const getStoredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem('nexus_users')) || [];
  } catch {
    return [];
  }
};

// Helper to save registered users to localStorage
const saveStoredUsers = (users) => {
  localStorage.setItem('nexus_users', JSON.stringify(users));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, restore session from storage
  useEffect(() => {
    const stored =
      localStorage.getItem('nexus_currentUser') ||
      sessionStorage.getItem('nexus_currentUser');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // Corrupted data — clear it
        localStorage.removeItem('nexus_currentUser');
        sessionStorage.removeItem('nexus_currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, rememberMe) => {
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!found) {
      return { success: false, message: 'Invalid email or password' };
    }

    const profile = { id: found.id, name: found.name, email: found.email };
    setUser(profile);
    persistSession(profile, rememberMe);
    return { success: true };
  };

  const register = async (name, email, password, rememberMe) => {
    const users = getStoredUsers();

    // Check if email already registered
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email: email.toLowerCase(),
      password,
    };

    users.push(newUser);
    saveStoredUsers(users);

    const profile = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(profile);
    persistSession(profile, rememberMe);
    return { success: true };
  };

  const persistSession = (profile, rememberMe) => {
    const data = JSON.stringify(profile);
    if (rememberMe) {
      localStorage.setItem('nexus_currentUser', data);
      sessionStorage.removeItem('nexus_currentUser');
    } else {
      sessionStorage.setItem('nexus_currentUser', data);
      localStorage.removeItem('nexus_currentUser');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexus_currentUser');
    sessionStorage.removeItem('nexus_currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
