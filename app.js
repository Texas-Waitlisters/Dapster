// Load the dot files.
require('dotenv').load({silent: true});

// Middleware
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var database = process.env.DATABASE || process.env.MONGODB_URI || "mongodb://localhost:27017";

mongoose.connect(database);

var express = require('express');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var apiRouter = express.Router();
require('./app/server/routes/api')(apiRouter);
app.use('/api', apiRouter);

app.listen(port);
console.log("App listening on port " + port);
