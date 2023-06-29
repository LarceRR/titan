const express = require('express');
const connection = require('../imp/db_connect')
const cookieParser = require('cookie-parser')
const Readings = express.Router();

Readings.get('/readings', function(req,res) {
    connection.connect(function(err){
        if (err) {
            return console.log('Ошибка: ' + err.message);
        } else {
            console.log('Connection successfuly');
        }
    })
    connection.query("SELECT * FROM readings_gas",
        function(err,result,fileds) {
            const gas = result
            connection.query("SELECT * FROM readings_water",
                function(err,result,fileds) {
                    const water = result
                    connection.query("SELECT * FROM readings_light",
                        function(err,result,fileds) {
                            var arr = {
                                'light': result,
                                'gas': gas,
                                'water': water
                            }
                            res.send(arr);
                        });
                });
        });
})

module.exports = Readings