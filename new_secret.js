"use strict";

// Import modules
const fs = require("fs");
const crypto = require("crypto");

// Import constant
const constant = require("./src/init/const");

// Define variables
const length = crypto.randomInt(2048, 1000000);
const bytes = crypto.randomBytes(length);
const secret = Buffer.from(bytes).toString("base64");

// Write the secret file
try {
    fs.writeFileSync(constant.SECRET_FILENAME, secret);
    console.info(
        `The secret has been saved into "${constant.SECRET_FILENAME}".`,
    );
} catch (e) {
    console.error(e);
}
