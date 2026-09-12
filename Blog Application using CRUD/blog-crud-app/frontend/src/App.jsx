import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import ViewBlog from './pages/ViewBlog';
import { ToastProvider } from './components/ToastContext';

function App() {
  const searchInputRef = useRef(null);

  const handleSearchFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      // Also scroll to it if not in view
      searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <ToastProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar onSearchFocus={handleSearchFocus} />
          <main className="container main-content">
            <Routes>
              <Route path="/" element={<Home searchInputRef={searchInputRef} />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/edit/:id" element={<EditBlog />} />
              <Route path="/blog/:id" element={<ViewBlog />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
