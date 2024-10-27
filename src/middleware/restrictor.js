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
 * @return {string}
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
// customForbiddenStatus is the custom status code
// for forbidden request, optional.
module.exports = (max, ttl, isParam, customForbiddenStatus=null) =>
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
                    "Too many forbidden requests received:",
                    `actual "${keyValue}"`,
                    `expect "${max}"`,
                );
            }
            res.sendStatus(StatusCodes.TOO_MANY_REQUESTS);
            increaseValue();
            return;
        }

        let forbiddenStatus = StatusCodes.FORBIDDEN;
        if (customForbiddenStatus) {
            forbiddenStatus = customForbiddenStatus;
        }

        res.on("finish", () => {
            if (res.statusCode !== forbiddenStatus) {
                return;
            }
            if (!isProduction()) {
            // Debug message
                console.warn(
                    "An forbidden request detected:",
                    forbiddenStatus,
                    queryKey,
                );
            }
            increaseValue();
        });

        // Call next middleware
        next();
    };
