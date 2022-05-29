"use strict";

const database = require('mongoose');
void (database.connect(process.env.MONGODB_URI));

module.exports = database;
