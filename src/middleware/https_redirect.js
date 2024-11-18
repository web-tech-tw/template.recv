"use strict";
// Redirect http to https.

// Import modules
const {StatusCodes} = require("http-status-codes");
const {isProduction} = require("../config");

// Export (function)
module.exports = (req, res, next) => {
    if (req.protocol === "http") {
        if (!isProduction()) {
            // Debug message
            console.warn(
                "Pure HTTP protocol detected:",
                `from "${req.hostname}"`,
                `with host header "${req.headers.host}"`,
                `with origin header "${req.headers.origin}"`,
            );
        }
        res.redirect(StatusCodes.MOVED_PERMANENTLY, `https://${req.headers.host}${req.url}`);
    }

    // Call next middleware
    next();
};
