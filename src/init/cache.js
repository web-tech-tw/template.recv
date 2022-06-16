"use strict";
// node-cache is an in-memory cache.

// Import node-cache
const NodeCache = require("node-cache");

// Initialize node-cache, and export (instance)
module.exports = new NodeCache({stdTTL: 100});
