const express = require('express');
const cookieParser = require('cookie-parser')
const CurrentWeather = express.Router();
const { keys, useKey } = require('./random_weather_api')

CurrentWeather.get('/current_weather', function(req,res) {
    console.log(useKey().key)
    res.send('Length = ')
})

module.exports = CurrentWeather