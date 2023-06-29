const jwt = require('jsonwebtoken')
const connection = require('../imp/db_connect')
require('dotenv').config()
const config = process.env
const { sign,verify } = jwt

Date.prototype.addHours = function(h) {
    this.setHours(this.getHours()+h)
    return this
}

function tokenUpload(token) {

    const exp = () => {
        return new Date().addHours(5).toISOString()
    }

    connection.query(`INSERT INTO online_tokens (token, exp) VALUES ('${token}', '${exp()}')`, function(err, result, fileds) {
        if (err) throw err
        if (result) {
            console.log('token inserted');
        }
    })
}

function tokenCreate(payload) {
    const token = sign(
        payload,
        config.AUTH_TOKEN,
        {
            expiresIn: config.TOKEN_EXP
        }
    )
    tokenUpload(token)
    return token
}

function tokenVerify(token) {
    try {
        return verify(token, config.AUTH_TOKEN, {'jwtid': Math.random().toFixed()*100})
    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = {tokenCreate, tokenVerify}