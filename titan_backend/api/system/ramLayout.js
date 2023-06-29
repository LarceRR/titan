const express = require('express');
const ramLayout = express.Router()
const si = require('systeminformation')

ramLayout.get('/ramLayout', function(req,res) {
    si.memLayout()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.send({
                code: 'ramLayout_10',
                code_state: 'error',
                code_message: error
            })
        })
})

module.exports = ramLayout