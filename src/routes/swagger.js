"use strict";

const {isProduction} = require("../config");
const {APP_NAME} = require("../init/const");

const {useApp, express} = require("../init/express");
const {join: pathJoin} = require("path");

const {routerFiles} = require("./index");

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: APP_NAME,
            version: "latest",
            description: "A tiny but powerful microservice framework.",
            contact: {
                name: "Taiwan Web Technology Promotion Organization",
                url: "https://web-tech-tw.github.io",
            },
        },
    },
    apis: routerFiles.map(
        (f) => pathJoin(__dirname, f),
    ),
};

const openapiSpecification = swaggerJSDoc(options);

const {Router: newRouter} = express;
const router = newRouter();

router.use("/", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Export routes mapper (function)
module.exports = () => {
    // Skip if production
    if (isProduction()) {
        return;
    }

    // Use application
    const app = useApp();

    // Mount the router
    app.use("/swagger", router);
};
