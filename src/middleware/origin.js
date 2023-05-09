"use strict";
// Check the header "Origin" in request is equal to CORS_ORIGIN,
// if not, interrupt it.

// Import config
const {isProduction, getMust, getEnabled} = require("../config");

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

    // Get URLs
    const isEnabledSwagger = getEnabled("ENABLED_SWAGGER");
    const expectedSwaggerUrl = getMust("SWAGGER_CORS_ORIGIN");

    // Origin from Swagger match
    if (isEnabledSwagger && actualUrl === expectedSwaggerUrl) {
        if (!isProduction()) {
            // Debug message
            console.warn(
                "CORS origin header from Swagger match:",
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
