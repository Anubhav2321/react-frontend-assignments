import { format } from 'date-fns';
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
  if (weatherId >= 200 && weatherId < 300) return <CloudLightning size={80} color="#a855f7" />;
  if (weatherId >= 300 && weatherId < 400) return <CloudDrizzle size={80} color="#60a5fa" />;
  if (weatherId >= 500 && weatherId < 600) return <CloudRain size={80} color="#3b82f6" />;
  if (weatherId >= 600 && weatherId < 700) return <CloudSnow size={80} color="#93c5fd" />;
  if (weatherId >= 700 && weatherId < 800) return <Cloud size={80} color="#94a3b8" />;
  if (weatherId === 800) return <Sun size={80} color="#fbbf24" />;
  return <Cloud size={80} color="#cbd5e1" />;
};

const WeatherCard = ({ data }) => {
  if (!data || !data.main) return null;

  const { name, main, wind, sys, weather } = data;
  const weatherId = weather[0].id;
  const description = weather[0].description;
  
  // Format timestamps
  // OWM provides unix timestamps (seconds). date-fns expects milliseconds.
  const sunriseTime = format(new Date(sys.sunrise * 1000), 'h:mm a');
  const sunsetTime = format(new Date(sys.sunset * 1000), 'h:mm a');

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top Section: Icon, Temp, City */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem'
      }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>{name}, {sys.country}</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)', textTransform: 'capitalize', fontWeight: '500' }}>
            {description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
            <span style={{ fontSize: '4rem', fontWeight: '800', letterSpacing: '-2px' }}>
              {Math.round(main.temp)}°
            </span>
            <span style={{ fontSize: '1.2rem', opacity: 0.7, alignSelf: 'flex-end', paddingBottom: '0.8rem' }}>C</span>
          </div>
        </div>
        
        <div style={{ padding: '1rem' }}>
          {getWeatherIcon(weatherId)}
        </div>
      </div>

      {/* Grid Details Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1rem',
        marginTop: '1rem'
      }}>
        <DetailItem icon={<Thermometer size={20} />} label="Feels Like" value={`${Math.round(main.feels_like)}°C`} />
        <DetailItem icon={<Droplets size={20} />} label="Humidity" value={`${main.humidity}%`} />
        <DetailItem icon={<Wind size={20} />} label="Wind" value={`${wind.speed} m/s`} />
        <DetailItem icon={<Sunrise size={20} />} label="Sunrise" value={sunriseTime} />
        <DetailItem icon={<Sunset size={20} />} label="Sunset" value={sunsetTime} />
      </div>

    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div style={{
    background: 'var(--input-bg)',
    padding: '1rem',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    border: '1px solid var(--card-border)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)' }}>
      {icon}
      <span style={{ fontSize: '0.9rem', fontWeight: '500', opacity: 0.8 }}>{label}</span>
    </div>
    <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>{value}</span>
  </div>
);

export default WeatherCard;
