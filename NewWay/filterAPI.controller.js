const filtering=require('../model/filterAPI.model');
const axios = require('axios');


const getDataHandler = (req, res) => {
    axios.get('https://api.artic.edu/api/v1/artworks?limit=10').then((response) => {
        const dataResponse = response.data.data.map(element => new filtering(element))
        res.json(dataResponse);
    });
};

module.exports = getDataHandler;