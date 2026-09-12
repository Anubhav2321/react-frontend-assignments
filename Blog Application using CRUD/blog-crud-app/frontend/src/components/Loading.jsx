import React from 'react';
import { Loader2 } from 'lucide-react';
import './States.css';

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="state-container loading-state">
      <Loader2 className="spinner" size={48} color="var(--accent-color)" />
      <p className="state-text">{text}</p>
    </div>
  );
};

export default Loading;
