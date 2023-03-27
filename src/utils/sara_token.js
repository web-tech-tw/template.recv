"use strict";
// Token utils of Sara.

// Import config
const {getMust} = require("../config");

const axios = require("axios");

const client = axios.create({
    baseURL: getMust("SARA_RECV_HOST"),
    headers: {
        "User-Agent": "sara_client/2.0",
    },
});

/**
 * Validate token
 * @module sara_token
 * @function
 * @param {string} token - The token to valid.
 * @return {object}
 */
async function validate(token) {
    const result = {
        userId: null,
        payload: null,
        isAborted: false,
    };

    try {
        const authResponse = await client.get("/profile", {
            headers: {
                "Authorization": `SARA ${token}`,
            },
        });
        result.userId = authResponse.data.profile._id;
        result.payload = authResponse.data;
    } catch (e) {
        result.isAborted = true;
        result.payload = e;
    }

    return result;
}

// Export (object)
module.exports = {
    validate,
};
