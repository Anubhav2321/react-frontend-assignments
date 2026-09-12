export default function WeatherSidebar({ data }) {
  if (!data) return null;

  const { name, sys, main, weather } = data;
  const condition = weather?.[0];
  const iconUrl = `https://openweathermap.org/img/wn/${condition?.icon}@4x.png`;

  return (
    <>
      <div className="sidebar-weather fade-in">
        <div className="weather-icon-wrapper">
          <img src={iconUrl} alt={condition?.main} className="w-32 h-32 object-contain" />
        </div>
        <div className="temp-display">
          {Math.round(main?.temp)}<span>°C</span>
        </div>
        <div className="city-info">
          <h2>{name}, {sys?.country}</h2>
          <p>{condition?.description}</p>
        </div>
      </div>

      <hr className="divider" />

      <div className="mini-details">
        <div className="mini-detail">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          Feels like {Math.round(main?.feels_like)}°C
        </div>
        <div className="mini-detail">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          High {Math.round(main?.temp_max)}° / Low {Math.round(main?.temp_min)}°
        </div>
      </div>
    </>
  );
}
