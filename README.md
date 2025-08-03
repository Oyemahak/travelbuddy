# 🌍 TravelBuddy

Plan your trips with confidence — get real-time weather, local time, currency exchange rates, 30-day forecasts, and nearby landmarks for **any city in the world**.

🔗 **Live Demo:** [https://travelbuddy-o6ku.onrender.com](https://travelbuddy-o6ku.onrender.com)

---

## Features

- 🔎 **Search by city name** — worldwide support (Tokyo, Toronto, Mumbai, etc.)
- 🌤️ **Current Weather Info** — temperature, humidity, wind speed, and more
- 🕒 **Timezone & Population** — basic city info with real-time data
- 💱 **Currency Exchange Rate** — shows rate from local currency to CAD
- 📅 **30-Day Forecast** — extended future weather data (OpenWeatherMap)
- 🏛️ **Nearby Landmarks** — highlights popular places around the city

---

## Tech Stack

- **Backend:** Node.js, Express
- **Templating Engine:** Pug
- **Styling:** CSS (responsive and modern UI)
- **APIs Used:**
  - 🌍 [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities/)
  - 🌤️ [OpenWeatherMap API](https://openweathermap.org/)
  - 💱 [Apilayer Exchange Rates API](https://apilayer.com/marketplace/exchangerates_data-api)
  - 📍 [Geoapify Places API](https://www.geoapify.com/places-api)

---

## How It Works

1. User enters a city name.
2. The app fetches:
   - City info using **GeoDB**
   - Current weather + 30-day forecast from **OpenWeatherMap**
   - Currency exchange to CAD using **Apilayer**
   - Local landmarks via **Geoapify**
3. All data is displayed beautifully in one result dashboard.

---

## .env Configuration

Create a `.env` file in the project root and add your API keys:

```env
# 🌤 OpenWeatherMap API Key
WEATHER_API_KEY=0ac62d998d55377ef56995022c766cf2

# 🌍 GeoDB Cities API via RapidAPI
RAPIDAPI_KEY=ba5dc43eb6msh4fa6a93cc243c72p13a482jsn7259857b0ac2

# 💱 Exchange Rate API (via Apilayer)
EXCHANGE_API_KEY=zhH2jE4UIKNZBgErk7UWNmZyeDlvXhaD

# 📍 Geoapify API Key (for landmarks)
GEOAPIFY_KEY=e7a5f3616dc240d3996af5de1638e495

## Clone the repository
git clone https://github.com/oyemahak/travelbuddy.git
cd travelbuddy

# Install dependencies
npm install

# Add your API keys to .env file
# Start the server
npm start

# Visit http://localhost:3000

## Contact

Made with 💙 by [Mahak Patel](https://www.linkedin.com/in/mahak-patel-167640150)

Feel free to connect or reach out via:

- ✉️ Email: [mahakpateluux@gmail.com](mailto:mahakpateluux@gmail.com)
- 🌐 Portfolio: [https://mahak-patel.vercel.app](https://mahak-patel.vercel.app)
- 📱 Phone: +1 (647) 285-9293

## 📬 Contact

Made with 💙 by [Mahak Patel](https://www.linkedin.com/in/mahak-patel-167640150)

Feel free to connect or reach out via:

- ✉️ Email: [mahakpateluux@gmail.com](mailto:mahakpateluux@gmail.com)