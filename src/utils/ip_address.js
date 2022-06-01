"use strict";
// Get IP Address from request.

// Export (function)
module.exports = (req) => req?.clientIp || req.ip;
