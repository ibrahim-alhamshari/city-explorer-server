const MovieClass = require('../models/Movie.models');
const key = process.env.MOVIE_API_KEY;
const axios = require('axios');
const Cache = require('../helper/cache');

const cacheObj = new Cache();

const movieController = (req, res) => {
  let cityName = req.query.cityName;
let requestKey =cityName;
  if (cityName) {
    if (cacheObj[requestKey]) {
      const results = cacheObj[requestKey];
      console.log(results);
      res.send(results);

    } else {
      const moviesGetting = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}`;

      axios.get(moviesGetting)
        .then(object => {
          const respnsedData = object.data.results.filter(element => {
            if (element.poster_path == null) {
              console.log('true');
            } else {
              return new MovieClass(element);
            }})
            cacheObj[requestKey]= {cachedData:respnsedData};
            cacheObj[requestKey].timeStamp= Date.now();
            const previusDate = cacheObj[requestKey].timeStamp;
            const cacheVariable= cacheObj[requestKey];

          res.send(cacheVariable);
        })
        .catch((error) => {
          res.send(error);
        })
    }
  } else {
    res.send('Please enter the city name. Use this as the same: (?cityName=) then ; the name of the country');
  }
}

module.exports = movieController;