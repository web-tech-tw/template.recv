"use strict";

const {StatusCodes} = require('http-status-codes');

module.exports = (req, res, next) => {
    if (req.protocol === 'http') {
        res.redirect(StatusCodes.MOVED_PERMANENTLY, `https://${req.headers.host}${req.url}`);
    }
    next();
};
