"use strict";

require('dotenv').config();

const
    {StatusCodes} = require('http-status-codes');

const
    constant = require('./src/init/const'),
    ctx = {
        now: () => Math.floor(new Date().getTime() / 1000),
        cache: require('./src/init/cache'),
        database: require('./src/init/database'),
        jwt_secret: require('./src/init/jwt_secret')
    },
    util = {
        sara_token: require('./src/utils/sara_token'),
        ip_address: require('./src/utils/ip_address')
    },
    middleware = {
        access: require('./src/middlewares/access'),
        inspector: require('./src/middlewares/inspector'),
        validator: require('express-validator')
    };

const app = require('./src/init/express')(ctx);

app.get('/', (_, res) => {
    res.redirect(StatusCodes.MOVED_PERMANENTLY, process.env.WEBSITE_URL);
});

app.get('/ip', (req, res) => {
    res.send({ip_address: util.ip_address(req)});
});

console.log(`${constant.APP_NAME} (runtime: ${process.env.RUNTIME_ENV || "native"})\n====`);
require('./src/execute')(app, ({type, hostname, port}) => {
    const protocol = type === 'general' ? 'http' : 'https';
    console.log(`Protocol "${protocol}" is listening at`);
    console.log(`${protocol}://${hostname}:${port}`);
});
