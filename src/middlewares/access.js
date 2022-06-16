"use strict";
// Check the role for the request required,
// and interrupt if the requirement is not satisfied.

// Import StatusCodes
const {StatusCodes} = require("http-status-codes");

// Export (function)
// role can be string or null
// set as string, it will find the role whether satisfied
// set as null, will check the user whether login only
module.exports = (role) => (req, res, next) => {
    const userRoles = req?.authenticated?.user?.roles;
    if (!(userRoles && Array.isArray(userRoles))) {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
        return;
    }
    if (role && !userRoles.includes(role)) {
        res.sendStatus(StatusCodes.FORBIDDEN);
        return;
    }
    next();
};
