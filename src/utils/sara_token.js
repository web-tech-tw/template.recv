"use strict";
// Token utils of Sara.

// Import config
const {getMust} = require("../config");

// Import jsonwebtoken
const {verify} = require("jsonwebtoken");

// Define generalValidateOptions generator
const generalValidateOptions = (metadata) => ({
    algorithms: ["HS256"],
    issuer: getMust("SARA_ISSUER"),
    audience: getMust("SARA_AUDIENCE"),
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
        const data = verify(token, ctx.jwt_secret, validateOptions, null);
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
