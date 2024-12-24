// models/fruit.js
//1. create scheam
const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

//2. registed model

const Fruit = mongoose.model('Fruit',fruitSchema) // creeate model











//3.share it with the rest of the app

module.exports = Fruit;