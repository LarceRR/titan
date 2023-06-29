const express = require('express');
const cpu = express.Router()
const si = require('systeminformation')

cpu.get('/cpu', function(req,res) {
    si.cpu()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.send({
                code: 'cpu_10',
                code_state: 'error',
                code_message: error
            })
        })
})

module.exports = cpu