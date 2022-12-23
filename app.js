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

// Import constants
const constant = require("./src/init/const");

// Import StatusCodes
const {StatusCodes} = require("http-status-codes");

// Create context storage
const ctx = {
    cache: require("./src/init/cache"),
    database: require("./src/init/database"),
    jwt_secret: require("./src/init/jwt_secret"),
};

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

// Map routes
require("./src/controllers/index")(ctx, app);

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
