const fs = require('fs');
const http = require('http');
const https = require('https');

function _general(app, callback) {
    app.listen(process.env.HTTP_PORT, process.env.HTTP_HOSTNAME, callback);
}

function _secure(app, callback) {
    app.use((req, res, next) => {
        if (req.protocol === 'http') {
            res.redirect(301, `https://${req.headers.host}${req.url}`);
        }
        next();
    });

    const credentials = {
        key: fs.readFileSync(process.env.HTTPS_KEY_PATH),
        cert: fs.readFileSync(process.env.HTTPS_CERT_PATH)
    };

    const server = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);

    server.listen(parseInt(process.env.HTTP_PORT), process.env.HTTP_HOSTNAME);
    httpsServer.listen(parseInt(process.env.HTTPS_PORT), process.env.HTTP_HOSTNAME);
}

module.exports = function (app, callback) {
    if (process.env.HTTPS !== 'yes') {
        _general(app, callback);
    } else {
        _secure(app, callback);
    }
}
