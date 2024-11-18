"use strict";

// Import constants
const {
    OPENAPI_EXPORTED_FILENAME,
} = require("./src/init/const");

// Import config loader
const {
    runLoader,
} = require("./src/config");

// Load config
runLoader();

// Import modules
const {
    writeFileSync,
} = require("node:fs");
const {
    useApiDoc,
} = require("./src/init/api_doc");

// Get the API documentation
const apiDoc = useApiDoc();
const apiDocJson = JSON.stringify(apiDoc);

// Write the JSON file
try {
    writeFileSync(OPENAPI_EXPORTED_FILENAME, apiDocJson, {
        encoding: "utf-8",
    });
    console.info(
        "The documentation has been saved into "+
        `"${OPENAPI_EXPORTED_FILENAME}".`,
    );
} catch (error) {
    console.error(error);
}
