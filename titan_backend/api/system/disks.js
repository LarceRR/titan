const express = require('express');
const disks = express.Router()
const si = require('systeminformation')

disks.get('/disks', function(req,res) {
    si.fsSize()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.send({
                code: 'disks_10',
                code_state: 'error',
                code_message: error
            })
        })
})

module.exports = disks