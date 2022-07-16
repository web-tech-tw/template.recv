"use strict";
// Redirect http to https.

// Import StatusCodes
const {StatusCodes} = require("http-status-codes");

// Export (function)
module.exports = (req, res, next) => {
    if (req.protocol === "http") {
        res.redirect(StatusCodes.MOVED_PERMANENTLY, `https://${req.headers.host}${req.url}`);
    }
    next();
};
