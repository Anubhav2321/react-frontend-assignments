import { useState, useEffect } from 'react';

export default function WeatherSidebar({ data }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (!data) return null;

  const { name, sys, main, weather, wind, dt } = data;
  const condition = weather?.[0];
  const iconUrl = `https://openweathermap.org/img/wn/${condition?.icon}@4x.png`;

  // Timezone offset from API (seconds) — use city's timezone
  const timezoneOffset = data.timezone || 0;
  const localTime = new Date((dt + timezoneOffset) * 1000);

  const formatDate = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[currentTime.getDay()]}, ${currentTime.getDate()} ${months[currentTime.getMonth()]}`;
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className="sidebar-weather fade-in">
        <div className="weather-icon-wrapper">
          <img src={iconUrl} alt={condition?.description || 'weather'} />
        </div>
        <div className="temp-display">
          {Math.round(main?.temp)}<span>°C</span>
        </div>
        <div className="city-info">
          <h2>{name}, {sys?.country}</h2>
          <p>{condition?.description}</p>
        </div>
        <div className="weather-datetime">
          <span className="date-text">{formatDate()}</span>
          <span>{formatTime()}</span>
        </div>
      </div>

      <hr className="divider" />

      <div className="mini-details">
        <div className="mini-detail">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
          </svg>
          Feels {Math.round(main?.feels_like)}°
        </div>
        <div className="mini-detail">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
          </svg>
          {main?.humidity}%
        </div>
        <div className="mini-detail">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
            <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
            <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
          </svg>
          {wind?.speed} m/s
        </div>
      </div>

      <div className="last-updated">
        Last updated: {new Date(dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </>
  );
}
