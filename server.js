const express = require('express') //Our express Framework. require the express package (npm install express)
const app = express() // initialize your express app instance
const cors = require('cors'); // cors "Used to allow resource sharing between the frontend and the backend" (npm install cors)
app.use(cors()); // after you initialize your express app instance
require('dotenv').config(); //dotenv "A package to help us read our env variables" (npm install dotenv)
const axios = require('axios'); // superagent "A package used to send requests over the internet to other servers or APIs" (npm install axios)

const PORT = process.env.PORT;

const weatherData = require('./data/weather.json');
const { request, response } = require('express');
const WeatherController = require('./controller/Weather.controller');
const indexController = require('./controller/index.controller');
const movieController =require('./controller/Movie.controller');


app.get('/', indexController);

app.get('/weather-data', WeatherController );

app.get('/movie' , movieController)

app.listen(PORT)
//   ,()=>{
    //   console.log('this like PORT' , PORT)
    // }) // kick start the express server to work

    