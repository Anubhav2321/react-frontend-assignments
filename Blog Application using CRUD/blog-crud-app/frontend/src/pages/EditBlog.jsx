import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { getBlogById, updateBlog } from '../services/blogApi';
import { useToast } from '../components/ToastContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './CreateBlog.css'; // Reusing styles

const EditBlog = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { addToast } = useToast();

  const fetchBlog = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getBlogById(id);
      setInitialData(data);
    } catch (err) {
      setError("Unable to load the blog for editing.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleSubmit = async (blogData) => {
    setIsSubmitting(true);
    try {
      await updateBlog(id, blogData);
      addToast('Blog updated successfully', 'success');
      navigate(`/blog/${id}`);
    } catch (err) {
      addToast('Failed to update blog', 'error');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading text="Loading blog data..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchBlog} />;
  }

  return (
    <div className="create-page">
      <div className="page-header">
        <h1 className="page-title">Edit Story</h1>
        <p className="page-subtitle">Update your blog details below.</p>
      </div>
      <div className="form-container">
        <BlogForm 
          initialData={initialData} 
          onSubmit={handleSubmit} 
          isLoading={isSubmitting} 
          isEdit={true} 
        />
      </div>
    </div>
  );
};

export default EditBlog;
