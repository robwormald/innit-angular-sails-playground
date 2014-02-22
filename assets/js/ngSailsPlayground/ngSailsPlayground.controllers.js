angular.module('ngSailsPlayground.controllers',[])

.controller('HomeController', ['$scope', function ($scope) {
	
	console.log('home controller')

}])

.controller('ChatController', ['$scope', '$sails', function ($scope,$sails) {
	
	$sails.get('/rooms').then(function(rooms){

		$scope.rooms = rooms;

	})
	

}])

.controller('ConsoleController', ['$scope', function ($scope) {
	
	console.log('rest controller')

}])

.controller('FirehoseController', ['$scope', '$sails', function ($scope,$sails) {
	
	$scope.$on('sails:firehose',function(ev,data){

		$scope.firehoseEvents.push({event : ev, data : data, timestamp : new Date()})

	})

	$scope.firehoseEvents = []

	$scope.openHose = function(){

		$sails.get('/firehose')
	}
	$scope.closeHose = function(){

		$sails.firehose.close()
	}

	

}])