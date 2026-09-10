import React from 'react';
import './DynamicBackground.css';

// High-quality Unsplash image fallbacks if videos aren't available
const WEATHER_BACKGROUNDS = {
  Clear: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=2574&auto=format&fit=crop', // Sunny sky
  Clouds: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2551&auto=format&fit=crop', // Cloudy
  Rain: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2574&auto=format&fit=crop', // Rain
  Drizzle: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2574&auto=format&fit=crop', 
  Thunderstorm: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0ce3c?q=80&w=2670&auto=format&fit=crop', // Lightning
  Snow: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=2608&auto=format&fit=crop', // Snow
  Mist: 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=2574&auto=format&fit=crop', // Fog
  Haze: 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=2574&auto=format&fit=crop',
  Default: 'https://images.unsplash.com/photo-1504608524841-42ce6c20b0fa?q=80&w=2564&auto=format&fit=crop'
};

const DynamicBackground = ({ weatherCondition }) => {
  const bgImage = WEATHER_BACKGROUNDS[weatherCondition] || WEATHER_BACKGROUNDS.Default;

  return (
    <div className="dynamic-background">
      {/* We use an image with CSS animations to simulate dynamic movement (slow pan/zoom) */}
      <div 
        className="bg-image-layer"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="bg-overlay" />
      
      {/* Weather specific particle effects using CSS */}
      {weatherCondition === 'Rain' || weatherCondition === 'Drizzle' ? (
        <div className="rain-container">
           {Array.from({ length: 100 }).map((_, i) => (
             <div key={i} className="raindrop" style={{ 
               left: `${Math.random() * 100}%`, 
               animationDuration: `${0.5 + Math.random() * 0.5}s`,
               animationDelay: `${Math.random() * 2}s` 
             }} />
           ))}
        </div>
      ) : null}

      {weatherCondition === 'Snow' ? (
        <div className="snow-container">
           {Array.from({ length: 50 }).map((_, i) => (
             <div key={i} className="snowflake" style={{ 
               left: `${Math.random() * 100}%`, 
               animationDuration: `${5 + Math.random() * 5}s`,
               animationDelay: `${Math.random() * 5}s`,
               width: `${Math.random() * 8 + 2}px`,
               height: `${Math.random() * 8 + 2}px`
             }} />
           ))}
        </div>
      ) : null}
    </div>
  );
};

export default DynamicBackground;
