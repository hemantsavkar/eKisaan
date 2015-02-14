
angular.module("ekisaan.mandirate", [
    'ekisaan.controllers.mandirate',
    'ekisaan.directives.mandirate',
    'ekisaan.filters.mandirate',
    'ekisaan.services.mandirate',
]).config(['$routeProvider',
			 function ($routeProvider) {
			     $routeProvider
                    .when('/mandirates', {
                        templateUrl: 'mandirate/mandiRatesHome.html',
                        controller: 'mandirate'
                    })
                 .when('/categoryDetails', {
                     templateUrl: 'mandirate/mandiRatesDetailCategory.html',
                     controller: 'mandirateDetailsCategory'
                 })
                 .when('/itemDetails', {
                     templateUrl: 'mandirate/itemRateDetails.html',
                     controller: 'itemRateDetails'
                 })
                 .when('/favourites', {
                     templateUrl: 'mandirate/favouirtesHome.html',
                     controller: 'favouritesHome'
                 })
                  .when('/allFavMarkets', {
                      templateUrl: 'mandirate/favouirtesMarkets.html',
                      controller: 'favouirtesMarkets'
                  })
                  .when('/allFavComodities', {
                      templateUrl: 'mandirate/favouirtesComodities.html',
                      controller: 'favouirtesComodities'
                  })
			 }
]);