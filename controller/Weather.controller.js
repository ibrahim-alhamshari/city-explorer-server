const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const axios = require('axios');
require('dotenv').config();
const Forecast = require('../models/Weather.models');
const Cache = require('../helper/cache');

const cacheObj = new Cache();

const weatherController = (request, res) => {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let requestKey = `weather-data-${lat}-${lon}`
    // 
    let currentDate = Date.now();
    let date;

    if (lat && lon) {
        if (cacheObj[requestKey] && ((currentDate - cacheObj[requestKey].timeStamp) < 86400000)) {
            const results = cacheObj[requestKey]
            res.json(results);
        } else {
            const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
            axios.get(weatherBitUrl).then(response => {
                const responseData = response.data.data.map(object => new Forecast(object));
                
                cacheObj[requestKey] = { cachedData: responseData };
                const previusDate = Date.now();
                cacheObj[requestKey].timeStamp = previusDate;
                const cacheVariable = cacheObj[requestKey];

                date = new Date(previusDate);
                
                cacheObj[requestKey].date = date;
                console.log(cacheObj[requestKey].date);

                res.json(cacheVariable);

            }).catch(error => {
                res.send(error.message);
            })
        }

    } else {
        res.send('please provide the proper lat and lon')
    }

}

module.exports = weatherController;