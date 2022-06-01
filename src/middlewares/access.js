"use strict";
// Check the role for the request required, and interrupt if the requirement is not satisfied.

// Import StatusCodes
const {StatusCodes} = require('http-status-codes');

// Export (function)
// role can be string or null
// set as string, it will find the role whether satisfied
// set as null, will check the user whether login only
module.exports = (role) => (req, res, next) => {
    const user_roles = req?.authenticated?.user?.roles;
    if (!(user_roles && Array.isArray(user_roles))) {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
        return;
    }
    if (role && !user_roles.includes(role)) {
        res.sendStatus(StatusCodes.FORBIDDEN);
        return;
    }
    next();
};
