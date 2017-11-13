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
    db: 'mysql://root@localhost/back_office_development',
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
    db: 'mysql://localhost/back_office_production',
    mdb: 'mongodb://admin:adminDedica@ds145379.mlab.com:45379/links'
  }
};

module.exports = config[env];
