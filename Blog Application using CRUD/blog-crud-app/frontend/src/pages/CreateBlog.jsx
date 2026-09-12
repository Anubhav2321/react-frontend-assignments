import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { createBlog } from '../services/blogApi';
import { useToast } from '../components/ToastContext';
import './CreateBlog.css';

const CreateBlog = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (blogData) => {
    setIsSubmitting(true);
    try {
      await createBlog(blogData);
      addToast('Blog created successfully', 'success');
      navigate('/');
    } catch (error) {
      addToast('Failed to create blog', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-page">
      <div className="page-header">
        <h1 className="page-title">Create a New Story</h1>
        <p className="page-subtitle">Share your perspective with the world.</p>
      </div>
      <div className="form-container">
        <BlogForm onSubmit={handleSubmit} isLoading={isSubmitting} />
      </div>
    </div>
  );
};

export default CreateBlog;
