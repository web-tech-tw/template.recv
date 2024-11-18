"use strict";
// Reading curve keypair.

// Import constants
const {
    PUBLIC_KEY_FILENAME,
} = require("./const");

// Import modules
const {readFileSync} = require("node:fs");

/**
 * Composable public key.
 * @return {string}
 */
exports.usePublicKey = () =>
    readFileSync(PUBLIC_KEY_FILENAME);
