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

app.get('/api/weather/:city', async (req, res) => {
    try {
        const { city } = req.params;
        
        if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'your_openweathermap_api_key_here') {
            return res.status(500).json({ message: "OpenWeatherMap API key is not configured." });
        }

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: OPENWEATHER_API_KEY,
                units: 'metric'
            }
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
