"use strict";
// node-cache is an in-memory cache.

// Import node-cache
const node_cache = require('node-cache');

// Initialize node-cache, and export (instance)
module.exports = new node_cache({stdTTL: 100});
