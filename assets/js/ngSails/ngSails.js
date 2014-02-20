/**
 * ngSails
 * 
 * (c) 2014 Rob Wormald rob.wormald@innit.io
 */

var ngSails = angular.module('ngSails',['ngSails.io'])

ngSails.provider('sails', [function () {
	




	var ngSailsProvider = function($rootScope,$http,sailsSocketFactory){

		var _sails = {
			sockets : {}
		}



		var _firehose = []


		$rootScope.$on('sails_firehose',function(data){
			console.log(data)
			_firehose.push(data)
		})

		return {
			lift : function(config){

				_sails.socket = sailsSocketFactory(config)
				
				_sails.socket.on('sails:connected',function(data){
					
					_sails.socket.get('/firehose',{}).then(function(){

						_sails.socket.post('/room',{name : 'test',id : 'sometoom'})
					})

					

				})
				
			},

			firehose : _firehose
		}

	}


	return {

		$get : ['$rootScope','$http','sailsSocketFactory',ngSailsProvider],

		$connection : function(){},
		$collection : function(){},
		$schema : function(){},
		$service : function(){}

	}
}])