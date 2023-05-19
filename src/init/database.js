"use strict";
// mongoose is an ODM library for MongoDB.

// Import config
const {getMust} = require("../config");

// Import mongoose
const database = require("mongoose");

// Configure mongose
database.set("strictQuery", true);

// Connect to MongoDB
exports.prepare = () =>
    database.connect(getMust("MONGODB_URI"));

// Export as useFunction
exports.useDatabase = () => database;
