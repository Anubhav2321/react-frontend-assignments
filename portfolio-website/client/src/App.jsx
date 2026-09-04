import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

// Imported custom components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const starsContainerRef = useRef(null);

  // Preloader Logic
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.remove('overflow-hidden');
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Theme Logic
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Generate Stars
  useEffect(() => {
    const container = starsContainerRef.current;
    if (!container) return;
    
    container.innerHTML = '';
    const isMobile = window.innerWidth < 768;
    const numberOfStars = isMobile ? 30 : 60;

    for (let i = 0; i < numberOfStars; i++) {
      let star = document.createElement('div');
      star.className = 'star';
      let duration = Math.random() * (25 - 15) + 15;
      let delay = Math.random() * -30;
      let size = Math.random() * 2 + 1;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;
      container.appendChild(star);
    }
  }, []);

  // Active Nav Link Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = 'home';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations 
  useEffect(() => {
    if (isLoading) return;

    let ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl.from('.animate-hero-stagger', { y: 30, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out' });
      heroTl.to('.animate-hero-image', { y: 0, opacity: 1, duration: 1.5, ease: 'expo.out' }, '-=0.5');
      heroTl.to('.animate-hero-orbs', { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.out' }, '-=1');

      gsap.utils.toArray('.gsap-section-title').forEach((title) => {
        gsap.from(title, { scrollTrigger: { trigger: title, start: 'top 85%' }, y: 30, opacity: 0, duration: 1, ease: 'power3.out' });
      });

      gsap.from('.gsap-vfx-left', { scrollTrigger: { trigger: '.gsap-vfx-left', start: 'top 80%' }, x: -40, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.gsap-vfx-right', { scrollTrigger: { trigger: '.gsap-vfx-right', start: 'top 80%' }, x: 40, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.gsap-vfx-up', { scrollTrigger: { trigger: '.gsap-vfx-up', start: 'top 90%' }, y: 30, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.gsap-stat', { scrollTrigger: { trigger: '.gsap-stat', start: 'top 90%' }, y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
      gsap.from('.skill-card', { scrollTrigger: { trigger: '#skills', start: 'top 85%' }, y: 30, opacity: 0, duration: 0.8, stagger: { each: 0.05, from: 'random' }, ease: 'back.out(1.2)' });
      gsap.from('.project-card', { scrollTrigger: { trigger: '#projects', start: 'top 85%' }, y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out' });

      gsap.utils.toArray('.cert-provider-card').forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 85%' },
          y: 30,
          opacity: 0,
          duration: 1,
          delay: index * 0.15,
          ease: 'power3.out',
        });
      });
    });

    return () => ctx.revert();
  }, [isLoading]);

  // Handlers
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="text-slate-900 dark:text-slate-200 antialiased selection:bg-primary selection:text-dark overflow-x-hidden relative transition-colors duration-300">
      <div ref={starsContainerRef} id="stars-container" className="fixed inset-0 pointer-events-none z-0"></div>

      {/* Preloader */}
      <div
        id="preloader"
        className={`fixed inset-0 z-[150] flex items-center justify-center bg-[#050505] transition-opacity duration-500 ease-out ${
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none hidden'
        }`}
      >
        <div className="text-5xl md:text-7xl font-bold tracking-tighter drop-shadow-[0_0_20px_rgba(0,242,254,0.6)] glitch-text">
          <span className="text-white">
            <span className="text-primary">&lt;</span>Anubhav<span className="text-accent">/&gt;</span>
          </span>
        </div>
      </div>

      {/* Modular Components */}
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} activeSection={activeSection} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}