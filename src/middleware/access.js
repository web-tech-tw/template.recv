"use strict";
// Check the role for the request required,
// and interrupt if the requirement is not satisfied.
// (for Sara only)

// Import StatusCodes
const {StatusCodes} = require("http-status-codes");

// Export (function)
// role can be string or null
// set as string, it will find the role whether satisfied
// set as null, will check the user whether login only
module.exports = (role) => (req, res, next) => {
    // Check auth exists
    if (!(req.auth && req.auth.id)) {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
        return;
    }
    // Accept SARA or TEST only
    if (
        req.auth.method !== "SARA" &&
        !(req.auth.method === "TEST" && process.env.NODE_ENV !== "production")
    ) {
        res.sendStatus(StatusCodes.METHOD_NOT_ALLOWED);
        return;
    }
    // Read roles from metadata
    const userRoles = req.auth.metadata?.user?.roles;
    if (!(userRoles && Array.isArray(userRoles))) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }
    // Check permission
    if (role && !userRoles.includes(role)) {
        res.sendStatus(StatusCodes.FORBIDDEN);
        return;
    }
    next();
};
