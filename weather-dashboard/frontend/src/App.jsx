import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sun, Moon, Search, Cloud } from 'lucide-react';
import SearchBar from './components/SearchBar';
import WeatherCard, { WeatherCardSkeleton } from './components/WeatherCard';
import WeatherMap from './components/WeatherMap';
import DynamicBackground from './components/DynamicBackground';
import ErrorMessage from './components/ErrorMessage';
import './index.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    }
    
    // Try to get user location on load
    handleLocate();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  const fetchWeather = async (city) => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/weather/${city}`);
      setWeatherData(response.data);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/weather/coords?lat=${lat}&lon=${lon}`);
      setWeatherData(response.data);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAxiosError = (err) => {
    if (err.response && err.response.status === 404) {
      setError('Location not found. Please try again.');
    } else if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      fetchWeather('London'); // fallback
      return;
    }
    
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        console.warn("Geolocation denied or failed.", err);
        fetchWeather('London'); // fallback
      }
    );
  };

  const weatherCondition = weatherData?.weather?.[0]?.main || 'Clear';

  return (
    <>
      <DynamicBackground weatherCondition={weatherCondition} />
      
      <div className="app-wrapper">
        {/* Sidebar / Left Column */}
        <aside className="sidebar glass-panel fade-in">
          <div className="sidebar-header">
            <h1 className="logo">
              <Cloud size={32} color="var(--primary-color)" />
              WeatherDash
            </h1>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          <div className="search-section">
            <SearchBar onSearch={fetchWeather} onLocate={handleLocate} />
            {error && <ErrorMessage message={error} />}
          </div>

          <div className="main-weather-section">
            {loading ? (
              <WeatherCardSkeleton isSidebar={true} />
            ) : weatherData ? (
              <WeatherCard data={weatherData} isSidebar={true} />
            ) : null}
          </div>
        </aside>

        {/* Main Content / Right Column */}
        <main className="main-content fade-in" style={{ animationDelay: '0.1s' }}>
          
          {loading ? (
             <WeatherCardSkeleton isSidebar={false} />
          ) : weatherData ? (
             <WeatherCard data={weatherData} isSidebar={false} />
          ) : null}

          <div className="map-container glass-panel fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="section-title">Interactive Map</h3>
            {(!loading && weatherData) ? (
              <WeatherMap 
                  lat={weatherData.coord.lat} 
                  lon={weatherData.coord.lon} 
                  city={weatherData.name} 
              />
            ) : (
              <div className="map-placeholder">
                  <span>{loading ? 'Loading map data...' : 'Search for a city to view the map'}</span>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
