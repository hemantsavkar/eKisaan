 
angular.module("ekisaan.settings", [
    'ekisaan.controllers.settings',
    'ekisaan.directives.settings',
    'ekisaan.filters.settings',
    'ekisaan.services.settings',
]).config(['$routeProvider',
			 function ($routeProvider) {
			     $routeProvider
                    .when('/settings', {
                        templateUrl: 'settings/settings.html',
                        controller: 'settings'
                    })
			 }
]);