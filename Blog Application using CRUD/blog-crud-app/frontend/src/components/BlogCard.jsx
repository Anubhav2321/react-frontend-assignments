import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Clock, User } from 'lucide-react';
import './BlogCard.css';

const BlogCard = ({ blog, onDeleteClick }) => {
  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const getExcerpt = (text) => {
    if (!text) return '';
    const words = text.trim().split(/\s+/);
    if (words.length <= 20) return text;
    return words.slice(0, 20).join(' ') + '...';
  };

  return (
    <article className="blog-card glass">
      <div className="card-image-container">
        {blog.imageUrl ? (
          <img src={blog.imageUrl} alt={blog.title} className="card-image" />
        ) : (
          <div className="card-image-placeholder">
            <span className="placeholder-text">BlogSphere</span>
          </div>
        )}
      </div>
      
      <div className="card-content">
        <div className="card-meta">
          <span className="meta-item"><User size={14} /> {blog.author}</span>
          <span className="meta-item"><Clock size={14} /> {formattedDate}</span>
        </div>
        
        <h3 className="card-title">{blog.title}</h3>
        <p className="card-excerpt">{getExcerpt(blog.content)}</p>
        
        <div className="card-actions">
          <Link to={`/blog/${blog.id}`} className="read-more-btn">Read More</Link>
          
          <div className="card-controls">
            <Link to={`/edit/${blog.id}`} className="icon-btn edit-btn" aria-label="Edit">
              <Edit size={16} />
            </Link>
            <button 
              className="icon-btn delete-btn" 
              onClick={() => onDeleteClick(blog)}
              aria-label="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
