const express = require('express');
const connection = require('../imp/db_connect')
const cookieParser = require('cookie-parser')
var ChangeLogs = express.Router();
ChangeLogs.get('/changelogs', function(req,res) {
    connection.connect(function(err){
        if (err) {
            return console.log('Ошибка: ' + err.message);
        } else {
            console.log('Connection successfuly');
        }
    })
    connection.query("SELECT * FROM change_logs",
        function(err,result,fileds) {
            var arr = {
                'logs': result
            }
            res.send(arr)
        });
})

module.exports = ChangeLogs