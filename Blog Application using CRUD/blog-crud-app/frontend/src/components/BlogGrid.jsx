import React from 'react';
import BlogCard from './BlogCard';
import './BlogGrid.css';

const BlogGrid = ({ blogs, onDeleteClick }) => {
  return (
    <div className="blog-grid">
      {blogs.map(blog => (
        <BlogCard key={blog.id} blog={blog} onDeleteClick={onDeleteClick} />
      ))}
    </div>
  );
};

export default BlogGrid;
