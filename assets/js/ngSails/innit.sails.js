/**
 * ngSails
 * 
 * (c) 2014 Rob Wormald rob.wormald@innitapps.com
 */

var ngSails = angular.module('innit.sails',['innit.sails.io','innit.sails.model','innit.sails.ensign'])

ngSails.provider('$sails', [function () {
	
	var _preSails = {
		models : {},
		socket : undefined
	}


	var ngSailsProvider = function($q,$rootScope,$http,sailsSocketFactory){
		
		var _deferredSails = $q.defer()

		var _sails = {}
		var _sailsSocket = sailsSocketFactory()

		
		_sailsSocket.on('connect',function(){
			console.log('foo')
		})

		_sailsSocket.forward('firehose')

		_deferredSails.resolve(_sailsSocket)


		return _deferredSails.promise;

	}


	return {

		$get : ['$q','$rootScope','$http','sailsSocketFactory',ngSailsProvider],

		$connection : function(){},
		$model : function(identity,model){

			_preSails.models[identity] = model;

		},
		$schema : function(){},
		$service : function(){}

	}
}])