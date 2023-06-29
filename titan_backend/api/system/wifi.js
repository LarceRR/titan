const express = require('express');
const wifi = express.Router()
const si = require('systeminformation')

wifi.get('/wifi', function(req,res) {
    si.wifiConnections()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.send({
                code: 'wifi_10',
                code_state: 'error',
                code_message: error
            })
        })
})

module.exports = wifi