var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'back-office'
    },
    port: 3000,
    db: 'db',
    host: 'host',
    user: 'user',
    password : 'pass',
    mdb: 'mdb'
  },

  test: {
    root: rootPath,
    app: {
      name: 'back-office'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/back_office-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'back-office'
    },
    port: process.env.PORT || 3000,
    db: process.env.DB,
    host: process.env.HOST,
    user: process.env.USER,
    password : process.env.PASSWORD,
    mdb: process.env.MONGO_DB
  }
};

module.exports = config[env];


/*
development: {
    root: rootPath,
    app: {
      name: 'back-office'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://root@localhost/back_office_development',
    mdb: 'YOUR_MONGODB'
  }
*/