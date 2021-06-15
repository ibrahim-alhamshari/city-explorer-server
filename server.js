const express = require('express') // require the express package
const app = express() // initialize your express app instance
const weatherData = require('./data/weather.json');
const axios = require('axios');
const cors = require('cors');
const { request, response } = require('express');

app.use(cors()) // after you initialize your express app instance

require('dotenv').config();
const PORT = process.env.PORT;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY

// a server endpoint 
app.get('/', // our endpoint name
  function (req, res) { // callback function of what we should do with our request
    console.log('Hello ibrahim');
    res.send('Hello ibrahim')
    // our endpoint function response
  });


app.get('/weather-data', (request, res) => {
  console.log(request.query);
  let lat = request.query.lat;
  let lon = request.query.lon;

  if (lat && lon) {
    
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;

    axios.get(weatherBitUrl).then(response => {
      const responseData = response.data.data.map(object => new Forecast(object))
      res.json(responseData);
    }).catch(error => {
      res.send(error.message);
    })

    // response.json(responseData);
  } else {
    response.send('please provide the proper lat and lon')
  }



})
app.listen(PORT) // kick start the express server to work

class Forecast {
  constructor(weatherData) {
    this.description = weatherData.weather.description,
      this.date = weatherData.valid_date
  }
}

