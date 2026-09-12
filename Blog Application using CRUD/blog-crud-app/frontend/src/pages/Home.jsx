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
            Share Ideas. <br/>
            <span className="highlight">Inspire Minds.</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Create, discover, and share meaningful stories with a modern 3D blogging experience.
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
        
        <div className="hero-spline">
          <div className="spline-overlay"></div>
          <div className="css-3d-scene">
            <motion.div 
              className="css-3d-object"
              animate={{ 
                rotateX: [0, 10, -10, 0], 
                rotateY: [0, 180, 360], 
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <div className="cube-face front glass"></div>
              <div className="cube-face back glass"></div>
              <div className="cube-face right glass"></div>
              <div className="cube-face left glass"></div>
              <div className="cube-face top glass"></div>
              <div className="cube-face bottom glass"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section 
        className="content-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2 variants={itemVariants} className="section-heading">Latest Stories</motion.h2>
        
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
