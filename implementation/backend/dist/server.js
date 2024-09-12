"use strict";

var express = require('express');
var path = require('path');
var app = express();

// Serve static files from the correct frontend/public folder
app.use(express["static"](path.join(__dirname, '..', '..', 'frontend', 'public')));

// Catch all routes and send index.html so that React Router can take over
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', '..', 'frontend', 'public', 'index.html'));
});
app.listen(3000, function () {
  console.log('Listening on localhost:3000');
});