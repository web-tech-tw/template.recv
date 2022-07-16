"use strict";
// Interrupt the request
// which is not satisfied the result from express-validator.

// Import StatusCodes
const {StatusCodes} = require("http-status-codes");

// Import validatorResult
const {validationResult} = require("express-validator");

// Export (function)
module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({errors: errors.array()});
    }
};
