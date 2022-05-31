"use strict";

// Get IP Address from request
module.exports = (req) => req?.clientIp || req.ip;
