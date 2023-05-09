"use strict";
// Cross-Origin Resource Sharing

// Import config
const {getEnabled, getMust} = require("../config");

// Import cors
const cors = require("cors");

// Read config
const corsOrigin = getMust("CORS_ORIGIN");
const swaggerCorsOrigin = getMust("SWAGGER_CORS_ORIGIN");

// Export (function)
module.exports = cors({
    origin: getEnabled("ENABLED_SWAGGER") ?
        [corsOrigin, swaggerCorsOrigin]:
        corsOrigin,
});
