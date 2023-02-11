"use strict";
// node-cache is an in-memory cache.

// Import node-cache
const NodeCache = require("node-cache");

// Initialize node-cache
const cache = new NodeCache({stdTTL: 100});

// Export as useFunction
exports.useCache = () => cache;
