var express = require('express'),
  router = express.Router(),
  db = require('../models');
  _mongodb = require('../mongo_models/').getDb();

console.log('sequencia: 7 - routes - home.js');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  //need to mount these to req.session so I'm not requesting this to db all the time.
  db.getConnection(function(err, connection){

    var query = `select
      id,
      name
      from
      brands
      where
      state = 'publish'`;
    

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        connection.release();
        //console.log('The solution is: ', results);
        res.render('index', {
          title: 'Generator-Express MVC',
          brands: results
        });
    });
  }) 
});

router.get('/test', function (req, res, next) {
	db.getConnection(function(err, connection){

    var query = `select
      id,
      name
      from
      brands
      where
      state = 'publish'`;
    

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        connection.release();
        //console.log('The solution is: ', results);
        res.render('index', {
          title: 'Generator-Express MVC',
          brands: results
        });
    });
  }) 
});


router.post('/search', function (req, res, next) {
  console.log(req.body);
  var query = req.body.search;
  var links = _mongodb.collection('Links');

  links.find({$text: {$search: query}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).toArray(function(err, links)  {
      console.log(links.length);
      res.render('index', {
        title: 'Generator-Express MVC',
        links: links
      });
    });
});


/*
db.getConnection(function(err, connection){

    var query = `select
      id,
      name
      from
      brands
      where
      state = 'publish'`;
    

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        connection.release();
        //console.log('The solution is: ', results);
        res.render('index', {
          title: 'Generator-Express MVC',
          brands: results
        });
    });
  })  
  */

