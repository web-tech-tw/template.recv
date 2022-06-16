"use strict";
// mongoose is an ODM library for MongoDB.

// Import mongoose
const database = require("mongoose");

// Connect to MongoDB
database.connect(process.env.MONGODB_URI);

// Export database (instance)
module.exports = database;
