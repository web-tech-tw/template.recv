"use strict";
// Check the "secret.key" whether safe or not.

// Import fs
const fs = require('fs');

// Import constant
const constant = require('./const');

// Detect the command for generate secret
const generate_command = process.env.RUNTIME_ENV === 'container'
    ? "touch ./secret.key && docker run -v ./secret.key:/workplace/secret.key $APP_IMAGE_NAME npm run new-secret"
    : "npm run new-secret";

// Check if "secret.key" exists
let jwt_secret;
try {
    jwt_secret = fs.readFileSync(constant.SECRET_FILENAME).toString();
} catch (e) {
    if (e.code !== 'ENOENT') {
        throw e;
    }
    throw `JWT secret is NOT EXISTS, please generate one with "${generate_command}"`;
}

// Check length
if (jwt_secret.length < 2048) {
    throw `JWT secret is NOT SAFE, please generate one with "${generate_command}"`;
}

// Export jwt_secret (string)
module.exports = jwt_secret;
