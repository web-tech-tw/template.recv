"use strict";

const node_cache = require('node-cache');

module.exports = new node_cache({stdTTL: 100});
