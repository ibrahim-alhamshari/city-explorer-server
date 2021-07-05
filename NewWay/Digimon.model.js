const { model } = require("mongoose");
const mongoose = require('mongoose');
const { Schema } = mongoose;


const digimonSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    lowercase: true,
  trime: true
  },
  slug:String,
  thumbnail: String,
  artist_display: String,
  description:String
});
  
  const Digimon = mongoose.model('Digimon', digimonSchema);
  

module.exports ={ Digimon};