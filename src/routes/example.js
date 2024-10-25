"use strict";

// Import config
const {getEnvironmentOverview} = require("../config");

// Import modules
const {StatusCodes} = require("http-status-codes");

// Import useApp, express
const {useApp, express} = require("../init/express");

const utilVisitor = require("../utils/visitor");
const utilNative = require("../utils/native");
const utilTestToken = require("../utils/test_token");

const middlewareValidator = require("express-validator");
const middlewareAccess = require("../middleware/access");
const middlewareInspector = require("../middleware/inspector");
const middlewareRestrictor = require("../middleware/restrictor");

// Create router
const {Router: newRouter} = express;
const router = newRouter();

// Request body parser middleware
router.use(express.json());

/**
 * @openapi
 * /example/now:
 *   get:
 *     tags:
 *       - example
 *     summary: Get POSIX timestamp
 *     description: Example to show current POSIX timestamp.
 *     responses:
 *       200:
 *         description: Returns current POSIX timestamp.
 */
router.get("/now", (_, res) => {
    res.send({timestamp: Date.now()});
});

/**
 * @openapi
 * /example/visitor:
 *   get:
 *     tags:
 *       - example
 *     summary: Get current visitor information
 *     description: Example to show the visitor's IP and
 *                  User-Agent with utils/visitor.
 *     responses:
 *       200:
 *         description: Returns current visitor information.
 */
router.get("/visitor", (req, res) => {
    res.send({
        ip_address: utilVisitor.getIPAddress(req),
        user_agent: utilVisitor.getUserAgent(req),
    });
});

/**
 * @openapi
 * /example/env:
 *   get:
 *     tags:
 *       - example
 *     summary: Get the application environment
 *     description: Example to return the application environment.
 *     responses:
 *       200:
 *         description: Returns the application environment.
 */
router.get("/env", (_, res) => {
    res.send(getEnvironmentOverview());
});

/**
 * @openapi
 * /example/empty:
 *   get:
 *     tags:
 *       - example
 *     summary: Empty field checks
 *     description: Example to check fields with middlewareValidator.
 *     parameters:
 *       - in: query
 *         name: empty
 *         schema:
 *           type: string
 *         required: false
 *         description: The "empty" field of query, please leave it empty.
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *       400:
 *         description: Returns "Bad Request" if the "empty" field of
 *                      query is not real empty (not unset).
 */
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

/**
 * @openapi
 * /example/tester:
 *   get:
 *     tags:
 *       - example
 *     summary: Get test user's token and identity
 *     description: Request to generate test user's token and
 *                  profile with optional role field.
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         required: false
 *         description: The role you hope to own, default is empty.
 *     responses:
 *       200:
 *         description: Returns current visitor information.
 */
router.get("/tester", (req, res) => {
    const tester = utilTestToken.newProfile();
    if (utilNative.isObjectPropExists(req.query, "role")) {
        Array.prototype.push.call(tester.roles, req.query.role);
    }
    const tokenString = utilTestToken.issue(tester);
    const token = `TEST ${tokenString}`;
    res.send({token, tester});
});

/**
 * @openapi
 * /example/auth:
 *   get:
 *     tags:
 *       - example
 *     summary: Get auth information
 *     description: Example to test middlewareAuth works.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Returns current visitor's auth information.
 *       401:
 *         description: Returns "Unauthorized"
 *                      if your token is empty or invalid.
 */
router.get("/auth", (req, res) => {
    res.send(req.auth);
});

/**
 * @openapi
 * /example/admin:
 *   get:
 *     tags:
 *       - example
 *     summary: Test access information
 *     description: Example to check admin role with middlewareAccess.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Returns a hello-world message and admin's identity.
 *       403:
 *        description: Returns "Forbidden"
 *                      if you are not an admin.
 *       401:
 *         description: Returns "Unauthorized"
 *                      if your token is empty or invalid.
 */
router.get("/admin", middlewareAccess("admin"), (req, res) => {
    res.send({
        "message": "Hello, Admin!",
        "user_id": req.auth.id,
    });
});

/**
 * @openapi
 * /example/guess/{code}:
 *   get:
 *     tags:
 *       - example
 *     summary: Test restrictor works
 *     description: Example to show how the restrictor works.
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The passphrase, the true answer is "qwertyuiop".
 *     responses:
 *       200:
 *         description: Returns "Hello" if the answer is correct.
 *       403:
 *         description: Returns "Forbidden" if the answer is wrong.
 */
const trustedCode = "qwertyuiop";
router.get("/guess/:code",
    middlewareRestrictor(5, 30, true),
    (req, res) => {
        const untrustedCode = req.params.code;
        if (untrustedCode !== trustedCode) {
            res.sendStatus(StatusCodes.FORBIDDEN);
            return;
        }
        res.send(`Hello! ${trustedCode}`);
    },
);

// Export routes mapper (function)
module.exports = () => {
    // Use application
    const app = useApp();

    // Mount the router
    app.use("/example", router);
};
