"use strict";
// The simple toolbox for Node.js

/**
 * Get POSIX Timestamp (second)
 * @module native
 * @function
 * @return {number}
 */
function getPosixTimestamp() {
    return Math.floor(new Date().getTime() / 1000);
}

/**
 * Shortcut for hasOwnProperty with safe.
 * @module native
 * @function
 * @param {object} srcObject
 * @param {string} propName
 * @return {boolean}
 */
function isObjectPropExists(srcObject, propName) {
    return Object.prototype.hasOwnProperty.call(srcObject, propName);
}

// Export (object)
module.exports = {
    getPosixTimestamp,
    isObjectPropExists,
};
