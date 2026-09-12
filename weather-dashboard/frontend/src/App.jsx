import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherSidebar from './components/WeatherSidebar';
import WeatherHighlights from './components/WeatherHighlights';
import WeatherMap from './components/WeatherMap';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';
import DynamicBackground from './components/DynamicBackground';
import './App.css';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(true); // Default to Dark Mode

  const fetchWeather = async (city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    if (!apiKey) {
      setError('System Error: API key is missing. Check environment matrix.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Location not found in database. Initiate new search.');
        }
        throw new Error('Network synchronization failed.');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initializing with default city
    fetchWeather('Kolkata');
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const fetchWeatherByLocation = async (lat, lon) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    if (!apiKey) {
      setError('System Error: API key is missing. Check environment matrix.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Network synchronization failed for coordinates.');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DynamicBackground isDark={isDark}>
      <div className="app-wrapper fade-in">
        
        {/* Sidebar Panel */}
        <aside className="glass-panel sidebar">
          <div className="sidebar-header">
            <div className="logo">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
              </svg>
              Nexus Weather
            </div>
            <button className="theme-toggle" onClick={toggleTheme} title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              {isDark ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </div>

          <SearchBar onSearch={fetchWeather} onLocate={fetchWeatherByLocation} />
          
          <ErrorMessage message={error} />
          
          {loading && <div className="flex justify-center my-8"><Spinner /></div>}
          
          {!loading && weatherData && (
            <WeatherSidebar data={weatherData} />
          )}
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          {!loading && weatherData ? (
            <>
              <WeatherHighlights data={weatherData} />
              
              <div className="map-container fade-in">
                <h3 className="section-title">Global Radar</h3>
                <WeatherMap 
                  lat={weatherData.coord?.lat} 
                  lon={weatherData.coord?.lon} 
                  city={weatherData.name} 
                />
              </div>
            </>
          ) : (
             <div className="map-container fade-in" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
               {loading ? <Spinner /> : <div className="text-xl text-slate-400 font-medium">Awaiting Atmospheric Data...</div>}
             </div>
          )}
        </main>
        
      </div>
    </DynamicBackground>
  );
}