"use strict";

// Routes
const routes = [
    require("./example"),
];

// Load routes
module.exports = (ctx, app) => {
    routes.forEach((c) => c(ctx, app));
};
