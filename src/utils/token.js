"use strict";

const jwt = require('jsonwebtoken');

function validateAuthToken(ctx, token) {
    try {
        return jwt.verify(token, ctx.jwt_secret, null, null);
    } catch (e) {
        console.error(e);
        return false;
    }
}

module.exports = {
    validateAuthToken,
};
