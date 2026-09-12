import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import './States.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="state-container error-state">
      <AlertCircle size={48} color="var(--danger-color)" className="state-icon" />
      <h3 className="state-title">Something went wrong</h3>
      <p className="state-text">{message || "Unable to load blogs. Please check whether the JSON Server is running."}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-outline retry-btn">
          <RefreshCw size={16} /> Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
