require('dotenv').config()
const config = process.env
const express = require('express');
const jwt = require('jsonwebtoken')
const session = express.Router()

session.post('/session', function(req,res) {
    console.log(req.headers);
    jwt.verify(req.headers.authorization, config.AUTH_TOKEN, {}, (err, decoded) => {
        if (err) {
            res.send({
                code: 70,
                code_state: 'error',
                code_message: 'Bad JWT',
                jwt_error: err
            })
        } else {
            res.send({
                code: 80,
                code_state: 'success',
                user_data: {
                    login: decoded.login,
                    nsm: decoded.nsm,
                    perm_id: decoded.perm
                }
            })
        }
    });
})

module.exports = session