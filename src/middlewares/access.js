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
    if (!req.auth) {
        throw Error(
            "req.auth is unset, " +
            "please add middleware \"auth\" before \"access\".",
        );
    }
    // Accept SARA only
    if (req.auth.method !== "SARA") return;
    // Read roles from metadata
    const userRoles = req.auth.metadata?.user?.roles;
    if (!(userRoles && Array.isArray(userRoles))) {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
        return;
    }
    // Check permission
    if (role && !userRoles.includes(role)) {
        res.sendStatus(StatusCodes.FORBIDDEN);
        return;
    }
    next();
};
