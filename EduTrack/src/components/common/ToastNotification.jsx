import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastNotification = ({ type = 'info', message, onClose }) => {
  if (!message) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';

  const icon = isSuccess ? (
    <CheckCircle2 size={18} />
  ) : isError ? (
    <AlertCircle size={18} />
  ) : (
    <Info size={18} />
  );

  const bannerClass = isSuccess
    ? 'toast-success'
    : isError
    ? 'toast-error'
    : 'toast-info';

  return (
    <div className={`toast-banner ${bannerClass}`} role="alert">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        {icon}
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close notification"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'inherit',
            display: 'flex',
            padding: '2px',
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default ToastNotification;

