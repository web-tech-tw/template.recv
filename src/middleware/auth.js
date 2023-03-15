"use strict";
// Validate "Authorization" header, but it will not interrupt the request.

// To interrupt the request which without the request,
// please use "access.js" middleware.

// Import StatusCodes
const {isObjectPropExists} = require("../utils/native");

const saraTokenAuth = require("../utils/sara_token");
const testTokenAuth = require("../utils/test_token");

// Import authMethods
const authMethods = {
    "SARA": saraTokenAuth.validateAuthToken,
    "TEST": testTokenAuth.validateAuthToken,
};

// Export (function)
module.exports = (req, res, next) => {
    const authCode = req.header("Authorization");
    if (!authCode) {
        next();
        return;
    }

    const params = authCode.split(" ");
    if (params.length !== 2) {
        next();
        return;
    }
    const [method, secret] = params;

    req.auth = {
        id: null,
        metadata: null,
        method,
        secret,
    };
    if (!isObjectPropExists(authMethods, req.auth.method)) {
        next();
        return;
    }

    const {
        userId,
        payload,
        isAborted,
    } = authMethods[method](secret);
    if (isAborted) {
        next();
        return;
    }

    req.auth.id = userId;
    req.auth.metadata = payload;
    next();
};
