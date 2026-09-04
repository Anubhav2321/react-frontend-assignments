import React, { useState } from 'react';

export default function Navbar({ isDarkMode, toggleTheme, activeSection }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  };
  
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove('overflow-hidden');
  }

  return (
    <>
      <div id="mobile-menu" className={`fixed inset-0 z-[120] bg-white/95 dark:bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={closeMenu} aria-label="Close Mobile Menu" className="absolute top-6 right-6 text-3xl text-slate-800 dark:text-white hover:text-primary transition-colors">
            <i className="fas fa-times"></i>
        </button>
        <a href="#home" onClick={closeMenu} className="mobile-link text-2xl font-bold text-slate-800 dark:text-white hover:text-primary transition-colors">Home</a>
        <a href="#about" onClick={closeMenu} className="mobile-link text-2xl font-bold text-slate-800 dark:text-white hover:text-primary transition-colors">About</a>
        <a href="#skills" onClick={closeMenu} className="mobile-link text-2xl font-bold text-slate-800 dark:text-white hover:text-primary transition-colors">Skills</a>
        <a href="#projects" onClick={closeMenu} className="mobile-link text-2xl font-bold text-slate-800 dark:text-white hover:text-primary transition-colors">Projects</a>
        <a href="#certifications" onClick={closeMenu} className="mobile-link text-2xl font-bold text-slate-800 dark:text-white hover:text-primary transition-colors">Certificates</a>
        <a href="#contact" onClick={closeMenu} className="mobile-link px-8 py-3 mt-4 rounded-full bg-primary text-dark font-bold hover:shadow-neon transition-all">Contact Me</a>
      </div>

      <nav id="navbar" className="fixed w-full z-50 transition-all duration-300 glass border-b-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16 md:h-20">
                  <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                      <span className="text-2xl md:text-3xl font-bold tracking-tighter text-slate-900 dark:text-white">
                          <span className="text-primary">&lt;</span>Anubhav<span className="text-accent">/&gt;</span>
                      </span>
                  </div>
                  
                  <div className="hidden md:block">
                      <div className="ml-10 flex items-center space-x-6 relative z-50">
                          <a href="#home" className={`nav-link text-slate-700 dark:text-slate-200 hover:text-primary transition-colors px-3 py-2 text-sm font-medium ${activeSection === 'home' ? 'active' : ''}`}>Home</a>
                          <a href="#about" className={`nav-link text-slate-700 dark:text-slate-200 hover:text-primary transition-colors px-3 py-2 text-sm font-medium ${activeSection === 'about' ? 'active' : ''}`}>About</a>
                          <a href="#skills" className={`nav-link text-slate-700 dark:text-slate-200 hover:text-primary transition-colors px-3 py-2 text-sm font-medium ${activeSection === 'skills' ? 'active' : ''}`}>Skills</a>
                          <a href="#projects" className={`nav-link text-slate-700 dark:text-slate-200 hover:text-primary transition-colors px-3 py-2 text-sm font-medium ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a>
                          <a href="#certifications" className={`nav-link text-slate-700 dark:text-slate-200 hover:text-primary transition-colors px-3 py-2 text-sm font-medium ${activeSection === 'certifications' ? 'active' : ''}`}>Certificates</a>
                          
                          <div className="flex items-center gap-4 pl-2">
                              <a href="#contact" className="nav-link px-6 py-2.5 rounded-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-dark hover:-translate-y-1 transition-transform duration-300 shadow-neon text-sm font-bold uppercase tracking-wide inline-block">
                                  Contact Me
                              </a>
                              <button onClick={toggleTheme} aria-label="Toggle Dark Mode" title="Toggle Theme" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-800 dark:text-white hover:text-primary transition-colors focus:outline-none">
                                  {isDarkMode ? <i className="fas fa-sun text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]"></i> : <i className="fas fa-moon text-blue-600"></i>}
                              </button>
                          </div>
                      </div>
                  </div>

                  <div className="flex md:hidden items-center gap-4">
                      <button onClick={toggleTheme} aria-label="Toggle Dark Mode" className="w-9 h-9 rounded-full glass flex items-center justify-center text-slate-800 dark:text-white hover:text-primary transition-colors focus:outline-none">
                          {isDarkMode ? <i className="fas fa-sun text-yellow-400"></i> : <i className="fas fa-moon text-blue-600"></i>}
                      </button>
                      <button onClick={toggleMobileMenu} aria-label="Open Mobile Menu" className="text-2xl text-slate-800 dark:text-white focus:outline-none">
                          <i className="fas fa-bars"></i>
                      </button>
                  </div>
              </div>
          </div>
      </nav>
    </>
  );
}