angular.module('innit.sails.ensign',[])

.factory('$sailsAuthentication',['$http','$sailsUser',function($http,$sailsUser){

	var authState = {
		authenticated : false
	}
	

	return {

		isAuthenticated : function(){
			return authState.authenticated;
		},

		login : function(username,password){

			$http.post('/login',{username : username, password: password})


		}


	}


}])

.factory('$sailsUser',function(){


	return {
		user : {}

	}


})


.factory('$sailsToken',['$sessionStorage',function($sessionStorage){



}])