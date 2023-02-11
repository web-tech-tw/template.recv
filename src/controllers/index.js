"use strict";

// Routes
const routes = [
    require("./example"),
];

// Load routes
module.exports = () => {
    routes.forEach((c) => c());
};
