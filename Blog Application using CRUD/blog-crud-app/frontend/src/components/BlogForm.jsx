import React, { useState, useEffect } from 'react';
import { getWordCount } from '../utils/wordCounter';
import { useToast } from './ToastContext';
import './BlogForm.css';
import { Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogForm = ({ initialData, onSubmit, isLoading, isEdit = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    imageUrl: '',
    videoUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [wordCount, setWordCount] = useState(0);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const MAX_WORDS = 1000;

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setWordCount(getWordCount(initialData.content));
    }
  }, [initialData]);

  const validate = (data) => {
    const newErrors = {};
    if (!data.title.trim()) newErrors.title = 'Title is required.';
    if (!data.author.trim()) newErrors.author = 'Author name is required.';
    
    const count = getWordCount(data.content);
    if (!data.content.trim()) {
      newErrors.content = 'Blog content is required.';
    } else if (count > MAX_WORDS) {
      newErrors.content = `Blog content cannot exceed ${MAX_WORDS} words.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'content') {
      const count = getWordCount(value);
      setWordCount(count);
      
      // Still allow typing but set error if exceeded
      if (count > MAX_WORDS) {
        setErrors(prev => ({ ...prev, content: `Blog content cannot exceed ${MAX_WORDS} words.` }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.content;
          return newErrors;
        });
      }
    } else {
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(formData)) {
      try {
        await onSubmit(formData);
      } catch (error) {
        // Error handling is managed by parent or here if needed
      }
    } else {
      addToast('Please fix the errors in the form.', 'error');
    }
  };

  const getWordCountStyle = () => {
    if (wordCount < 800) return 'count-normal';
    if (wordCount < 950) return 'count-warning';
    if (wordCount <= MAX_WORDS) return 'count-strong-warning';
    return 'count-error';
  };

  return (
    <form className="blog-form glass" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">Blog Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          placeholder="Enter a captivating title"
          value={formData.title}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author" className="form-label">Author Name *</label>
        <input
          type="text"
          id="author"
          name="author"
          className="form-control"
          placeholder="e.g. Jane Doe"
          value={formData.author}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.author && <span className="form-error">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl" className="form-label">Cover Image URL (Optional)</label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          className="form-control"
          placeholder="https://example.com/image.jpg"
          value={formData.imageUrl}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="videoUrl" className="form-label">YouTube Video URL (Optional)</label>
        <input
          type="url"
          id="videoUrl"
          name="videoUrl"
          className="form-control"
          placeholder="https://www.youtube.com/watch?v=..."
          value={formData.videoUrl}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div className="form-group content-group">
        <label htmlFor="content" className="form-label">Blog Content *</label>
        <textarea
          id="content"
          name="content"
          className="form-control content-textarea"
          placeholder="Share your story..."
          value={formData.content}
          onChange={handleChange}
          disabled={isLoading}
          rows={12}
        />
        <div className="content-footer">
          {errors.content && <span className="form-error">{errors.content}</span>}
          <span className={`word-count ${getWordCountStyle()}`}>
            {wordCount} / {MAX_WORDS} words
          </span>
        </div>
      </div>

      <div className="form-actions">
        <button 
          type="button" 
          className="btn btn-outline" 
          onClick={() => navigate(isEdit ? `/blog/${initialData.id}` : '/')}
          disabled={isLoading}
        >
          <X size={18} /> Cancel
        </button>
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={isLoading || wordCount > MAX_WORDS}
        >
          <Save size={18} /> {isLoading ? 'Saving...' : (isEdit ? 'Save Changes' : 'Publish Blog')}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
