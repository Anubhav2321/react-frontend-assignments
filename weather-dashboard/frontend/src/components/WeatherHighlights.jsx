export default function WeatherHighlights({ data }) {
  if (!data) return null;

  const { main, wind, sys, visibility, clouds } = data;

  const formatTime = (timestamp) => {
    if (!timestamp) return '--:--';
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const visibilityKm = visibility ? (visibility / 1000).toFixed(1) : '--';
  const pressurePercent = main?.pressure ? Math.min(((main.pressure - 950) / 100) * 100, 100) : 0;
  const cloudPercent = clouds?.all || 0;

  return (
    <div className="highlights-panel glass-panel fade-in">
      <h3 className="section-title">Today's Highlights</h3>
      <div className="highlights-grid">

        {/* Humidity */}
        <div className="highlight-card slide-up">
          <div className="highlight-header">
            <span className="highlight-title">Humidity</span>
            <div className="highlight-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
              </svg>
            </div>
          </div>
          <div className="highlight-value">{main?.humidity}<span className="unit">%</span></div>
          <div className="highlight-progress">
            <div className="highlight-progress-fill humidity" style={{ width: `${main?.humidity || 0}%` }} />
          </div>
        </div>

        {/* Wind Speed */}
        <div className="highlight-card slide-up">
          <div className="highlight-header">
            <span className="highlight-title">Wind Speed</span>
            <div className="highlight-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
                <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
                <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
              </svg>
            </div>
          </div>
          <div className="highlight-value">{wind?.speed}<span className="unit"> m/s</span></div>
          <div className="highlight-progress">
            <div className="highlight-progress-fill wind" style={{ width: `${Math.min((wind?.speed || 0) / 20 * 100, 100)}%` }} />
          </div>
        </div>

        {/* Pressure */}
        <div className="highlight-card slide-up">
          <div className="highlight-header">
            <span className="highlight-title">Pressure</span>
            <div className="highlight-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20"/>
                <path d="m8 10 4-4 4 4"/>
                <path d="m8 14 4 4 4-4"/>
              </svg>
            </div>
          </div>
          <div className="highlight-value">{main?.pressure}<span className="unit"> hPa</span></div>
          <div className="highlight-progress">
            <div className="highlight-progress-fill pressure" style={{ width: `${pressurePercent}%` }} />
          </div>
        </div>

        {/* Visibility */}
        <div className="highlight-card slide-up">
          <div className="highlight-header">
            <span className="highlight-title">Visibility</span>
            <div className="highlight-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
          </div>
          <div className="highlight-value">{visibilityKm}<span className="unit"> km</span></div>
          <div className="highlight-progress">
            <div className="highlight-progress-fill visibility" style={{ width: `${Math.min((visibility || 0) / 10000 * 100, 100)}%` }} />
          </div>
        </div>

        {/* Sunrise */}
        <div className="highlight-card slide-up">
          <div className="highlight-header">
            <span className="highlight-title">Sunrise</span>
            <div className="highlight-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v8"/>
                <path d="m4.93 10.93 1.41 1.41"/>
                <path d="M2 18h2"/>
                <path d="M20 18h2"/>
                <path d="m19.07 10.93-1.41 1.41"/>
                <path d="M22 22H2"/>
                <path d="m8 6 4-4 4 4"/>
                <path d="M16 18a4 4 0 0 0-8 0"/>
              </svg>
            </div>
          </div>
          <div className="highlight-value">{formatTime(sys?.sunrise)}</div>
        </div>

        {/* Sunset */}
        <div className="highlight-card slide-up">
          <div className="highlight-header">
            <span className="highlight-title">Sunset</span>
            <div className="highlight-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 10V2"/>
                <path d="m4.93 10.93 1.41 1.41"/>
                <path d="M2 18h2"/>
                <path d="M20 18h2"/>
                <path d="m19.07 10.93-1.41 1.41"/>
                <path d="M22 22H2"/>
                <path d="m16 6-4 4-4-4"/>
                <path d="M16 18a4 4 0 0 0-8 0"/>
              </svg>
            </div>
          </div>
          <div className="highlight-value">{formatTime(sys?.sunset)}</div>
        </div>

        {/* Cloud Cover */}
        <div className="highlight-card slide-up">
          <div className="highlight-header">
            <span className="highlight-title">Cloud Cover</span>
            <div className="highlight-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
              </svg>
            </div>
          </div>
          <div className="highlight-value">{cloudPercent}<span className="unit">%</span></div>
          <div className="highlight-progress">
            <div className="highlight-progress-fill clouds" style={{ width: `${cloudPercent}%` }} />
          </div>
        </div>

        {/* Temp Range */}
        <div className="highlight-card slide-up">
          <div className="highlight-header">
            <span className="highlight-title">Temp Range</span>
            <div className="highlight-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
              </svg>
            </div>
          </div>
          <div className="highlight-value" style={{ fontSize: '1.5rem' }}>
            {Math.round(main?.temp_min)}° <span className="unit">/ </span>{Math.round(main?.temp_max)}°
          </div>
        </div>

      </div>
    </div>
  );
}
