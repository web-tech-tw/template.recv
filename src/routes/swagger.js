"use strict";

const {getEnabled} = require("../config");
const {useApiDoc} = require("../init/api_doc");

const {useApp, express} = require("../init/express");

const swaggerUi = require("swagger-ui-express");

const {Router: newRouter} = express;
const router = newRouter();

const apiDoc = useApiDoc();
router.use("/", swaggerUi.serve, swaggerUi.setup(apiDoc));

// Export routes mapper (function)
module.exports = () => {
    // Skip if swagger disabled
    if (!getEnabled("ENABLED_SWAGGER")) {
        return;
    }

    // Use application
    const app = useApp();

    // Mount the router
    app.use("/swagger", router);
};
