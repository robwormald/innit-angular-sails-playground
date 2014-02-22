// a sample sails + angular app

angular.module('ngSailsPlayground',['innit.sails','ngSailsPlayground.controllers','ngSailsPlayground.states','ngSailsPlayground.directives','ngAnimate'])

.config(['$sailsProvider',function ($sailsProvider) {

//	sailsProvider.$connection('playgroundServer',ngSailsPlaygroundSettings)

	$sailsProvider.$model('User',{attributes: {
	
	username: 'string',
	password: 'string',
	domain : {model : 'domain'},
	rooms: {
		collection: 'room',
		via: 'users',
		dominant: true
	}
	
  }})

	
}])

.run(['$sails','ngSailsConfig','$location',function (sails,ngSailsConfig,$location) {
	
	var launchData = $location.search()

	
	sails.then(function(data){

		return data;
	})

}])



.controller('AppRootController', ['$rootScope','$scope', '$sails', function ($rootScope,$scope,$sails) {

	


	$rootScope.$on('sails:connected',function(authenticationData,data){

		console.log($sails)
	})

	// $rootScope.$on('sails:authenticated',function(authenticationData,data){

	// 	console.log(data)

	// })

	// $rootScope.$on('sails:connecting',function(authenticationData,data){

	// 	console.log(data)

	// })

	// $rootScope.$on('sails:message',function(authenticationData){

	// 	console.log(authenticationData)

	// })

	

	// $rootScope.$on('sails:debug',function(authenticationData){

	// 	console.log(authenticationData)

	// })



	
	$scope.playgroundPages = [
		{state : 'app.home', title : 'Home'},
		{state : 'app.chat', title : 'Chat'},
		{state : 'app.firehose', title : 'Firehose'},
		{state : 'app.console', title : 'API Console'},
		{state : 'app.logs', title : 'Logs'},
		{state : 'app.about', title : 'About'}]

}])
