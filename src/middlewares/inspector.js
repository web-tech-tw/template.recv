const {StatusCodes} = require("http-status-codes");
const {validationResult} = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({errors: errors.array()});
    }
};
