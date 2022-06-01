"use strict";
// Validate the auth_token from Sara.

// Import jsonwebtoken
const jwt = require('jsonwebtoken');

// Validate Function
function validateAuthToken(ctx, token) {
    try {
        return jwt.verify(token, ctx.jwt_secret, null, null);
    } catch (e) {
        console.error(e);
        return false;
    }
}

// Export (object)
module.exports = {
    validateAuthToken,
};
