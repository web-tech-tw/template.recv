"use strict";

// Import modules
const {join: pathJoin} = require("path");
const {existsSync} = require("fs");

/**
 * Load configs from system environment variables.
 */
function runLoader() {
    const dotenvPath = pathJoin(__dirname, "..", ".env");

    const isDotEnvFileExists = existsSync(dotenvPath);
    const isCustomDefined = process.env.APP_CONFIGURED === "1";

    if (!isDotEnvFileExists && !isCustomDefined) {
        console.error(
            "No '.env' file detected in app root.",
            "If you're not using dotenv file,",
            "set 'APP_CONFIGURED=1' into environment variable",
            "\n",
        );
        throw new Error(".env not exists");
    }

    require("dotenv").config();
}

/**
 * Check is production mode.
 * @return {boolean} true if production
 */
function isProduction() {
    return process.env.NODE_ENV === "production";
}

/**
 * Get environment overview.
 * @return {object}
 */
function getEnvironmentOverview() {
    return {
        node: process.env.NODE_ENV || "development",
        runtime: process.env.RUNTIME_ENV || "native",
    };
}

/**
 * Shortcut to get config value.
 * @param {string} key the key
 * @return {string} the value
 */
function get(key) {
    return process.env[key];
}

/**
 * The get the vale from config with fallback.
 * @param {string} key the key
 * @param {string} fallback the fallback value
 * @return {string} the excepted value
 */
function getFallback(key, fallback) {
    return get(key) || fallback;
}

module.exports = {
    runLoader,
    isProduction,
    getEnvironmentOverview,
    get,
    getFallback,
};
