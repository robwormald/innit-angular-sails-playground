angular.module('ngSailsPlayground.controllers',[])

.controller('HomeController', ['$scope', function ($scope) {
	
	console.log('home controller')

}])

.controller('ChatController', ['$scope', function ($scope) {
	
	console.log('rest controller')

}])

.controller('ConsoleController', ['$scope', function ($scope) {
	
	console.log('rest controller')

}])

.controller('FirehoseController', ['$scope', 'sails', function ($scope,sails) {
	
	console.log('rest controller')

	$scope.$on('sails:message',function(data){
		console.log(data)
	})

}])