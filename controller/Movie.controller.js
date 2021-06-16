const MovieClass = require('../models/Movie.models');
const key = process.env.MOVIE_API_KEY;
const axios = require('axios');

const movieController = (req, res) => {
    let cityName = req.query.cityName;


    console.log(cityName);
    console.log(req.query);

    if (cityName) {
        const moviesGetting = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}`;

        axios.get(moviesGetting)
            .then(object => {
                const respnsedData = object.data.results.filter(element => {
                    console.log(element.poster_path);
                    if (element.poster_path == null) {
                  console.log('true');
            }else{
                console.log('else');      
                  return new MovieClass(element);
            }
         }
        
              )
            res.send(respnsedData)
            })
  .catch ((error) => {
    res.send(error);
})
  }else {
    res.send('Please enter the city name. Use this as the same: (?cityName=) then ; the name of the country');
}
  }

module.exports = movieController;