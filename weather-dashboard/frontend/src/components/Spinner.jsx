const Spinner = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '3rem'
    }}>
      <div 
        style={{
          width: '50px',
          height: '50px',
          border: '4px solid var(--card-border)',
          borderTop: '4px solid var(--primary-color)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
    </div>
  );
};

export default Spinner;
