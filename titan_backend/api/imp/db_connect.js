const mysql = require('mysql2');
require('dotenv').config()
const config = process.env

const connection = mysql.createConnection({
    host: config.DB_HOST || 'localhost',
    user: config.DB_USERNAME || 'Denzare',
    database: config.DB_DATABASE || 'titan',
    password: ''
});

module.exports = connection