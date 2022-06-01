"use strict";
// Check the "secret.key" whether safe or not.

// Import fs
const fs = require('fs');

// Import constant
const constant = require('./const');

// Check if "secret.key" exists
let jwt_secret;
try {
    jwt_secret = fs.readFileSync(constant.SECRET_FILENAME).toString();
} catch (e) {
    if (e.code === 'ENOENT') {
        throw 'JWT secret is unset, please generate one with "npm run new-secret"'
    } else {
        console.log(e)
    }
}

// Length Check
if (jwt_secret.length < 2048) {
    throw 'JWT secret IS NOT SAFE, please generate the new one with "npm run new-secret"';
}

// Export jwt_secret (string)
module.exports = jwt_secret;
