 
angular.module("ekisaan.registration", [
    'ekisaan.controllers.registration',
    'ekisaan.directives.registration',
    'ekisaan.filters.registration',
    'ekisaan.services.registration',
]).config(['$routeProvider',
			 function ($routeProvider) {
			     $routeProvider
                    .when('/signup', {
                        templateUrl: 'registration/registration.html',
                        controller: 'registration'
                    })
			 }
]);