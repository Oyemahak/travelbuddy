// utils/fetchLandmarks.js
const axios = require('axios');

async function fetchLandmarks(lat, lon) {
  const radius = 7000; // 7 km radius from city center
  const limit = 10;

  const url = `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${lon},${lat},${radius}&limit=${limit}&apiKey=${process.env.GEOAPIFY_KEY}`;

  try {
    const res = await axios.get(url);
    return res.data.features.map(feature => ({
      name: feature.properties.name || 'Unnamed Landmark',
      type: feature.properties.categories?.[0] || 'Attraction',
      address: feature.properties.address_line1 || '',
    }));
  } catch (err) {
    console.error('Error fetching landmarks:', err.message);
    return [];
  }
}

module.exports = fetchLandmarks;