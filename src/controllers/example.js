"use strict";

// Import modules
const {Router: expressRouter} = require("express");

const utilIpAddress = require("../utils/ip_address");
const {getPosixTimestamp} = require("../utils/native");

const middlewareValidator = require("express-validator");
const middlewareAccess = require("../middleware/access");
const middlewareInspector = require("../middleware/inspector");

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

    // Mount router
    r.use("/example", router);
};
