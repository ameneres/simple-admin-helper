var mysql = require('mysql');
var config = require('../../config/config');
//settings env
var db;
var dedica_variables;

function connectDatabase() {
  console.log('estou sempre a correr o mysql!!');
    if (!db) {
        db = mysql.createPool({
          host     : '46.101.140.34',
          user     : 'dev_pub_dedica',
          password : '5Ev5YVokFtyJweL8',
          database : 'dev_dedica'
        });

        /*var initialQuery = `
          Set sql_mode='';
        `;
        db.query(initialQuery, function (error, results, fields) {
          console.log('query do set foi chamada');
          if (error) throw error;
        });*/

        db.getConnection(function(err, connection) {
          console.log('já ligou o mysll!!');
          /*var initalQuery = `
            Set sql_mode='';
            `;
          connection.query(initalQuery, function (error, results, fields) {
            console.log('query do set foi chamada');
            if (error) throw error;
            connection.release();
          });*/
          // Use the connection
          //connection.query('SELECT something FROM sometable', function (error, results, fields) {
            // And done with the connection.
            //connection.release();

            // Handle error after the release.
            if (err) throw err;

            // Don't use the connection here, it has been returned to the pool.
          //});
        });
    }
    return db;
}

module.exports = connectDatabase();





/*var fs = require('fs'),
  path = require('path'),
  Sequelize = require('sequelize'),
  config = require('../../config/config'),
  db = {};

var sequelize = new Sequelize(config.db);

console.log('sequencia: 4 - models/index.js');

fs.readdirSync(__dirname).filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function (file) {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log(Object.keys(db));

module.exports = db;*/
