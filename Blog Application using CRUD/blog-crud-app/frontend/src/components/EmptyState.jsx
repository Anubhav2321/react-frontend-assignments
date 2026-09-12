import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, PenTool } from 'lucide-react';
import './States.css';

const EmptyState = ({ isSearch = false }) => {
  return (
    <div className="state-container empty-state">
      {isSearch ? (
        <>
          <FileQuestion size={48} className="state-icon" />
          <h3 className="state-title">No matching blogs found.</h3>
          <p className="state-text">Try adjusting your search keywords.</p>
        </>
      ) : (
        <>
          <PenTool size={48} className="state-icon" />
          <h3 className="state-title">No blogs yet</h3>
          <p className="state-text">Start sharing your ideas with the community.</p>
          <Link to="/create" className="btn btn-primary create-first-btn">
            Create Your First Blog
          </Link>
        </>
      )}
    </div>
  );
};

export default EmptyState;
