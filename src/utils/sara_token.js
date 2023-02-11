"use strict";
// Token utils of Sara.

// Import config
const {get, getMust} = require("../config");

// Import createHash from crypto
const {createHash} = require("node:crypto");

// Import jsonwebtoken
const {verify} = require("jsonwebtoken");

// Import useJwtSecret
const {useJwtSecret} = require("../init/jwt_secret");

// Define hash function - SHA256
const sha256hex = (data) =>
    createHash("sha256").update(data).digest("hex");

// Define generalValidateOptions generator
const generalValidateOptions = ({jwtSecret}) => ({
    algorithms: ["HS256"],
    issuer: get("SARA_ISSUER") || sha256hex(jwtSecret),
    audience: getMust("SARA_AUDIENCE"),
    complete: true,
});

// Define jwtSecret
const jwtSecret = useJwtSecret();

/**
 * Validate function (Auth)
 * @module sara_token
 * @function
 * @param {string} token - The token to valid.
 * @return {boolean|object}
 */
function validateAuthToken(token) {
    try {
        const validateOptions = generalValidateOptions({jwtSecret});
        const data = verify(token, jwtSecret, validateOptions, null);
        if (
            data?.header?.sara?.version !== 1 ||
            data?.header?.sara?.type !== "auth"
        ) {
            console.error(new Error("invalid_sara_code_token"));
            return false;
        }
        return data.payload;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Export (object)
module.exports = {
    validateAuthToken,
};
