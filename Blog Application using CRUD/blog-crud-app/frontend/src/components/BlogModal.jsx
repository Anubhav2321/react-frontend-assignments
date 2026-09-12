import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import './BlogModal.css';

const BlogModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
        
        <div className="modal-header">
          <div className="modal-icon-wrapper">
            <AlertTriangle size={24} className="modal-icon" />
          </div>
          <h3 className="modal-title">{title}</h3>
        </div>
        
        <div className="modal-body">
          <p>{message}</p>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
