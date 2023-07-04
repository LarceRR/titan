require('dotenv').config()
const express = require('express')
const avatar = express.Router()

avatar.get('/avatar/:user', function(req,res) {
    res.sendFile('D:/titan/titan_backend/upd/'+req.params.user+'.jpg', (err) => {
        if (err) {
            if (err.code == 'ENOENT') {
                res.sendFile('D:/titan/titan_backend/upd/'+req.params.user+'.png', (err) => {
                    res.sendFile('D:/titan/titan_backend/upd/FILE-NOT-FOUND#.png')
                })
            } else {
                res.send('avatar error')
            }
        }
    })
})

module.exports = avatar