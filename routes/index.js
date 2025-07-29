// routes/index.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const fetchForecast = require('../utils/fetchForecast');
const fetchLandmarks = require('../utils/fetchLandmarks');

// Home page – show form
router.get('/', (req, res) => {
    res.render('home');
});

// Form submission – process city
router.post('/search', async (req, res) => {
    const city = req.body.city;

    if (!city) {
        return res.render('error', { message: 'Please enter a city name.' });
    }

    try {
        // 1. GeoDB API – Get city data
        const geoOptions = {
            method: 'GET',
            url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
            params: { namePrefix: city, limit: 1 },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
            },
        };
        const geoRes = await axios.request(geoOptions);
        const geo = geoRes.data.data[0];

        if (!geo) {
            return res.render('error', { message: 'City not found. Try again.' });
        }

        const { latitude, longitude, country, timezone, population, name } = geo;

        // 2. Weather API – Get current weather
        const weatherRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.WEATHER_API_KEY}`
        );
        const weather = weatherRes.data;

        // 3. Currency API – Get exchange rate
        const currencyBase = weather.sys.country || 'USD';
        const currencyRes = await axios.get(
            `https://api.exchangerate.host/latest?base=${currencyBase}`
        );
        const exchangeRates = currencyRes.data;

        // 4. Forecast – 5-day weather forecast
        const forecast = await fetchForecast(latitude, longitude);

        // 5. Landmarks – nearby sights & attractions
        const landmarks = await fetchLandmarks(latitude, longitude);

        // Render result.pug with full data
        res.render('result', {
            name,
            country,
            timezone,
            population,
            weather,
            exchangeRates,
            forecast,
            landmarks,
        });
    } catch (error) {
        console.error('Search error:', error.message);
        res.render('error', {
            message: 'Something went wrong while fetching travel info. Please try again.',
        });
    }
});

module.exports = router;