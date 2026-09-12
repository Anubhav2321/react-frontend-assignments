export default function DynamicBackground({ isDark, children }) {
  return (
    <div className={`dynamic-background ${isDark ? 'dark' : ''}`}>
      <div className="bg-overlay"></div>
      
      <div className="celestial-container">
        {!isDark ? (
          <div className="sun-container fade-in">
            <div className="sun-glow"></div>
            <div className="sun-halo"></div>
            <div className="sun-core"></div>
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="cloud cloud-3"></div>
          </div>
        ) : (
          <div className="moon-container fade-in">
            <div className="moon-glow"></div>
            <div className="moon-core">
              <div className="crater crater-1"></div>
              <div className="crater crater-2"></div>
              <div className="crater crater-3"></div>
            </div>
            <div className="stars-layer"></div>
          </div>
        )}
      </div>

      <div className="content-layer">
        {children}
      </div>
    </div>
  );
}