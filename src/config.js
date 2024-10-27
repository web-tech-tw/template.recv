"use strict";

// Import modules
const {join: pathJoin} = require("node:path");
const {existsSync} = require("node:fs");

/**
 * Load configs from system environment variables.
 */
function runLoader() {
    const dotenvPath = pathJoin(__dirname, "..", ".env");

    const isDotEnvFileExists = existsSync(dotenvPath);
    const isCustomDefined = get("APP_CONFIGURED") === "1";

    if (!isDotEnvFileExists && !isCustomDefined) {
        console.error(
            "No '.env' file detected in app root.",
            "If you're not using dotenv file,",
            "set 'APP_CONFIGURED=1' into environment variables.",
            "\n",
        );
        throw new Error(".env not exists");
    }

    require("dotenv").config();
}

/**
 * Check is production mode.
 * @module config
 * @function
 * @return {boolean} true if production
 */
function isProduction() {
    return getMust("NODE_ENV") === "production";
}

/**
 * Get environment overview.
 * @module config
 * @function
 * @return {object}
 */
function getEnvironmentOverview() {
    return {
        node: getFallback("NODE_ENV", "development"),
        runtime: getFallback("RUNTIME_ENV", "native"),
    };
}

/**
 * Shortcut to get config value.
 * @module config
 * @function
 * @param {string} key the key
 * @return {string} the value
 */
function get(key) {
    return process.env[key];
}

/**
 * Get the bool value from config, if yes, returns true.
 * @module config
 * @function
 * @param {string} key the key
 * @return {bool} the bool value
 */
function getEnabled(key) {
    return getMust(key) === "yes";
}

/**
 * Get the array value from config.
 * @module config
 * @function
 * @param {string} key the key
 * @param {string} [separator=,] the separator.
 * @return {array} the array value
 */
function getSplited(key, separator=",") {
    return getMust(key).
        split(separator).
        filter((s) => s).
        map((s) => s.trim());
}

/**
 * Get the value from config with error thrown.
 * @module config
 * @function
 * @param {string} key the key
 * @return {string} the expected value
 * @throws {Error} if value is undefined, throw an error
 */
function getMust(key) {
    const value = get(key);
    if (value === undefined) {
        throw new Error(`config key ${key} is undefined`);
    }
    return value;
}

/**
 * Get the value from config with fallback.
 * @module config
 * @function
 * @param {string} key the key
 * @param {string} fallback the fallback value
 * @return {string} the expected value
 */
function getFallback(key, fallback) {
    return get(key) || fallback;
}

module.exports = {
    runLoader,
    isProduction,
    getEnvironmentOverview,
    get,
    getEnabled,
    getSplited,
    getMust,
    getFallback,
};
