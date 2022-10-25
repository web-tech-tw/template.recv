"use strict";

// Load configs from .env
(() => {
    const {existsSync} = require("fs");
    const {join: pathJoin} = require("path");
    const dotenvPath = pathJoin(__dirname, ".env");
    if (!existsSync(dotenvPath) && !process.env.APP_CONFIGURED) {
        throw new Error(".env not exists");
    }
    require("dotenv").config();
})();

// Import StatusCodes
const {StatusCodes} = require("http-status-codes");

// Create context storage
const ctx = {
    now: () => Math.floor(new Date().getTime() / 1000),
    cache: require("./src/init/cache"),
    database: require("./src/init/database"),
    jwt_secret: require("./src/init/jwt_secret"),
};

// Import modules
const constant = require("./src/init/const");

const utilIpAddress = require("./src/utils/ip_address");

const middlewareAccess = require("./src/middleware/access");
const middlewareInspector = require("./src/middleware/inspector");
const middlewareValidator = require("express-validator");

// Initialize application
const app = require("./src/init/express")(ctx);

// Redirect / to WEBSITE_URL
app.get("/", (_, res) => {
    res.redirect(StatusCodes.MOVED_PERMANENTLY, process.env.WEBSITE_URL);
});

// The handler for robots.txt (deny all friendly robots)
app.get(
    "/robots.txt",
    (_, res) => res.type("txt").send("User-agent: *\nDisallow: /"),
);

// Example to show time with ctx.now
app.get("/example-now", (req, res) => {
    res.send({timestamp: ctx.now()});
});

// Example to show the visitor's IP with utilIpAddress
app.get("/example-ip", (req, res) => {
    res.send({ip_address: utilIpAddress(req)});
});

// Example to check fields with middlewareValidator
app.get("/example-empty",
    middlewareValidator.query("empty").isEmpty(),
    middlewareInspector, (_, res) => {
        res.send(
            "200 Success<br />" +
            "(Field \"empty\" in query should be empty, " +
            "or it will send error \"400 Bad Request\".)",
        );
    },
);

// Example to check admin role with middlewareAccess
app.get("/example-admin", middlewareAccess("root"), (_, res) => {
    res.send("Hello, Admin!");
});

// Show status message
(() => {
    const nodeEnv = process.env.NODE_ENV;
    const runtimeEnv = process.env.RUNTIME_ENV || "native";
    console.info(
        constant.APP_NAME,
        `(runtime: ${nodeEnv}, ${runtimeEnv})`,
        "\n====",
    );
})();
// Mount application and execute it
require("./src/execute")(app, ({type, hostname, port}) => {
    const protocol = type === "general" ? "http" : "https";
    console.info(`Protocol "${protocol}" is listening at`);
    console.info(`${protocol}://${hostname}:${port}`);
});
