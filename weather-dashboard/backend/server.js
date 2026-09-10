const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// Simple in-memory cache: { city: { data, timestamp } }
const cache = new Map();
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

// Fetch weather by coordinates
app.get('/api/weather/coords', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res.status(400).json({ message: "Latitude and longitude are required." });
        }

        const coordKey = `${Number(lat).toFixed(2)},${Number(lon).toFixed(2)}`;
        
        if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'your_openweathermap_api_key_here') {
            return res.status(500).json({ message: "OpenWeatherMap API key is not configured." });
        }

        // Check cache
        if (cache.has(coordKey)) {
            const cachedEntry = cache.get(coordKey);
            if (Date.now() - cachedEntry.timestamp < CACHE_DURATION_MS) {
                console.log(`Serving coords ${coordKey} from cache`);
                return res.json(cachedEntry.data);
            } else {
                cache.delete(coordKey);
            }
        }

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                lat,
                lon,
                appid: OPENWEATHER_API_KEY,
                units: 'metric'
            }
        });

        // Save to cache
        cache.set(coordKey, {
            data: response.data,
            timestamp: Date.now()
        });

        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error while fetching weather data by coordinates." });
    }
});

app.get('/api/weather/:city', async (req, res) => {
    try {
        const { city } = req.params;
        const cityKey = city.toLowerCase().trim();
        
        if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'your_openweathermap_api_key_here') {
            return res.status(500).json({ message: "OpenWeatherMap API key is not configured." });
        }

        // Check cache
        if (cache.has(cityKey)) {
            const cachedEntry = cache.get(cityKey);
            if (Date.now() - cachedEntry.timestamp < CACHE_DURATION_MS) {
                console.log(`Serving ${cityKey} from cache`);
                return res.json(cachedEntry.data);
            } else {
                cache.delete(cityKey); // expire
            }
        }

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: OPENWEATHER_API_KEY,
                units: 'metric'
            }
        });

        // Save to cache
        cache.set(cityKey, {
            data: response.data,
            timestamp: Date.now()
        });

        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: "City not found." });
        } else {
            console.error(error.message);
            res.status(500).json({ message: "Server error while fetching weather data." });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
