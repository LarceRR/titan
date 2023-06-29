const express = require('express');
const bluetooth = express.Router()
const si = require('systeminformation')

bluetooth.get('/bluetooth', function(req,res) {
    si.bluetoothDevices()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.send({
                code: 'bluetooth_10',
                code_state: 'error',
                code_message: error
            })
        })
})

module.exports = bluetooth