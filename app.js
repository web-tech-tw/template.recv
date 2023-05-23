"use strict";

// Import config
const {
    runLoader,
    getMust,
    getEnvironmentOverview,
} = require("./src/config");

// Load config
runLoader();

// Import constants
const constant = require("./src/init/const");

// Import StatusCodes
const {StatusCodes} = require("http-status-codes");

// Import useApp
const {useApp} = require("./src/init/express");

// Initialize application
const app = useApp();

// Initialize prepare handlers
const {
    prepare: prepareDatabase,
} = require("./src/init/database");

const prepareHandlers = [
    prepareDatabase,
];

// Redirect / to INDEX_REDIRECT_URL
app.get("/", (_, res) => {
    const redirectCode = getMust("INDEX_REDIRECT_TYPE") === "permanent" ?
        StatusCodes.MOVED_PERMANENTLY :
        StatusCodes.MOVED_TEMPORARILY;
    const redirectUrl = getMust("INDEX_REDIRECT_URL");
    res.redirect(redirectCode, redirectUrl);
});

// The handler for robots.txt (deny all friendly robots)
app.get("/robots.txt", (_, res) => {
    res.type("txt").send("User-agent: *\nDisallow: /");
});

// Load router dispatcher
const routerDispatcher = require("./src/routes");
routerDispatcher.load();

// Show banner message
(() => {
    const {APP_NAME: appName} = constant;
    const {node, runtime} = getEnvironmentOverview();
    const statusMessage = `(environment: ${node}, ${runtime})`;
    console.info(appName, statusMessage, "\n====");
})();

// Mount application and execute it
require("./src/execute")(app, prepareHandlers,
    ({protocol, hostname, port}) => {
        console.info(`Protocol "${protocol}" is listening at`);
        console.info(`${protocol}://${hostname}:${port}`);
    },
);
