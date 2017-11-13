

var express = require('express'),
  config = require('./config/config');
console.log('sequencia: 5 - app.js');
var mongoose = require('mongoose');
var db = require('./app/models');
var build_app = require('./config/express');
var config = require('./config/config');


var app = express();
console.log('sequencia: 1 - app.js');

mongoose.connect(config.mdb);

build_app(app, config);
app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});




module.exports = app;

/*
db.sequelize
  .sync()
  .then(function () {
    console.log('sequencia: 2 - app.js');

    if (!module.parent) {
      _mongodb.connectToServer( function( err ) {
        // start the rest of your app here
        console.log('Connect to mongodb!');
        if(err) throw err;
        build_app(app, config);
        app.listen(config.port, function () {
          console.log('Express server listening on port ' + config.port);
        });
      });
      
    }
  }).catch(function (e) {
    throw new Error(e);
  });
*/