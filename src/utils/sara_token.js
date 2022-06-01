"use strict";
// Token utils of Sara.

// Import jsonwebtoken
const jwt = require('jsonwebtoken');

// Import SHA256 Generator
const {sha256} = require('js-sha256');

// Define general_validate_options Generator
const general_validate_options = (metadata) => ({
    algorithms: ["HS256"],
    audience: process.env.SARA_AUDIENCE,
    issuer: process.env.SARA_ISSUER || sha256(metadata.ctx.jwt_secret),
    complete: true
});

// Validate Function (Auth)
function validateAuthToken(ctx, token) {
    try {
        const validate_options = general_validate_options({ctx});
        const data = jwt.verify(token, ctx.jwt_secret, validate_options, null);
        if (data?.header?.sara?.version !== 1 || data?.header?.sara?.type !== "auth") {
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
