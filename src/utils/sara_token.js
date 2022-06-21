"use strict";
// Token utils of Sara.

// Import jsonwebtoken
const jwt = require("jsonwebtoken");

// Import SHA256 generator
const {sha256} = require("js-sha256");

// Define generalValidateOptions generator
const generalValidateOptions = (metadata) => ({
    algorithms: ["HS256"],
    audience: process.env.SARA_AUDIENCE,
    issuer: process.env.SARA_ISSUER || sha256(metadata.ctx.jwt_secret),
    complete: true,
});

/**
 * Validate function (Auth)
 * @param {object} ctx - The context variable from app.js.
 * @param {string} token - The token to valid.
 * @return {boolean|object}
 */
function validateAuthToken(ctx, token) {
    try {
        const validateOptions = generalValidateOptions({ctx});
        const data = jwt.verify(token, ctx.jwt_secret, validateOptions, null);
        if (
            data?.header?.sara?.version !== 1 ||
            data?.header?.sara?.type !== "auth"
        ) {
            console.error("invalid_sara_code_token");
            return false;
        }
        return data.payload;
    } catch (e) {
        console.error(e);
        return false;
    }
}

// Export (object)
module.exports = {
    validateAuthToken,
};
