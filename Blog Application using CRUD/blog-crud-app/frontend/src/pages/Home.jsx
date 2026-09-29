import React, { useState, useEffect, useRef } from 'react';
import { getBlogs, deleteBlog } from '../services/blogApi';
import BlogGrid from '../components/BlogGrid';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import BlogModal from '../components/BlogModal';
import { useToast } from '../components/ToastContext';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Mail, ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import './Home.css';

const Home = ({ searchInputRef }) => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Delete Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  
  const { addToast } = useToast();

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getBlogs();
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setBlogs(sortedData);
      setFilteredBlogs(sortedData);
    } catch (err) {
      setError("Unable to load blogs. Please check whether the JSON Server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBlogs(blogs);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = blogs.filter(blog => 
        blog.title.toLowerCase().includes(query) ||
        blog.author.toLowerCase().includes(query) ||
        blog.content.toLowerCase().includes(query)
      );
      setFilteredBlogs(filtered);
    }
  }, [searchQuery, blogs]);

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;
    
    try {
      await deleteBlog(blogToDelete.id);
      addToast('Blog deleted successfully');
      setBlogs(blogs.filter(b => b.id !== blogToDelete.id));
      setIsModalOpen(false);
      setBlogToDelete(null);
    } catch (err) {
      addToast('Failed to delete blog', 'error');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Insights for the <br/>
            <span className="highlight">Modern Enterprise.</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Expert perspectives on leadership, technology, and strategies driving business transformation.
          </motion.p>
          
          <motion.div 
            className="hero-search-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} ref={searchInputRef} />
          </motion.div>
        </div>
        
        <motion.div 
          className="hero-image-wrapper"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="premium-image-container glass">
            <img 
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop" 
              alt="Enterprise Technology" 
              className="hero-premium-image"
            />
            <div className="image-overlay-gradient"></div>
            
            {/* Floating badge for extra premium feel */}
            <motion.div 
              className="floating-badge glass"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Award size={20} className="badge-icon" />
              <div>
                <span className="badge-title">Award Winning</span>
                <span className="badge-subtitle">Platform 2024</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <motion.section 
        className="stats-section glass"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="stat-item">
          <div className="stat-icon"><Users size={28} /></div>
          <h3 className="stat-value">2M+</h3>
          <p className="stat-label">Monthly Readers</p>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><TrendingUp size={28} /></div>
          <h3 className="stat-value">5K+</h3>
          <p className="stat-label">Expert Articles</p>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><Award size={28} /></div>
          <h3 className="stat-value">Top 10</h3>
          <p className="stat-label">Business Publications</p>
        </div>
      </motion.section>

      <section className="categories-section">
        <div className="category-header">
          <h2 className="section-title">Explore Topics</h2>
          <p className="section-subtitle">Deep dives into the trends shaping tomorrow.</p>
        </div>
        <div className="categories-grid">
          <motion.div className="category-card glass" whileHover={{ y: -5 }}>
            <Zap className="category-icon" />
            <h3>Technology</h3>
            <p>AI, Cloud, and Engineering.</p>
          </motion.div>
          <motion.div className="category-card glass" whileHover={{ y: -5 }}>
            <Globe className="category-icon" />
            <h3>Global Markets</h3>
            <p>Economic trends and insights.</p>
          </motion.div>
          <motion.div className="category-card glass" whileHover={{ y: -5 }}>
            <Shield className="category-icon" />
            <h3>Cybersecurity</h3>
            <p>Protecting the modern enterprise.</p>
          </motion.div>
        </div>
      </section>

      <motion.section 
        className="content-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2 variants={itemVariants} className="section-heading">Featured Articles</motion.h2>
        
        {isLoading ? (
          <motion.div variants={itemVariants}><Loading /></motion.div>
        ) : error ? (
          <motion.div variants={itemVariants}>
            <ErrorMessage message={error} onRetry={fetchBlogs} />
          </motion.div>
        ) : blogs.length === 0 ? (
          <motion.div variants={itemVariants}><EmptyState /></motion.div>
        ) : filteredBlogs.length === 0 ? (
          <motion.div variants={itemVariants}><EmptyState isSearch={true} /></motion.div>
        ) : (
          <motion.div variants={itemVariants}>
            <BlogGrid blogs={filteredBlogs} onDeleteClick={handleDeleteClick} />
          </motion.div>
        )}
      </motion.section>

      <motion.section 
        className="newsletter-section glass"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="newsletter-content">
          <div className="newsletter-icon-wrapper">
            <Mail size={40} className="newsletter-icon" />
          </div>
          <h2>Stay Ahead of the Curve</h2>
          <p>Join 50,000+ executives receiving our weekly insights directly to their inbox.</p>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); addToast('Subscribed successfully!', 'success'); }}>
            <input type="email" placeholder="Enter your work email" className="form-control" required />
            <button type="submit" className="btn btn-primary">
              Subscribe <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </motion.section>

      <BlogModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
      />
    </div>
  );
};

export default Home;
