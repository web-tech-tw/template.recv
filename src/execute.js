const fs = require('fs');
const http = require('http');
const https = require('https');

function _general(app, callback) {
    const httpServer = http.createServer(app);
    httpServer.listen(parseInt(process.env.HTTP_PORT), process.env.HTTP_HOSTNAME);
    callback();
}

function _secure(app, callback) {
    const credentials = {
        key: fs.readFileSync(process.env.HTTPS_KEY_PATH),
        cert: fs.readFileSync(process.env.HTTPS_CERT_PATH)
    };

    if (process.env.HTTPS_REDIRECT === 'yes') {
        app.use((req, res, next) => {
            if (req.protocol === 'http') {
                res.redirect(301, `https://${req.headers.host}${req.url}`);
            }
            next();
        });
    }

    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(parseInt(process.env.HTTPS_PORT), process.env.HTTP_HOSTNAME);
    callback();
}

module.exports = function (app, callback) {
    if (process.env.HTTPS === 'both') {
        _general(app, callback);
        _secure(app, callback);
    } else if (process.env.HTTPS === 'only') {
        _secure(app, callback);
    } else {
        _general(app, callback);
    }
}
