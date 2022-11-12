const express = require("express");
const redis = require('redis');
const mysql = require('mysql2');
const path = require('path');
const fs = require("fs");
const bcrypt = require('bcrypt');

//Constants
const jwtSalt = 'JqMTLgSgRG';
const passwordHashSalt = bcrypt.genSaltSync(7);
const cookieLifetime = 1000 * 60 * 5;
Object.defineProperties(global, {
    jwtSalt: {value: passwordHashSalt},
    passwordHashSalt: {value: passwordHashSalt},
    cookieLifetime: {value: cookieLifetime},
});

// ---------------------------------------------------------------------------------------
const app = express();
const wss = require("express-ws")(app);
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const multer = require('multer');
const upload = multer();

//MySQL connection
let connectionMySQL = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mlc',
    password: 'admin',
});
Object.defineProperty(global, 'connectionMySQL', {value: connectionMySQL});
connectionMySQL.connect();

//Redis connection
const clientRedis = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
});
clientRedis['auth'] = null;
clientRedis.on('error', (err) => console.log('Redis Client Error', err));
Object.defineProperty(global, 'clientRedis', {value: clientRedis});

//Handmade modules
const module_exists = require('module-exists');
const service = module_exists('./service.ts') ? require('./service.ts') : require('./service.js');

// ---------------------------------------------------------------------------------------

//Logger of some kind
app.use('/', function (req, res, next) {
    console.log(`${req.method}|${req.url}`);
    console.log(req.cookies);
    console.log(req.signedCookies);
    next();
})

//main page
app.post('/', upload.none(), async function (req, res) {
    const requestType = req.get('MLC-request-type');
    if (!req.body || !requestType) return;

    switch (requestType) {
        case 'login':
            try {
                const login = req.body.login;
                const password = req.body.password;
                service.checkPassword(login, password, (userid) => {
                    const randomAuthTokenSeed = Math.round(Math.random() * 9000 + 1000);
                    const authToken = 'valid-name-' + login + randomAuthTokenSeed;
                    if (!service.setAuthToken(userid, authToken, cookieLifetime)) throw 'Can`t assign auth token';
                    res.cookie('authorized', authToken, {
                        maxAge: cookieLifetime,
                    }).redirect('/');
                }, () => {
                    res.status(401).type('html').send('<h1>Access denied!</h1>');
                });
                s
            } catch (err) {
                res.status(500).send(err);
            }
            break;

        case 'check-vacant-login':
            try {
                const login = req.body.login;
                const isLoginVacant = await service.checkVacantLogin(login);
                res.set('Response-Type').json({'isLoginVacant': isLoginVacant}).send();
            } catch (err) {
                res.status(500).send(err);
            }
            break;

        case 'register':
            try {
                res.send('new user you are?');
            } catch (err) {
                res.status(500).send(err);
            }
            break;

        default:
            res.status(404).send('Invalid MLC-request-type header content.' + req.get('MLC-request-desc'));
    }
});

// ---------------------------------------------------------------------------------------

//redirect to loading page
app.use(express.static("_bld/pages"));

app.use('/$', function (req, res, next) {
    if (req.cookies && req.cookies['auth'] === 'valid') res.send("<h1>Welcome!</h1>")
    else res.redirect('login.html');
});

// ---------------------------------------------------------------------------------------

//Web-server start
clientRedis.connect().then(service.transferDataToRedis()).then(() => {
    app.listen(3000);
    console.log('RUNNING\n');
}).catch((err) => {
    throw new Error(err);
});

//Shutdown
process.addListener('exit', args => {
    connectionMySQL.end();
    clientRedis.quit();
});