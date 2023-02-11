"use strict";

// Import config
const {getEnvironmentOverview} = require("../config");

// Import modules
const {Router: expressRouter} = require("express");
const {StatusCodes} = require("http-status-codes");

const {createHash} = require("crypto");

// Import useApp
const {useApp, express} = require("../init/express");

// Import useJwtSecret
const {useJwtSecret} = require("../init/jwt_secret");

const utilIpAddress = require("../utils/ip_address");
const {getPosixTimestamp} = require("../utils/native");

const middlewareValidator = require("express-validator");
const middlewareAccess = require("../middleware/access");
const middlewareInspector = require("../middleware/inspector");
const middlewareRestrictor = require("../middleware/restrictor");

// Create router
const router = expressRouter();

// Set request body parser
router.use(express.urlencoded({extended: true}));

// Example to show time
router.get("/now", (_, res) => {
    res.send({timestamp: getPosixTimestamp()});
});

// Example to show the visitor's IP with utilIpAddress
router.get("/ip", (req, res) => {
    res.send({ip_address: utilIpAddress(req)});
});

// Example to return the application environment
router.get("/env", (_, res) => {
    res.send(getEnvironmentOverview());
});

// Example to check fields with middlewareValidator
router.get("/empty",
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
router.get("/admin", middlewareAccess("root"), (_, res) => {
    res.send("Hello, Admin!");
});

// Example to show how the restrictor works
const trustedCode = "qwertyuiop";
router.get("/guess/:code",
    middlewareRestrictor(5, 30, true),
    (req, res) => {
        const untrustedCode = req.params.code;
        if (untrustedCode !== trustedCode) {
            res.sendStatus(StatusCodes.UNAUTHORIZED);
            return;
        }
        res.send(`Hello! ${untrustedCode}`);
    },
);

// Example to show the visitor's IP with utilIpAddress
const jwtSecret = useJwtSecret();
router.get("/jwt-secret", (_, res) => {
    const hash = createHash("sha256");
    hash.update(jwtSecret);
    res.send({
        length: jwtSecret.length,
        sha256: hash.digest("hex"),
    });
});

// Export routes mapper (function)
module.exports = () => {
    // Use application
    const app = useApp();

    // Mount the router
    app.use("/example", router);
};
