import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks.js';
import { checkAuthSession } from './features/auth/authSlice.js';
import { selectTheme } from './features/preferences/preferencesSlice.js';
import AppRoutes from './routes/AppRoutes.jsx';

export const App = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    // Attempt session verification with backend on startup
    dispatch(checkAuthSession());
  }, [dispatch]);

  useEffect(() => {
    // Dynamically apply light or dark theme attribute
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;

