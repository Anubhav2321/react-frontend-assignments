import React from 'react';
import { format } from 'date-fns';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Sunrise, 
  Sunset,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Cloud,
  Sun,
  CloudDrizzle
} from 'lucide-react';

const getWeatherIcon = (weatherId) => {
  if (weatherId >= 200 && weatherId < 300) return <CloudLightning size={120} color="#c084fc" />;
  if (weatherId >= 300 && weatherId < 400) return <CloudDrizzle size={120} color="#93c5fd" />;
  if (weatherId >= 500 && weatherId < 600) return <CloudRain size={120} color="#60a5fa" />;
  if (weatherId >= 600 && weatherId < 700) return <CloudSnow size={120} color="#bfdbfe" />;
  if (weatherId >= 700 && weatherId < 800) return <Cloud size={120} color="#cbd5e1" />;
  if (weatherId === 800) return <Sun size={120} color="#fbbf24" />;
  return <Cloud size={120} color="#e2e8f0" />;
};

export const WeatherCardSkeleton = ({ isSidebar }) => {
  if (isSidebar) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', textAlign: 'center', marginTop: '2rem' }}>
        <Skeleton circle width={150} height={150} />
        <Skeleton height={60} width={120} />
        <div>
          <Skeleton height={30} width={200} style={{ marginBottom: '0.5rem' }} />
          <Skeleton height={20} width={100} />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel fade-in" style={{ padding: '2rem' }}>
      <h3 className="section-title">Today's Highlights</h3>
      <div className="highlights-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="highlight-card">
            <Skeleton height={24} width="60%" style={{ marginBottom: '1rem' }} />
            <Skeleton height={40} width="80%" />
          </div>
        ))}
      </div>
    </div>
  );
};

const WeatherCard = ({ data, isSidebar }) => {
  if (!data || !data.main) return null;

  const { name, main, wind, sys, weather, visibility } = data;
  const weatherId = weather[0].id;
  const description = weather[0].description;
  
  const sunriseTime = format(new Date(sys.sunrise * 1000), 'h:mm a');
  const sunsetTime = format(new Date(sys.sunset * 1000), 'h:mm a');

  if (isSidebar) {
    return (
      <div className="fade-in sidebar-weather">
        <div className="weather-icon-wrapper">
          {getWeatherIcon(weatherId)}
        </div>
        <div className="temp-display">
          {Math.round(main.temp)}<span>°C</span>
        </div>
        <div className="city-info">
          <h2>{name}, {sys.country}</h2>
          <p>{description}</p>
        </div>
        <hr className="divider" />
        <div className="mini-details">
          <div className="mini-detail">
            <Cloud size={18} /> Clouds: {data.clouds.all}%
          </div>
        </div>
      </div>
    );
  }

  // Main content highlights
  return (
    <div className="glass-panel fade-in highlights-panel">
      <h3 className="section-title">Today's Highlights</h3>
      <div className="highlights-grid">
        <HighlightCard title="Feels Like" value={`${Math.round(main.feels_like)}°`} icon={<Thermometer size={30} />} />
        <HighlightCard title="Humidity" value={`${main.humidity}%`} icon={<Droplets size={30} />} />
        <HighlightCard title="Wind Speed" value={`${wind.speed} m/s`} icon={<Wind size={30} />} />
        <HighlightCard title="Visibility" value={`${(visibility / 1000).toFixed(1)} km`} icon={<Sun size={30} />} />
        <HighlightCard title="Sunrise" value={sunriseTime} icon={<Sunrise size={30} />} />
        <HighlightCard title="Sunset" value={sunsetTime} icon={<Sunset size={30} />} />
      </div>
    </div>
  );
};

const HighlightCard = ({ title, value, icon }) => (
  <div className="highlight-card">
    <div className="highlight-header">
      <span className="highlight-title">{title}</span>
      <div className="highlight-icon">{icon}</div>
    </div>
    <div className="highlight-value">{value}</div>
  </div>
);

export default WeatherCard;
