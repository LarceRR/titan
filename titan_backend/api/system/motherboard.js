const express = require('express');
const motherboard = express.Router()
const si = require('systeminformation')

motherboard.get('/motherboard', function(req,res) {
    si.system()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.send({
                code: 'motherboard_10',
                code_state: 'error',
                code_message: error
            })
        })
})

module.exports = motherboard