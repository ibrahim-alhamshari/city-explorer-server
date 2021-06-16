const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const axios = require('axios');
require('dotenv').config();
const Forecast = require('../models/Weather.models');

const weatherController = (request, res) => {
    console.log(request.query);
    let lat = request.query.lat;
    let lon = request.query.lon;

    if (lat && lon) {
        const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
console.log(weatherBitUrl);
        axios.get(weatherBitUrl).then(response => {
            const responseData = response.data.data.map(object => new Forecast(object))
            res.json(responseData);
           }).catch(error => {
            res.send(error.message);
        })

    } else {
        res.send('please provide the proper lat and lon')
    }

}

module.exports = weatherController;