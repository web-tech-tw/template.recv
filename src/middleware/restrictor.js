"use strict";
// The solution to defense from brute-force attacks,

// Import modules
const {StatusCodes} = require("http-status-codes");
const {isProduction} = require("../config");
const {express} = require("../init/express");
const {useCache} = require("../init/cache");
const {getIPAddress} = require("../utils/visitor");

/**
 * Get path key from request.
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

/**
 * Construct a middleware handler for restricting the request.
 * @module src/middleware/restrictor
 * @param {number} max - The maximum number of requests allowed per IP address.
 * @param {number} ttl - The time to live in seconds to unblock the IP address
 * if no request comes. If set to 0, it will be blocked forever
 * until the software is restarted.
 * @param {boolean} isParam - The flag to remove the last path from the key.
 * @param {number} [customForbiddenStatus] - The custom status code for
 * forbidden requests, optional.
 * @return {express.Handler} The middleware handler.
 */
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
