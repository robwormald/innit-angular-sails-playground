var jwt = require('jsonwebtoken')
var socketjwt = require('socketio-jwt')


module.exports.issueToken = function(payload,issue){


	var token = jwt.sign(payload,process.env.TOKEN_SECRET)


	return issue(null,token)




}

