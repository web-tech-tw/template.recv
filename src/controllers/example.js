"use strict";

// Import config
const {getEnvironmentOverview} = require("../config");

// Import modules
const {Router: expressRouter} = require("express");
const {StatusCodes} = require("http-status-codes");

const {createHash} = require("crypto");

const utilIpAddress = require("../utils/ip_address");
const {getPosixTimestamp} = require("../utils/native");

const middlewareValidator = require("express-validator");
const middlewareAccess = require("../middleware/access");
const middlewareInspector = require("../middleware/inspector");
const middlewareRestrictor = require("../middleware/restrictor");

// Export routes mapper (function)
module.exports = (ctx, r) => {
    const router = expressRouter();

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
        middlewareRestrictor(ctx, 5, 30, true),
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
    router.get("/jwt-secret", (_, res) => {
        const hash = createHash("sha256");
        hash.update(ctx.jwt_secret);
        res.send({
            length: ctx.jwt_secret.length,
            sha256: hash.digest("hex"),
        });
    });

    // Mount router
    r.use("/example", router);
};
