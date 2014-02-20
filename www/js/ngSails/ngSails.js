/**
 * ngSails
 * 
 * (c) 2014 Rob Wormald rob.wormald@innit.io
 */

var ngSails = angular.module('ngSails',['ngSails.io'])

ngSails.provider('sails', [function () {
	




	var ngSailsProvider = function($http,sailsSocketFactory){

		var _sails = {
			sockets : {}
		}


		return {
			lift : function(config){

				_sails.sockets.default = sailsSocketFactory(config)
				
				
				
			}
		}

	}


	return {

		$get : ['$http','sailsSocketFactory',ngSailsProvider],

		$connection : function(){},
		$collection : function(){},
		$schema : function(){},
		$service : function(){}

	}
}])