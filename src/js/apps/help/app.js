 
angular.module("ekisaan.help", [
    'ekisaan.controllers.help',
    'ekisaan.directives.help',
    'ekisaan.filters.help',
    'ekisaan.services.help',
]).config(['$routeProvider',
			 function ($routeProvider) {
			     $routeProvider
                    .when('/help', {
                        templateUrl: 'help/help.html',
                        controller: 'help'
                    })
			 }
]);