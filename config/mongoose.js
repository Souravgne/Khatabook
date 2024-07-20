const mongoose = require('mongoose');
const debuglog = require("debug")("development:mongooseconfig");

// Consolidated database connection configuration
mongoose.connect("mongodb://127.0.0.1:27017/Khatabookdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", function(err) {
    debuglog(`Error connecting to the database: ${err.message}`);
});

db.on("open", function() {
    debuglog("Successfully connected to the Khatabook database.");
});

module.exports = db;
