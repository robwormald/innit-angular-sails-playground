angular.module('ngSailsPlayground.directives',[])

.directive('ngSailsPlaygroundNav', [function () {
	return {
		restrict: 'E',
		replace : true,
		templateUrl : 'templates/navbar.html',
		scope : {
			navLinks : '='
		},
		link: function (scope, iElement, iAttrs) {
			
		}
	};
}])