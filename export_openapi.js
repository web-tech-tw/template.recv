"use strict";

// Import config
const {
    runLoader,
} = require("./src/config");

// Load config
runLoader();

// Import constant
const constant = require("./src/init/const");

// Import modules
const {writeFileSync} = require("node:fs");

const {useApiDoc} = require("./src/init/api_doc");

// Get the API documentation
const apiDoc = useApiDoc();
const apiDocJson = JSON.stringify(apiDoc);

// Write the JSON file
try {
    const {OPENAPI_EXPORTED_FILENAME: filename} = constant;
    writeFileSync(filename, apiDocJson, {
        encoding: "utf-8",
    });
    console.info(`The documentation has been saved into "${filename}".`);
} catch (error) {
    console.error(error);
}
