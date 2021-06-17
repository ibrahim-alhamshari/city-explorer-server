const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const axios = require('axios');
require('dotenv').config();
const Forecast = require('../models/Weather.models');
const Cache =require('../helper/cache');

const cacheObj= new Cache();

const weatherController = (request, res) => {
    console.log(request.query);
    let lat = request.query.lat;
    let lon = request.query.lon;
    let requestKey= `weather-data-${lat}-${lon}`
// 
let currentDate = Date.now();


    if (lat && lon) {
        if(cacheObj[requestKey] && ((Date.now() - cacheObj[requestKey].timeStamp) < 8640000)){
            console.log('===================');
            console.log('from the cache object');
            console.log(currentDate -cacheObj[requestKey].timeStamp);
            console.log('===================');
            const results = cacheObj[requestKey]
            res.json(results);
        }else{
        const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
        axios.get(weatherBitUrl).then(response => {
            const responseData = response.data.data.map(object => new Forecast(object));
            cacheObj[requestKey]= {data:responseData};
            cacheObj[requestKey].timeStamp= Date.now();
            
            res.json(responseData);
        }).catch(error => {
            res.send(error.message);
        })
    }

    } else {
        res.send('please provide the proper lat and lon')
    }

}

module.exports = weatherController;