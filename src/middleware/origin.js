"use strict";
// Check the header "Origin" in request is equal to WEBSITE_URL,
// if not, interrupt it.

// Import StatusCodes
const {StatusCodes} = require("http-status-codes");

// Export (function)
module.exports = (req, res, next) => {
    const originUrl = req.header("Origin");
    if (originUrl !== process.env.WEBSITE_URL) {
        res.sendStatus(StatusCodes.FORBIDDEN);
        return;
    }
    next();
};
