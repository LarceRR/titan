const express = require('express');
const ram = express.Router()
const si = require('systeminformation')

ram.get('/ram', function(req,res) {
    si.mem()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.send({
                code: 'ram_10',
                code_state: 'error',
                code_message: error
            })
        })
})

module.exports = ram