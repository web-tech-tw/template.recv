"use strict";
// Interrupt the request
// which is not satisfied the result from express-validator.

// Import modules
const {StatusCodes} = require("http-status-codes");
const {isProduction} = require("../config");
const {validationResult} = require("express-validator");

// Export (function)
module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        if (!isProduction()) {
            // Debug message
            console.warn(
                "A bad request received:",
                errors,
            );
        }
        res.
            status(StatusCodes.BAD_REQUEST).
            json({errors: errors.array()});
    }
};
