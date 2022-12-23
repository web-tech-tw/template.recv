"use strict";
// The simple toolbox for Node.js

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
    isObjectPropExists,
};
