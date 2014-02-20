//app specific settings


angular.module('ngSailsPlayground').constant('ngSailsPlaygroundSettings', ['$window',function($window){
	
	return {
		baseUrl :  $window.origin || 'http://localhost:1337',
		connectAutomatically : true,
		apiBasePath : '/api'
	}

	
}])