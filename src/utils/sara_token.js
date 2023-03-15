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

// Define jwtSecret
const jwtSecret = useJwtSecret();

// Define hash function - SHA256
const sha256hex = (data) =>
    createHash("sha256").update(data).digest("hex");

// Define validateOptions
const validateOptions = {
    algorithms: ["HS256"],
    issuer: get("SARA_ISSUER") || sha256hex(jwtSecret),
    audience: getMust("SARA_AUDIENCE"),
    complete: true,
};

/**
 * Validate function (Auth)
 * @module sara_token
 * @function
 * @param {string} token - The token to valid.
 * @return {object}
 */
function validateAuthToken(token) {
    const result = {
        userId: null,
        payload: null,
        isAborted: false,
    };

    try {
        const {header, payload} = verify(token, jwtSecret, validateOptions);

        if (
            header?.sara?.version !== 1 ||
            header?.sara?.type !== "auth"
        ) {
            throw new Error("invalid_sara_code_token");
        }

        result.userId = payload.sub;
        result.payload = payload;
    } catch (e) {
        result.isAborted = true;
        result.payload = e;
    }

    return result;
}

// Export (object)
module.exports = {
    validateAuthToken,
};
