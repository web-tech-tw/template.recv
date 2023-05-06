"use strict";
// Check the header "Origin" in request is equal to CORS_ORIGIN,
// if not, interrupt it.

// Import config
const {isProduction, getMust} = require("../config");

// Import StatusCodes
const {StatusCodes} = require("http-status-codes");

// Import isObjectPropExists
const {isObjectPropExists} = require("../utils/native");

// Export (function)
module.exports = (req, res, next) => {
    // Check the request is CORS
    if (!isObjectPropExists(req.headers, "origin")) {
        if (!isProduction()) {
            // Debug message
            console.warn("CORS origin header is not detected");
        }
        next();
        return;
    }

    // Get URLs
    const actualUrl = req.header("origin");
    const expectedUrl = getMust("CORS_ORIGIN");

    // Origin match
    if (actualUrl === expectedUrl) {
        if (!isProduction()) {
            // Debug message
            console.warn(
                "CORS origin header match:",
                `actual "${actualUrl}"`,
                `expected "${expectedUrl}"`,
            );
        }
        next();
        return;
    }

    // Origin mismatch
    if (!isProduction()) {
        // Debug message
        console.warn(
            "CORS origin header mismatch:",
            `actual "${actualUrl}"`,
            `expected "${expectedUrl}"`,
        );
    }
    res.sendStatus(StatusCodes.FORBIDDEN);
};
