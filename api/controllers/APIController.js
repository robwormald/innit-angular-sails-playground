

module.exports = {


	//returns the necessary metadata to build up a client side angular API provider
	meta : function(req,res){

		//domain is the entrypoint (top level) model in this case
		
		//get schema (should probably be a better way to do all this)

		var _schema = sails.models.domain._schema;
		
		console.log(_schema)
		res.json({models : Object.keys(_schema)})


	}

}