"use strict";

// Import config
const {getEnvironmentOverview} = require("../config");

// Import modules
const {StatusCodes} = require("http-status-codes");

// Import useApp, express
const {useApp, express} = require("../init/express");

const utilVisitor = require("../utils/visitor");
const utilNative = require("../utils/native");

const middlewareValidator = require("express-validator");
const middlewareAccess = require("../middleware/access");
const middlewareInspector = require("../middleware/inspector");
const middlewareRestrictor = require("../middleware/restrictor");

// Create router
const {Router: newRouter} = express;
const router = newRouter();

// Request body parser middleware
router.use(express.urlencoded({extended: true}));

// Example to show time
router.get("/now", (_, res) => {
    res.send({timestamp: utilNative.getPosixTimestamp()});
});

// Example to show the visitor's IP and User-Agent with utils/visitor
router.get("/visitor", (req, res) => {
    res.send({
        ip_address: utilVisitor.getIPAddress(req),
        user_agent: utilVisitor.getUserAgent(req),
    });
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

// Example to test auth works
router.get("/auth", (req, res) => {
    res.send(req.auth);
});

// Example to check admin role with middlewareAccess
router.get("/admin", middlewareAccess("admin"), (req, res) => {
    res.send({
        "message": "Hello, Admin!",
        "user_id": req.auth.id,
    });
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

// Export routes mapper (function)
module.exports = () => {
    // Use application
    const app = useApp();

    // Mount the router
    app.use("/example", router);
};
