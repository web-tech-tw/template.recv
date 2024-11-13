"use strict";
// Token utils for testing/debugging or developing.

// Import config
const {isProduction} = require("../config");

const DEFAULT_FAKE_USER = {
    _id: "67345206787c5d2b9be61c37",
    nickname: "The Fake User",
    email: "the_fake_user@web-tech.tw",
    roles: [],
};

/**
 * Returns a new user profile
 * @return {object}
 */
function newProfile() {
    return structuredClone(DEFAULT_FAKE_USER);
}

/**
 * Issue token
 * @module test_token
 * @function
 * @param {string} user - The user to generate the token for.
 * @return {string}
 */
function issue(user) {
    if (isProduction()) {
        throw new Error("test_token is not allowed in production");
    }

    user = user || DEFAULT_FAKE_USER;
    return Buffer.
        from(JSON.stringify(user), "utf-8").
        toString("base64");
}

/**
 * Validate token
 * @module test_token
 * @function
 * @param {string} token - The token to valid.
 * @return {object}
 */
function validate(token) {
    if (isProduction()) {
        throw new Error("test_token is not allowed in production");
    }

    const result = {
        userId: null,
        payload: null,
        isAborted: false,
    };

    try {
        const profile = JSON.parse(
            Buffer.
                from(token, "base64").
                toString("utf-8"),
        );

        result.userId = profile._id;
        result.payload = {
            profile,
        };
    } catch (e) {
        result.isAborted = true;
        result.payload = e;
    }

    return result;
}

// Export (object)
module.exports = {
    newProfile,
    issue,
    validate,
};
