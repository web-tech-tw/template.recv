"use strict";
// Token utils of Sara.

// Import config
const {getMust} = require("../config");

// Import createHash from crypto
const {createHash} = require("node:crypto");

// Import jsonwebtoken
const {verify} = require("jsonwebtoken");

// Define hash function - SHA256
const sha256hex = (data) =>
    createHash("sha256").update(data).digest("hex");

// Define generalValidateOptions generator
const generalValidateOptions = ({jwtSecret}) => ({
    algorithms: ["HS256"],
    issuer: getMust("SARA_ISSUER") || sha256hex(jwtSecret),
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
    const {jwt_secret: jwtSecret} = ctx;
    try {
        const validateOptions = generalValidateOptions({jwtSecret});
        const data = verify(token, jwtSecret, validateOptions, null);
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
