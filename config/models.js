/**
 * Models
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 */

var uuid = require('node-uuid')


module.exports.models = {
 
  // Your app's default connection.
  // i.e. the name of one of your app's connections (see `config/connections.js`)
  //
  // (defaults to localDiskDb)
  connection: 'dataStore',

  //migrate : 'drop',

  //xattributes : {
  	
 //  	id : {
 //      type : 'string',
 //      primaryKey : true,
 //      required : true,

 //    },
 //  },
 //  beforeCreate : function(values,cb){
	
	// if(!values.id){

 //      values.id = uuid.v4();
 //    }

 //    cb()


 //  }
};
