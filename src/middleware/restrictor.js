"use strict";
// The solution to defense from brute-force attacks,

// Import StatusCodes
const {StatusCodes} = require("http-status-codes");

// Import useCache
const {useCache} = require("../init/cache");

// Import getIPAddress
const {getIPAddress} = require("../utils/visitor");

/**
 * Get path key from request.
 * @module restrictor
 * @function
 * @param {object} req the request
 * @param {boolean} isParam is param mode
 * @return {array}
 */
function getPathKey(req, isParam) {
    const pathArray = req.originalUrl.split("/").filter((i) => !!i);
    if (isParam) {
        pathArray.pop();
    }
    return pathArray.join(".");
}

// Export (function)
// max is the maximum number of requests allowed every IP addresss.
// ttl is the seconds to unblock the IP address if there no request comes.
// if ttl set as 0, it will be blocked forever until the software restarted.
module.exports = (max, ttl, isParam) => (req, res, next) => {
    const pathKey = getPathKey(req, isParam);
    const visitorKey = getIPAddress(req);
    const queryKey = ["restrictor", pathKey, visitorKey].join(":");

    const cache = useCache();

    const keyValue = cache.get(queryKey);

    const increaseValue = () => {
        const offset = keyValue ? keyValue + 1 : 1;
        cache.set(queryKey, offset, ttl);
    };

    if (keyValue > max) {
        res.sendStatus(StatusCodes.TOO_MANY_REQUESTS);
        increaseValue();
        return;
    }

    res.on("finish", () => {
        if (res.statusCode !== StatusCodes.UNAUTHORIZED) {
            return;
        }
        increaseValue();
    });
    next();
};
