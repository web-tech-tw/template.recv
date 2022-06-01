"use strict";
// Validate "Authorization" header, but it will not interrupt the request.
// To interrupt the request which without the request, please use "access.js" middleware.

// Import auth_methods
const auth_methods = {
    "SARA": async (ctx, req, _) => require('../utils/sara_token').validateAuthToken(ctx, req.auth_secret)
};

// Export (function)
module.exports = (ctx) => function (req, res, next) {
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
    req.auth_secret = params[1];
    if (!(req.auth_method in auth_methods)) {
        next();
        return;
    }
    auth_methods[req.auth_method](ctx, req, res)
        .then(() => next())
        .catch((error) => console.error(error));
};
