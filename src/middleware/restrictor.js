"use strict";
// The solution to defense from brute-force attacks,

// Import isProduction
const {isProduction} = require("../config");

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
// isParam is the flag to remove the last path from the key.
// customUnauthorizedStatus is the custom status code
// for unauthorized request, optional.
module.exports = (max, ttl, isParam, customUnauthorizedStatus=null) =>
    (req, res, next) => {
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
            if (!isProduction()) {
            // Debug message
                console.warn(
                    "Too many unauthorized requests received:",
                    `actual "${keyValue}"`,
                    `expect "${max}"`,
                );
            }
            res.sendStatus(StatusCodes.TOO_MANY_REQUESTS);
            increaseValue();
            return;
        }

        let unauthorizedStatus = StatusCodes.UNAUTHORIZED;
        if (customUnauthorizedStatus) {
            unauthorizedStatus = customUnauthorizedStatus;
        }

        res.on("finish", () => {
            if (res.statusCode !== unauthorizedStatus) {
                return;
            }
            if (!isProduction()) {
            // Debug message
                console.warn(
                    "An unauthorized request detected:",
                    unauthorizedStatus,
                    queryKey,
                );
            }
            increaseValue();
        });

        // Call next middleware
        next();
    };
