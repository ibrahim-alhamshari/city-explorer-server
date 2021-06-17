const express = require('express') // require the express package
const app = express() // initialize your express app instance
const weatherData = require('./data/weather.json');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const { request, response } = require('express');
const WeatherController = require('./controller/Weather.controller');
const indexController = require('./controller/index.controller');
const movieController =require('./controller/Movie.controller');
const PORT = process.env.PORT;
app.use(cors()); // after you initialize your express app instance


app.get('/', indexController);

app.get('/weather-data', WeatherController );

app.get('/movie' , movieController)

app.listen(PORT)
//   ,()=>{
//   console.log('this like PORT' , PORT)
// }) // kick start the express server to work



