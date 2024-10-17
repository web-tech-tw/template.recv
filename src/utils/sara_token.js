"use strict";
// Token utils of Sara.

// Import config
const {getMust} = require("../config");

// Import modules
const axios = require("axios");
const {StatusCodes} = require("http-status-codes");

const {verify} = require("jsonwebtoken");
const {usePublicKey} = require("../init/keypair");

// Define Sara Token specs
const issuerIdentity = "Sara Hoshikawa"; // The code of Sara v3

// Define client
const client = axios.create({
    baseURL: getMust("SARA_RECV_HOST"),
    headers: {
        "User-Agent": "sara_client/2.0",
    },
});

// Define verifyOptions
const verifyOptions = {
    algorithms: ["ES256"],
    issuer: issuerIdentity,
    audience: getMust("SARA_AUDIENCE_URL"),
    complete: true,
};

/**
 * Check if token is activated
 * @module sara_token
 * @function
 * @param {string} tokenId - The token id to check.
 * @return {Promise<boolean>}
 */
async function isActivated(tokenId) {
    const result = await client.head(`/tokens/${tokenId}`, {
        validateStatus: (status) =>
            status === StatusCodes.OK ||
            status === StatusCodes.NOT_FOUND,
    });
    return result.status === StatusCodes.OK;
}

/**
 * Validate token
 * @module sara_token
 * @function
 * @param {string} token - The token to valid.
 * @return {Promise<object>}
 */
async function validate(token) {
    const result = {
        userId: null,
        payload: null,
        isAborted: false,
    };

    try {
        const publicKey = usePublicKey();
        const {payload} = verify(
            token, publicKey, verifyOptions,
        );

        if (!await isActivated(payload.jti)) {
            throw new Error("sara_token is not activated");
        }

        result.userId = payload.sub;
        result.payload = {
            profile: payload.user,
        };
    } catch (e) {
        result.isAborted = true;
        result.payload = e;
    }

    return result;
}

// Export (object)
module.exports = {
    client,
    validate,
};
