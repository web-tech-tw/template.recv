"use strict";

/**
 * Load configs from system environment variables.
 */
function runLoader() {
    const {join: pathJoin} = require("path");
    const {existsSync} = require("fs");

    const dotenvPath = pathJoin(__dirname, "..", ".env");
    if (!existsSync(dotenvPath) && process.env.APP_CONFIGURED !== "1") {
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


module.exports = {
    runLoader,
    isProduction,
    getEnvironmentOverview,
};
