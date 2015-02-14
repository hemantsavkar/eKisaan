angular.module("ekisaan.share", [
    'ekisaan.controllers.share',
    'ekisaan.directives.share',
    'ekisaan.filters.share',
    'ekisaan.services.share',
]).config(['$routeProvider',
			 function ($routeProvider) {
			     $routeProvider
                    .when('/share', {
                        templateUrl: 'share/share.html',
                        controller: 'share'
                    })
			 }
]);