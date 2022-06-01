"use strict";
// Validate the auth_token, but it will not interrupt the request.
// To interrupt the request which without the request, please use "access.js" middleware.

// Import validateAuthToken
const auth_methods = {
    "SARA": require('../utils/sara_token').validateAuthToken
};

// Export (function)
module.exports = (ctx) => function (req, _, next) {
    const auth_code = req.header('Authorization');
    if (!auth_code) {
        next();
        return;
    }
    const params = auth_code.split(" ");
    if (params.length !== 2) {
        next();
        return;
    }
    req.auth_method = params[0];
    if (req.auth_method in auth_methods) {
        const method_function = auth_methods[req.auth_method];
        req.authenticated = method_function(ctx, params[1]);
    }
    next();
};
