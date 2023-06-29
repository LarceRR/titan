require('dotenv').config()
const express = require('express');
const connection = require('../imp/db_connect')
const cookieParser = require('cookie-parser')
const hash = require('../imp/hash');
const AuthRouter = express.Router()
const { tokenCreate } = require('./jwt')

AuthRouter.post('/auth', function(req,res) {
    const hashed = hash(req.body.pass, req.body.login)
    connection.query(`SELECT * FROM users WHERE login = '${req.body.login}' and password = '${hashed.hashedPass}'`,function(err, result, fileds) {
        if (err) {
            console.log(err);
            res.send({
                code: 40,
                code_state: 'error',
                code_message: 'Ошибка авторизации: ' + err.code
            })
            console.log(err);
        } else {
            if (!result.length > 0) {
                res.send({
                    code: 60,
                    code_state: 'error',
                    code_message: 'Пользователя ' + req.body.login + ' не существует.'
                })
            } else {
                const data = {
                    login: result[0].login,
                    nsm: result[0].full_name,
                    perm: result[0].perm_id
                }
                const token = tokenCreate(data)
                res.setHeader('X-Powered-By', 'Titan')
                res.send({
                    code: 50,
                    code_state: 'success',
                    code_message: 'Auth successfull',
                    user_data: data, 
                    token: token
                })
            }
        }
    })
})

module.exports = AuthRouter