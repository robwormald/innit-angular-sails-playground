angular.module('ngSailsPlayground.states',['ui.router'])

.config(['$sailsProvider','$stateProvider','$urlRouterProvider',function ($sailsProvider,$stateProvider,$urlRouterProvider) {

	$stateProvider.state('app',{
		controller : 'AppRootController',
		templateUrl : 'templates/playgroundLayout.html',
		abstract : true,
		resolve : {
			'$sails' : function($sails){
				return $sails
			}
		}
	})

	$stateProvider.state('app.home',{
		controller : 'HomeController',
		templateUrl : 'templates/home.html',
		url : '/'
	})

	$stateProvider.state('app.console',{
		controller : 'ConsoleController',
		templateUrl : 'templates/console.html',
		url : '/console'
	})

	$stateProvider.state('app.chat',{
		controller : 'ChatController',
		templateUrl : 'templates/chat.html',
		url : '/chat'
	})

	$stateProvider.state('app.firehose',{
		controller : 'FirehoseController',
		templateUrl : 'templates/firehose.html',
		url : '/firehose'
	})

	$stateProvider.state('app.logs',{
		controller : 'AboutController',
		templateUrl : 'templates/logs.html',
		url : '/logs'
	})

	$stateProvider.state('app.about',{
		controller : 'AboutController',
		templateUrl : 'templates/chat.html',
		url : '/about'
	})


	//register a model with the sails provider

	// $sailsProvider.$collection('Employee',{

	// })

	
	$urlRouterProvider.otherwise('/')
	
}])