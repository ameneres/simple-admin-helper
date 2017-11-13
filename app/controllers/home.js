var db = require('../models'),
  mongoose = require('mongoose');

console.log('sequencia: 7 - routes - home.js');

var Schema = mongoose.Schema;
var LinkSchema = new Schema();
var Links = mongoose.model('Links', LinkSchema, 'Links');
LinkSchema.index({"link":"text","product":"text"});


exports.home = function (req, res, next) {
  //need to mount these to req.session so I'm not requesting this to db all the time.
    res.locals.placeholder = "something";
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
        console.log(res.locals.csrf_token);
        //console.log('The solution is: ', results);
        res.render('index', {
          title: 'Dedica Admin',
          user: req.user,
          brands: results
        });
    });
  }) 
};

exports.test = function (req, res, next) {
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
          title: 'Dedica Admin',
          brands: results
        });
    });
  }) 
};


exports.products = function (req, res, next) {
  //need to mount these to req.session so I'm not requesting this to db all the time.
  console.log('vou processar request dos products');
  var brand_id = req.query.brand_id;
  console.log(brand_id);
  db.getConnection(function(err, connection){

    var query = `select
      id,
      name
      from
      products
      where
      brand_id = '${brand_id}'`;
    

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        connection.release();
        //console.log('The solution is: ', results);
        res.render('partials/products', {
          title: 'Dedica Admin',
          products: results,
          brand_id: req.query.brand_id
        });
    });
  }) 
};

exports.versions = function (req, res, next) {
  //need to mount these to req.session so I'm not requesting this to db all the time.
  console.log('vou processar request das versions');
  var product_id = req.query.product_id;
  console.log(req.query);
  db.getConnection(function(err, connection){

    var query = `select
        product_versions.id,
        product_versions.name,
        brands.name as brand_name,
        products.name as product_name,
        product_versions.name as version_name,
        primary_color_slug,
        secondary_color_slug
      from product_versions
      inner join products
        ON products.id = product_versions.product_id
      inner join brands
        ON products.brand_id = brands.id
      where
        products.id = '${product_id}'`;
    

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        connection.release();
        console.log('The versions solution is: ', results);
        res.render('partials/versions', {
          title: 'Dedica Admin',
          versions: results,
        });
    });
  }) 
};


exports.search = function (req, res, next) {
  console.log(req.body);
  var query = req.body.search;
  Links.find({$text: {$search: query}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).lean().exec(function(err, links)  {
      console.log(links[0]);
      res.render('partials/result', {
        title: 'Dedica Admin',
        search_term: query,
        links: links
      });
    });
};


/*
links.find({$text: {$search: query}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).toArray


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

