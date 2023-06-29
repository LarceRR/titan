const express = require('express');
const networks = express.Router()
const si = require('systeminformation')

networks.get('/networks', function(req,res) {
    si.networkInterfaces()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.send({
                code: 'networks_10',
                code_state: 'error',
                code_message: error
            })
        })
})

module.exports = networks