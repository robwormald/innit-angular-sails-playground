module.exports = {



	//verifies a login request and issues a token if valid.
	authenticate : function(req,res){

		var username = req.param('username')
		var password = req.param('password')

		if(!username){
			return res.json(401,{err : 'username required'})
		}

		var user = {
				subject : username,
		}


	}



}