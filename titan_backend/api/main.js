// LIBRARIES
require('dotenv').config()
const express = require('express');
const app = express();
const port = 3002;
const bodyParser = require('body-parser')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const { tokenVerify } = require('./auth/jwt')
// LIBRARIES

// ROUTERS
const auth = require('./auth/authorization')
const reg = require('./auth/registration')
const reads = require('./data/readings')
const changes = require('./data/change_logs')
const currentWeather = require('./weather/current_weather')
const session = require('./auth/checkSession');

const os = require('./system/os')
const motherboard = require('./system/motherboard')
const cpu = require('./system/cpu')
const disks = require('./system/disks')
const networks = require('./system/networks')
const wifi = require('./system/wifi')
const bluetooth = require('./system/bluetooth');
const ram = require('./system/ram');
const ramLayout = require('./system/ramLayout');
const avatar = require('./avatar');
// ROUTERS

const getMaxAgeDay = (days) => {
    return (1000 * 60 * 60) * 3 * days * 24
}

// CHECK USER JWT
// function checkJWT(req,res,next) {
//     next()
// }
// CHECK USER JWT

// CORS
const allowedOrigins = ['http://192.168.1.187:3000','http://localhost:3000'];
app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
            if(allowedOrigins.indexOf(origin) === -1){
                console.log(origin);
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
        return callback(null, true);
    },
    credentials: true

}));
// CORS

// MIDDLEWARES
// function tlog (req, res, next) {
//     console.log('test');
//     next()
// }

// app.use(checkJWT)
// app.use(express.json())
app.use(express.static(__dirname))
app.use(cookieParser())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false, parameterLimit: 50000}));
// MIDDLEWARES

app.use('/api', auth)
app.use('/api', reg)
app.use('/api', reads)
app.use('/api', changes)
app.use('/api', session)
app.use('/api', avatar)

app.use('/sys', os)
app.use('/sys', motherboard)
app.use('/sys', cpu)
app.use('/sys', disks)
app.use('/sys', networks)
app.use('/sys', wifi)
app.use('/sys', bluetooth)
app.use('/sys', ram)
app.use('/sys', ramLayout)


app.use('/api/weather', currentWeather)

app.listen(port, () => {
    console.log('Working on ' + port + ' port');
})