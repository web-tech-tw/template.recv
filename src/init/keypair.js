"use strict";
// Reading curve keypair.

// Import fs
const {readFileSync} = require("node:fs");

// Import constant
const constants = require("./const");

// Export as useFunction
exports.usePublicKey = () =>
    readFileSync(constants.PUBLIC_KEY_FILENAME);
