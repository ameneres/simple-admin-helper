var MongoClient = require( 'mongodb' ).MongoClient;

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( 'mongodb://admin:adminDedica@ds145379.mlab.com:45379/links', function( err, db ) {
    	if(err) throw err;
      _db = db;
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};