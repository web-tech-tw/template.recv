"use strict";

// Routers
exports.routerFiles = [
    "./example.js",
    "./swagger.js",
];

// Load routes
exports.load = () => {
    const routerMappers = exports.routerFiles.map((n) => require(n));
    routerMappers.forEach((c) => c());
};
