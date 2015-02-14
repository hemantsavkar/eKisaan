angular.module("ekisaan.analysis", [
     'tc.chartjs',
    'ekisaan.controllers.analysis',
    'ekisaan.directives.analysis',
    'ekisaan.filters.analysis',
    'ekisaan.services.analysis',
]).config(['$routeProvider',
			 function ($routeProvider) {
			     $routeProvider
                    .when('/analysis', {
                        templateUrl: 'analysis/analysis.html',
                        controller: 'analysis'
                    })
                 .when('/Graph/1', {
                     templateUrl: 'analysis/totalSale.html',
                     controller: 'totalSales'
                 })
                 .when('/Graph/2', {
                     templateUrl: 'analysis/totalSale.html',
                     controller: 'totalSalesByVariety'
                 })
                  .when('/Graph/3', {
                      templateUrl: 'analysis/totalSale.html',
                      controller: 'totalSalesByCommodityByState'
                  })
                   .when('/Graph/4', {
                       templateUrl: 'analysis/totalSale.html',
                       controller: 'totalSalesByCommodityByStateByVariety'
                   })
                 .when('/Graph/6', {
                     templateUrl: 'analysis/totalSale.html',
                     controller: 'totalArrivals'
                 })
                 .when('/Graph/7', {
                     templateUrl: 'analysis/totalSale.html',
                     controller: 'totalArrivalsByVariety'
                 })
                  .when('/Graph/8', {
                      templateUrl: 'analysis/totalSale.html',
                      controller: 'totalArrivalsByCommodityByState'
                  })
                   .when('/Graph/9', {
                       templateUrl: 'analysis/totalSale.html',
                       controller: 'totalArrivalsByCommodityByStateByVariety'
                   })
			 }
]);