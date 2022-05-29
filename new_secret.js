"use strict";

const fs = require('fs')
const crypto = require('crypto');

const constant = require('./src/init/const');

const length = crypto.randomInt(2048, 1000000);
const bytes = crypto.randomBytes(length);
const secret = Buffer.from(bytes).toString('base64');

try {
    fs.writeFileSync(constant.SECRET_FILENAME, secret);
    console.log(`The secret has been saved into "${constant.SECRET_FILENAME}".`)
} catch (e) {
    console.error(e)
}
