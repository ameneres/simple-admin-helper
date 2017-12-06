var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'back-office'
    },
    port: process.env.PORT || 3000,
    db: 'dev_dedica',
    host: '46.101.140.34',
    user: 'dev_pub_dedica' || process.env.USER,
    password : process.env.PASSWORD || '5Ev5YVokFtyJweL8',
    mdb: 'mongodb://admin:adminDedica@ds145379.mlab.com:45379/links'
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