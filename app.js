const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
// Reference to DB and connection
const { mongoUrl } = require('./config');
console.log("Connecting to " + mongoUrl);
mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
// Get the default connection and checking error/success on connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () { console.log('Connected to database server'); });

// To handle data in post requests
app.use(express.json())

// We load the index.js of the api folder. 
app.use(require('./api'));
module.exports = app;
