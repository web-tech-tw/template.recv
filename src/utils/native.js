"use strict";
// The simple toolbox for Node.js

/**
 * Get POSIX Timestamp (second)
 * @return {number}
 */
function getPosixTimestamp() {
    return Math.floor(new Date().getTime() / 1000);
}

/**
 * Shortcut for hasOwnProperty with safe.
 * @param {object} srcObject
 * @param {string} propName
 * @return {bool}
 */
function isObjectPropExists(srcObject, propName) {
    return Object.prototype.hasOwnProperty.bind(srcObject, propName);
}

// Export (function)
module.exports = {
    getPosixTimestamp,
    isObjectPropExists,
};
