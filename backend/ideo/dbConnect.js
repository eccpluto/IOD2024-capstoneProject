'use strict';
const mongoose = require("mongoose");

// typically, as .env would not be provided with source code, we provide a default URI string
const URI = process.env.DB_URI || "mongodb://127.0.0.1/ideo_db";

// connect to MongoDB
mongoose.connect(URI)
    .then(() => console.log('Database connected.'))
    .catch((err) => console.error(`Database connection failed: ${err.message}`));

// add event listener for 'error' to the connection object
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'MongoDB connection error.'));

exports.mongoose = mongoose;