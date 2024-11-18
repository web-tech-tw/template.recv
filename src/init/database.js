"use strict";
// mongoose is an ODM library for MongoDB.

// Import modules
const {getMust} = require("../config");
const database = require("mongoose");

// Configure mongose
database.set("strictQuery", true);

/**
 * Configure mongodb.
 * @return {Promise<void>}
 */
exports.prepare = () =>
    database.connect(getMust("MONGODB_URI"));

/**
 * Composable database.
 * @return {database.Connection} The mongoose connection.
 */
exports.useDatabase = () => database;
