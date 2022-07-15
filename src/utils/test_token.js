"use strict";
// Token utils for testing/debugging or developing.

// Import SHA256 generator
const {sha256} = require("js-sha256");

/**
 * Validate function (Auth)
 * @param {object} ctx - The context variable from app.js.
 * @param {string} token - The token to valid.
 * @return {boolean|object}
 */
function validateAuthToken(ctx, token) {
    if (
        process.env.NODE_ENV === "production" ||
        sha256(ctx.jwt_secret) !== token
    ) {
        return false;
    }

    return {
        id: "test",
        metadata: {
            user: {
                id: "test",
                name: "Test User",
            },
        },
    };
}

// Export (object)
module.exports = {
    validateAuthToken,
};
