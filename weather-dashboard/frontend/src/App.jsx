import { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import WeatherSidebar from './components/WeatherSidebar';
import WeatherHighlights from './components/WeatherHighlights';
import WeatherMap from './components/WeatherMap';
import ForecastSection from './components/ForecastSection';
import AirQuality from './components/AirQuality';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';
import DynamicBackground from './components/DynamicBackground';
import './App.css';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const STORAGE_KEYS = {
  SEARCH_HISTORY: 'nexus_search_history',
  LAST_CITY: 'nexus_last_city',
  THEME: 'nexus_theme',
  LAST_WEATHER: 'nexus_last_weather',
};
const MAX_HISTORY = 10;

/** LocalStorage helpers */
function loadFromStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable
  }
}

export default function App() {
  const [weatherData, setWeatherData] = useState(() => loadFromStorage(STORAGE_KEYS.LAST_WEATHER, null));
  const [forecastData, setForecastData] = useState(null);
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(() => loadFromStorage(STORAGE_KEYS.THEME, true));
  const [searchHistory, setSearchHistory] = useState(() => loadFromStorage(STORAGE_KEYS.SEARCH_HISTORY, []));

  // Apply dark class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveToStorage(STORAGE_KEYS.THEME, isDark);
  }, [isDark]);

  // Add to search history
  const addToHistory = useCallback((city) => {
    setSearchHistory((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== city.toLowerCase());
      const updated = [city, ...filtered].slice(0, MAX_HISTORY);
      saveToStorage(STORAGE_KEYS.SEARCH_HISTORY, updated);
      return updated;
    });
  }, []);

  // Remove from search history
  const removeFromHistory = useCallback((city) => {
    setSearchHistory((prev) => {
      const updated = prev.filter((c) => c !== city);
      saveToStorage(STORAGE_KEYS.SEARCH_HISTORY, updated);
      return updated;
    });
  }, []);

  // Fetch forecast (5-day / 3-hour)
  const fetchForecast = useCallback(async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      if (res.ok) {
        const data = await res.json();
        setForecastData(data);
      }
    } catch {
      // Silently fail — forecast is supplementary
    }
  }, []);

  // Fetch Air Quality
  const fetchAqi = useCallback(async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      if (res.ok) {
        const data = await res.json();
        setAqiData(data);
      }
    } catch {
      // Silently fail
    }
  }, []);

  // Fetch weather by city name
  const fetchWeather = useCallback(async (city) => {
    if (!API_KEY) {
      setError('API key is missing. Add VITE_WEATHER_API_KEY to .env');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        if (response.status === 404) throw new Error(`City "${city}" not found. Try another location.`);
        throw new Error('Failed to fetch weather data. Please try again.');
      }

      const data = await response.json();
      setWeatherData(data);
      saveToStorage(STORAGE_KEYS.LAST_WEATHER, data);
      saveToStorage(STORAGE_KEYS.LAST_CITY, city);
      addToHistory(data.name || city);

      // Fetch supplementary data
      if (data.coord) {
        fetchForecast(data.coord.lat, data.coord.lon);
        fetchAqi(data.coord.lat, data.coord.lon);
      }
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
      setAqiData(null);
    } finally {
      setLoading(false);
    }
  }, [addToHistory, fetchForecast, fetchAqi]);

  // Fetch weather by coordinates
  const fetchWeatherByLocation = useCallback(async (lat, lon) => {
    if (!API_KEY) {
      setError('API key is missing. Add VITE_WEATHER_API_KEY to .env');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) throw new Error('Failed to fetch weather for your location.');

      const data = await response.json();
      setWeatherData(data);
      saveToStorage(STORAGE_KEYS.LAST_WEATHER, data);
      if (data.name) {
        saveToStorage(STORAGE_KEYS.LAST_CITY, data.name);
        addToHistory(data.name);
      }

      // Fetch supplementary data
      fetchForecast(lat, lon);
      fetchAqi(lat, lon);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
      setAqiData(null);
    } finally {
      setLoading(false);
    }
  }, [addToHistory, fetchForecast, fetchAqi]);

  // Initial load — use last city from localStorage or default
  useEffect(() => {
    const lastCity = loadFromStorage(STORAGE_KEYS.LAST_CITY, 'Kolkata');
    fetchWeather(lastCity);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <DynamicBackground weatherData={weatherData} isDark={isDark}>
      <div className="app-wrapper fade-in">

        {/* Sidebar Panel */}
        <aside className="glass-panel sidebar">
          <div className="sidebar-header">
            <div className="logo">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
              </svg>
              Nexus Weather
            </div>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              id="theme-toggle-btn"
            >
              {isDark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </div>

          <SearchBar
            onSearch={fetchWeather}
            onLocate={fetchWeatherByLocation}
            searchHistory={searchHistory}
            onRemoveHistory={removeFromHistory}
          />

          <ErrorMessage message={error} />

          {loading && <Spinner />}

          {!loading && weatherData && (
            <WeatherSidebar data={weatherData} />
          )}
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          {!loading && weatherData ? (
            <>
              <WeatherHighlights data={weatherData} />

              <ForecastSection forecastData={forecastData} />

              <AirQuality aqiData={aqiData} />

              <div className="map-container glass-panel fade-in">
                <h3 className="section-title">Global Radar</h3>
                <WeatherMap
                  lat={weatherData.coord?.lat}
                  lon={weatherData.coord?.lon}
                  city={weatherData.name}
                  isDark={isDark}
                />
              </div>
            </>
          ) : (
            <div className="map-container glass-panel fade-in" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {loading ? <Spinner /> : <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Awaiting Weather Data...</div>}
            </div>
          )}
        </main>

      </div>
    </DynamicBackground>
  );
}