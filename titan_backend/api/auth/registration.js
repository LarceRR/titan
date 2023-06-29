
const hash = require('../imp/hash')
const express = require('express');
const connection = require('../imp/db_connect')
const Registration = express.Router()
const fs = require('fs')

Registration.post('/register', (req, res) => {

    const hashed = hash(req.body.pass, req.body.login)

    connection.connect(function(err){
        if (err) {
            return console.log('Ошибка: ' + err.message);
        } else {
            console.log('Connection successfuly');
        }
    })
    connection.query(`SELECT * FROM users WHERE login = '${req.body.login}'`,function(err, result, fileds) {
        if (err) throw err;
        if (result.length) {
            res.send({
                code: 10,
                code_state: 'error',
                code_message: 'Пользователь с таким именем уже существует'
            })
        } else {
            if (req.body.avatar) {
                var image = req.body.avatar
                var base64Data = image.replace('data:image/jpeg;base64,', '')
        
                fs.writeFileSync(`upd/${req.body.login}.jpg`, base64Data, 'base64', function(err) {
                    if(err) throw err
                })
            }
            connection.query(`INSERT INTO users (full_name, login, password, avatar, perm_id) VALUES ('${req.body.nsm}','${req.body.login}','${hashed.hashedPass}','${req.body.login}',1)`,
            function(err,result,fileds) {
                if (err) {
                    res.send({
                        code: 30,
                        code_state: 'error',
                        code_message: 'Ошибка при выполнении запроса: ' + err.code
                    })
                } else {
                    res.send({
                        code: 20,
                        code_state: 'success',
                        code_message: 'Успешная регистрация'
                    })
                }
            });
        }
    })

})

module.exports = Registration