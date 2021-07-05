const express = require('express');
const server = express();
const cors = require('cors');
server.use(cors());
require('dotenv').config();

server.use(express.json());


const mongoose = require('mongoose');
const { Schema } = mongoose;



const {getFavoriteHandler, addFavoriteHandler, updateFavoriteHandler, deleteFavoriteHandler } = require('./controller/Digimon.controller');
const getDataHandler = require('./controller/filterAPI.controller');
mongoose.connect('mongodb://localhost:27017/digimon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const PORT = process.env.PORT;


server.get('/getdata', getDataHandler);
server.post('/addfavorite', addFavoriteHandler);
server.get('/getfavorite', getFavoriteHandler);
server.put('/updatefavorite/:slug', updateFavoriteHandler);
server.delete('/deletefavorite/:slug', deleteFavoriteHandler);

server.get('*', (req, res) => {
  res.send('PAGE NOT FOUND');
});

server.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
