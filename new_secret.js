"use strict";

// Import modules
const fs = require("node:fs");
const {
    createHash,
    randomInt,
    randomBytes,
} = require("node:crypto");

// Import constant
const constant = require("./src/init/const");

// Define variables
const length = randomInt(2048, 1000000);
const bytes = randomBytes(length);
const secret = Buffer.from(bytes).toString("base64");

// Define hash function - SHA256
const sha256hex = (data) =>
    createHash("sha256").update(data).digest("hex");

// Write the secret file
try {
    fs.writeFileSync(constant.SECRET_FILENAME, secret);
    console.info(
        `Secret Hash (sha256): ${sha256hex(secret)}`,
        `The secret has been saved into "${constant.SECRET_FILENAME}".`,
    );
} catch (e) {
    console.error(e);
}
