import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div 
      className="fade-in"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'var(--error-bg)',
        border: '1px solid var(--error-text)',
        color: 'var(--error-text)',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        marginTop: '1rem',
        fontWeight: '500'
      }}
    >
      <AlertCircle size={24} />
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
