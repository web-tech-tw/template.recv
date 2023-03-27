"use strict";
// Token utils for testing/debugging or developing.

// Import config
const {isProduction} = require("../config");

const DEFAULT_FAKE_USER = {
    _id: "fake_user",
    nickname: "The Fake User",
    email: "the_fake_user@web-tech-tw.github.io",
    roles: [],
};

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
        const payload = {profile};

        result.userId = payload.profile._id;
        result.payload = payload;
    } catch (e) {
        result.isAborted = true;
        result.payload = e;
    }

    return result;
}

// Export (object)
module.exports = {
    issue,
    validate,
};
