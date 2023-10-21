const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.MONGO_URI;

const db = mongoose.connect(DB_URL);

module.exports = db;
