"use strict";
// The simple toolbox for Node.js

const crypto = require("node:crypto");

/**
 * Shortcut for hasOwnProperty with safe.
 * @module native
 * @function
 * @param {object} srcObject
 * @param {string} propName
 * @return {boolean}
 */
function isObjectPropExists(srcObject, propName) {
    return Object.hasOwn(srcObject, propName);
}

/**
 * Generate random code with length.
 * @param {number} length length of code
 * @return {string}
 */
function generateRandomCode(length) {
    const maxValue = (10 ** length) - 1;
    return crypto.
        randomInt(0, maxValue).
        toString().
        padStart(length, "0");
}

/**
 * Hash string into sha256 hex.
 * @param {string} data
 * @return {string}
 */
function sha256hex(data) {
    return crypto.
        createHash("sha256").
        update(data).
        digest("hex");
}

// Export (object)
module.exports = {
    isObjectPropExists,
    generateRandomCode,
    sha256hex,
};
