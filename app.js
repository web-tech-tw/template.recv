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
        email: require('./src/utils/mail'),
        token: require('./src/utils/token'),
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

app.listen(process.env.HTTP_PORT, process.env.HTTP_HOSTNAME, () => {
    console.log(constant.APP_NAME)
    console.log('====')
    console.log('Application is listening at')
    console.log(`http://localhost:${process.env.HTTP_PORT}`)
});
