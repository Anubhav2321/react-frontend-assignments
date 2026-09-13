export default function ForecastSection({ forecastData }) {
  if (!forecastData || !forecastData.list) return null;

  // Group by day — take one entry per day (around noon = 12:00)
  const dailyForecasts = [];
  const seenDates = new Set();

  for (const item of forecastData.list) {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split('T')[0];
    const hour = date.getUTCHours();

    // Pick the entry closest to noon for each day, or the first one
    if (!seenDates.has(dateKey) && (hour >= 11 && hour <= 14 || dailyForecasts.length === 0)) {
      seenDates.add(dateKey);
      dailyForecasts.push(item);
    }
  }

  // Also fill in days where we didn't find a noon entry
  for (const item of forecastData.list) {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split('T')[0];
    if (!seenDates.has(dateKey)) {
      seenDates.add(dateKey);
      dailyForecasts.push(item);
    }
  }

  // Sort by date and take first 5
  dailyForecasts.sort((a, b) => a.dt - b.dt);
  const displayForecasts = dailyForecasts.slice(0, 5);

  const getDayName = (timestamp, index) => {
    if (index === 0) return 'Today';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en', { weekday: 'short' });
  };

  return (
    <div className="forecast-panel glass-panel fade-in">
      <h3 className="section-title">5-Day Forecast</h3>
      <div className="forecast-scroll">
        {displayForecasts.map((item, index) => {
          const condition = item.weather?.[0];
          const iconUrl = `https://openweathermap.org/img/wn/${condition?.icon}@2x.png`;

          return (
            <div key={item.dt} className={`forecast-card slide-up ${index === 0 ? 'today' : ''}`}>
              <span className="forecast-day">{getDayName(item.dt, index)}</span>
              <img className="forecast-icon" src={iconUrl} alt={condition?.description || 'weather'} />
              <div className="forecast-temps">
                <span className="forecast-high">{Math.round(item.main?.temp_max)}°</span>
                <span className="forecast-low">{Math.round(item.main?.temp_min)}°</span>
              </div>
              <span className="forecast-desc">{condition?.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
