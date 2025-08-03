const axios = require('axios');

async function fetchForecast(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error('Error fetching weather forecast:', err.message);
    return null;
  }
}

module.exports = fetchForecast;