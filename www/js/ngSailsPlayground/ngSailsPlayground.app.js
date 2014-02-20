// a sample sails + angular app

angular.module('ngSailsPlayground',['ngSails','ngSailsPlayground.controllers','ngSailsPlayground.states','ngSailsPlayground.directives','ngAnimate'])

.config(['sailsProvider','ngSailsPlaygroundSettings',function (sailsProvider,ngSailsPlaygroundSettings) {

//	sailsProvider.$connection('playgroundServer',ngSailsPlaygroundSettings)

//	sailsProvider.$model('User',{})

	
}])

.run(['sails','ngSailsPlaygroundSettings','$location',function (sails,ngSailsPlaygroundSettings,$location) {
	
	var launchData = $location.search()

	sails.lift(ngSailsPlaygroundSettings)
	

}])



.controller('AppRootController', ['$rootScope','$scope', 'sails', function ($rootScope,$scope,sails) {
	
	$scope.playgroundPages = [{state : 'app.home', title : 'Home'},{state : 'app.chat', title : 'Chat'},{state : 'app.console', title : 'API Console'},{state : 'app.logs', title : 'Logs'},{state : 'app.about', title : 'About'}]

}])
