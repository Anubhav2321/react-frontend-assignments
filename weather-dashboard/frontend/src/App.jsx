import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sun, Moon } from 'lucide-react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';
import './index.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    }
    
    // Fetch default city on initial load
    fetchWeather('Kolkata');
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
      if (err.response && err.response.status === 404) {
        setError('City not found. Please try again.');
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>WeatherDash</h1>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      <main className="glass-panel fade-in">
        <SearchBar onSearch={fetchWeather} />
        
        {loading && <Spinner />}
        {error && <ErrorMessage message={error} />}
        {weatherData && !loading && !error && (
          <WeatherCard data={weatherData} />
        )}
      </main>
    </div>
  );
}

export default App;
