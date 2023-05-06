"use strict";
// Check the role for the request required,
// and interrupt if the requirement is not satisfied.
// (for Sara only)

// Import isProduction
const {isProduction} = require("../config");

// Import StatusCodes
const {StatusCodes} = require("http-status-codes");

// Export (function)
// requiredRole can be string or null,
// set as string, it will find the role whether satisfied,
// set as null, will check the user whether login only.
module.exports = (requiredRole) => (req, res, next) => {
    if (!isProduction()) {
        // Debug message
        console.warn(
            "An access required request detected:",
            `role "${requiredRole}"`,
            req.auth,
            "\n",
        );
    }

    // Check auth exists
    if (!(req.auth && req.auth.id)) {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
        return;
    }

    // Accept SARA or TEST only
    if (
        req.auth.method !== "SARA" &&
        !(req.auth.method === "TEST" && !isProduction())
    ) {
        res.sendStatus(StatusCodes.METHOD_NOT_ALLOWED);
        return;
    }

    // Read roles from metadata
    const userRoles = req.auth.metadata?.profile?.roles;
    const isUserRolesValid = Array.isArray(userRoles);

    // Check permission
    if (
        requiredRole &&
        (!isUserRolesValid || !userRoles.includes(requiredRole))
    ) {
        if (!isProduction()) {
            const displayUserRoles = isUserRolesValid ?
                userRoles.join(", ") :
                userRoles;
            // Debug message
            console.warn(
                "An access required request forbidden:",
                `actual "${displayUserRoles}"`,
                `expected "${requiredRole}"`,
                "\n",
            );
        }
        res.sendStatus(StatusCodes.FORBIDDEN);
        return;
    }

    // Call next middleware
    next();
};
