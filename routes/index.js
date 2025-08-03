const express = require('express');
const axios = require('axios');
const router = express.Router();

const fetchForecast = require('../utils/fetchForecast');
const fetchLandmarks = require('../utils/fetchLandmarks');

// 🌍 Country-to-Currency mapping (extended)
const countryToCurrency = {
  IN: 'INR', JP: 'JPY', CN: 'CNY', US: 'USD', CA: 'CAD', GB: 'GBP', AU: 'AUD',
  EU: 'EUR', AE: 'AED', PK: 'PKR', BD: 'BDT', SG: 'SGD', TH: 'THB', PH: 'PHP',
  KR: 'KRW', ZA: 'ZAR', BR: 'BRL', NG: 'NGN', MX: 'MXN', MY: 'MYR', ID: 'IDR',
  NZ: 'NZD', RU: 'RUB', SA: 'SAR', TR: 'TRY', CH: 'CHF', SE: 'SEK', NO: 'NOK',
  DK: 'DKK', HK: 'HKD', IL: 'ILS', EG: 'EGP', KE: 'KES', AR: 'ARS', CO: 'COP',
  CL: 'CLP', VN: 'VND', CZ: 'CZK', HU: 'HUF', RO: 'RON'
};

router.get('/', (req, res) => {
  res.render('home');
});

router.post('/search', async (req, res) => {
  const city = req.body.city;

  if (!city) {
    return res.render('error', { message: 'Please enter a city name.' });
  }

  try {
    // 1. 🌍 GeoDB API – Get city data
    const geoOptions = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
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

    // 2. 🌤 Weather API – Get current weather
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.WEATHER_API_KEY}`
    );
    const weather = weatherRes.data;

    // 3. 💱 Exchange Rate API – Convert to CAD
    const baseCurrency = countryToCurrency[weather.sys.country] || 'USD';
    let exchangeRates = { base: baseCurrency, rates: {} };

    try {
      const currencyRes = await axios.get(
        `https://api.apilayer.com/exchangerates_data/latest?base=${baseCurrency}&symbols=CAD`,
        {
          headers: {
            apikey: process.env.EXCHANGE_API_KEY,
          },
        }
      );
      exchangeRates = currencyRes.data;
    } catch (currencyError) {
      console.warn('Exchange rate fetch failed:', currencyError.message);
    }

    // 4. 📅 Forecast
    const forecast = await fetchForecast(latitude, longitude);

    // 5. 🏛 Landmarks
    const landmarks = await fetchLandmarks(latitude, longitude);

    // ✅ Render result
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