"use strict";
// Validate "Authorization" header, but it will not interrupt the request.

// To interrupt the request which without the request,
// please use "access.js" middleware.

// Import isProduction
const {isProduction} = require("../config");

// Import isObjectPropExists
const {isObjectPropExists} = require("../utils/native");

const saraTokenAuth = require("../utils/sara_token");
const testTokenAuth = require("../utils/test_token");

// Import authMethods
const authMethods = {
    "SARA": saraTokenAuth.validate,
    "TEST": testTokenAuth.validate,
};

// Export (function)
module.exports = async (req, _, next) => {
    const authCode = req.header("authorization");
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

    const authMethod = authMethods[method];
    const authResult = await authMethod(secret);

    if (!isProduction()) {
        // Debug message
        console.warn(
            "An authentication detected:",
            method, authResult,
            "\n",
        );
    }

    const {
        userId,
        payload,
        isAborted,
    } = authResult;
    if (isAborted) {
        next();
        return;
    }

    req.auth.id = userId;
    req.auth.metadata = payload;
    next();
};
