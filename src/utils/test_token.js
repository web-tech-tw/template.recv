"use strict";
// Token utils for testing/debugging or developing.

const DEFAULT_FAKE_USER = {
    id: "fake_user",
    nickname: "OpenChat Fake User",
    email: "openchat-fake@web-tech.github.io",
    roles: [],
};

/**
 * Issue function (Auth)
 * @param {object} ctx - The context variable from app.js.
 * @param {string} [user] - The user to generate the token for.
 * @return {string}
 */
function issueAuthToken(ctx, user) {
    if (!ctx.testing && process.env.NODE_ENV === "production") {
        throw new Error("issueAuthToken is not allowed in production");
    }
    user = user || DEFAULT_FAKE_USER;
    return Buffer
        .from(JSON.stringify(user), "utf-8")
        .toString("base64");
}

/**
 * Validate function (Auth)
 * @param {object} ctx - The context variable from app.js.
 * @param {string} token - The token to valid.
 * @return {boolean|object}
 */
function validateAuthToken(ctx, token) {
    if (
        !ctx.testing &&
        process.env.NODE_ENV !== "production"
    ) {
        return false;
    }

    return {
        user: JSON.parse(
            Buffer
                .from(token, "base64")
                .toString("utf-8"),
        ),
    };
}

// Export (object)
module.exports = {
    issueAuthToken,
    validateAuthToken,
};
