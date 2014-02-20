// a sample sails + angular app

angular.module('ngSailsPlayground',['ngSails','ngSailsPlayground.controllers','ngSailsPlayground.states','ngSailsPlayground.directives','ngAnimate'])

.config(['sailsProvider',function (sailsProvider) {

//	sailsProvider.$connection('playgroundServer',ngSailsPlaygroundSettings)

//	sailsProvider.$model('User',{})

	
}])

.run(['sails','ngSailsConfig','$location',function (sails,ngSailsConfig,$location) {
	
	var launchData = $location.search()

	
	sails.lift(ngSailsConfig)
	

}])



.controller('AppRootController', ['$rootScope','$scope', 'sails', function ($rootScope,$scope,sails) {

	$rootScope.$on('sails:authenticated',function(authenticationData){

		console.log(authenticationData)

	})

	
	$scope.playgroundPages = [
		{state : 'app.home', title : 'Home'},
		{state : 'app.chat', title : 'Chat'},
		{state : 'app.firehose', title : 'Firehose'},
		{state : 'app.console', title : 'API Console'},
		{state : 'app.logs', title : 'Logs'},
		{state : 'app.about', title : 'About'}]

}])
