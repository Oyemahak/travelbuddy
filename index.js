// index.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware: Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Static files (e.g., CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Start server
app.listen(port, () => {
  console.log(`✅ TravelBuddy is running at http://localhost:${port}`);
});