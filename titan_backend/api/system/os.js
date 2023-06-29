const express = require('express');
const os = express.Router()
const si = require('systeminformation')

os.get('/os', function(req,res) {
    si.osInfo()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.send({
                code: 'os_10',
                code_state: 'error',
                code_message: error
            })
        })
})

module.exports = os