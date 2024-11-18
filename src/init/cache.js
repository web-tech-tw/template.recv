"use strict";
// node-cache is an in-memory cache.

// Import modules
const NodeCache = require("node-cache");

// Initialize node-cache
const cache = new NodeCache({stdTTL: 100});

/**
 * Composable cache.
 * @return {NodeCache} The node-cache.
 */
exports.useCache = () => cache;
