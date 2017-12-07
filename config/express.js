var express = require('express');
var session = require('express-session');
var glob = require('glob');
console.log('sequencia: 6 - express.js');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var csrf = require('csurf');
var mongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var pkg = require('../package.json');


module.exports = function(app, config) {
  console.log('sequencia: 3 - express.js');
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'pug');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: pkg.name,
    store: new mongoStore({
      url: config.mdb,
      collection : 'sessions'
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  app.use(function (req, res, next) {
    console.log('print!!!!!');
    console.log(req.body);
    next();
  });

  /*var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });*/


  if (env !== 'test') {
    console.log('a parte do csrf vai correr 1');
    app.use(csrf({ cookie: true }));
    console.log('a parte do csrf vai correr 2');

    // This could be moved to view-helpers :-)
    app.use(function (req, res, next) {
      res.locals.csrf_token = req.csrfToken();
      next();
    });
  }


  var Account = require('../app/mongo_models/index');
  passport.use(new LocalStrategy(Account.authenticate()));
  passport.serializeUser(Account.serializeUser());
  passport.deserializeUser(Account.deserializeUser());


  var requiresLogin = function (req, res, next) {

    console.log('estou no requiresLogin', req.user);
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  };


  // --------- ROUTES ----------

  const homeController = require('../app/controllers/home');

  //Login && Registration

  /*app.get('/register', function(req, res) {
      res.render('register', { });
  });

  app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
  });*/

  app.get('/login', function(req, res) {
      res.render('login', { user : req.user });
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
      res.redirect('/');
  });

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });








// Home
  app.get('/', requiresLogin, homeController.home);

// Products from brand
  app.get('/products', requiresLogin, homeController.products);

// Versions from product
  app.get('/versions', requiresLogin, homeController.versions);

// Search
  app.post('/search', requiresLogin, homeController.search);

  // Remore from search results
  app.get('/remove/:id', requiresLogin, homeController.remove_id);








  app.use(function (req, res, next) {
    console.log('app.use 2 correu');
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }



  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

  return app;
};
