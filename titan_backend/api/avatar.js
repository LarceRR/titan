require('dotenv').config()
const config = process.env
const express = require('express');
const jwt = require('jsonwebtoken')
const avatar = express.Router()

avatar.get('/avatar/:user', function(req,res) {
    res.sendFile('D:/titan/titan_backend/upd/'+req.params.user+'.jpg', (err) => {
        if (err) {
            if (err.code == 'ENOENT') {
                res.sendFile('D:/titan/titan_backend/upd/'+req.params.user+'.png', (err) => {
                    res.sendFile('D:/titan/titan_backend/upd/FILE-NOT-FOUND#.png')
                })
            }
        }
    })
})

module.exports = avatar