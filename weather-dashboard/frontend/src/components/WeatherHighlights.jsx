export default function WeatherHighlights({ data }) {
  if (!data) return null;

  const { main, wind, sys, visibility } = data;

  const formatTime = (timestamp) => {
    if (!timestamp) return '--:--';
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="highlights-panel fade-in">
      <h3 className="section-title">Today's Highlights</h3>
      <div className="highlights-grid">
        
        {/* Humidity */}
        <div className="highlight-card">
          <div className="highlight-header">
            <span className="highlight-title">Humidity</span>
            <div className="highlight-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
              </svg>
            </div>
          </div>
          <div className="highlight-value">{main?.humidity}%</div>
        </div>

        {/* Wind Speed */}
        <div className="highlight-card">
          <div className="highlight-header">
            <span className="highlight-title">Wind Status</span>
            <div className="highlight-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
              </svg>
            </div>
          </div>
          <div className="highlight-value">{wind?.speed} <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>m/s</span></div>
        </div>

        {/* Sunrise */}
        <div className="highlight-card">
          <div className="highlight-header">
            <span className="highlight-title">Sunrise</span>
            <div className="highlight-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
              </svg>
            </div>
          </div>
          <div className="highlight-value">{formatTime(sys?.sunrise)}</div>
        </div>

        {/* Sunset */}
        <div className="highlight-card">
          <div className="highlight-header">
            <span className="highlight-title">Sunset</span>
            <div className="highlight-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/><path d="M22 22H2"/><path d="M16 6l-4 4-4-4"/><path d="M12 10v12"/>
              </svg>
            </div>
          </div>
          <div className="highlight-value">{formatTime(sys?.sunset)}</div>
        </div>

      </div>
    </div>
  );
}
