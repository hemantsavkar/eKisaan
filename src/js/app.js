var kissanApp = angular.module("kissanApp", [
    "ngRoute",
    "LocalStorageModule",
    "angular-datepicker",
    'mobile-angular-ui',
    'ekisaan.landingmenu',
    'ekisaan.mandirate',
    'ekisaan.registration',
    'ekisaan.share',
    'ekisaan.analysis',
    'ekisaan.settings',
    'ekisaan.help',
    'ekisaan_languages'
]);

kissanApp.config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
        $compileProvider.imgSrcSanitizationWhitelist('images/');
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);
kissanApp
	.config(['$routeProvider',
			 function ($routeProvider) {
			     $routeProvider
                     .when('/', {
                         templateUrl: "landingmenu/landingMenu.html",
                         controller: 'landingmenu'
                     })
			 }
	])
kissanApp
.config(function ($provide, $httpProvider) {
    $provide.factory('PetroHelpHttpInterceptor', ['$q', '$injector', '$location', function ($q, $rootScope, $location) {
        return {
            request: function (config) {

                config.headers = config.headers || {};

                return config || $q.when(config);
            },
            requestError: function (rejection) {
                //bootbox.alert({
                //    title: "Error Occured",
                //    message: '<table style="width:100%"><tr style="width:100%"><td style="width:100%" align="center"><h1><span class="glyphicon glyphicon-info-sign"></span></h1></td>    </tr>    <tr style="width:100%">        <td style="width:100%;" align="center">' + rejection.data.Message + '</td>    </tr></table>',
                //    buttons: {
                //        ok: {
                //            label: "Ok",
                //            className: "btn-default btn-sm",
                //            callback: function () {
                //            }
                //        }
                //    }
                //});

                //alert("Exception Occured While Requesting Data.");
                alert("Error Occured while calling \n"+rejection.config.url);
                return $q.reject(rejection);
            },
            // On response success
            response: function (response) {
                //alert("Exception Occured While Getting Response.");
                return response || $q.when(response);
            },

            // On response failture
            responseError: function (rejection) {
                //bootbox.alert({
                //    title: "Error Occured",
                //    message: '<table style="width:100%"><tr style="width:100%"><td style="width:100%" align="center"><h1><span class="glyphicon glyphicon-info-sign"></span></h1></td>    </tr>    <tr style="width:100%">        <td style="width:100%;" align="center">' + rejection.data.Message + '</td>    </tr></table>',
                //    buttons: {
                //        ok: {
                //            label: "Ok",
                //            className: "btn-default btn-sm",
                //            callback: function () {
                //            }
                //        }
                //    }
                //});
                alert("Error Occured while calling\n" + rejection.config.url);
                return $q.reject(rejection);
            }
        };
    }]);
    $httpProvider.interceptors.push('PetroHelpHttpInterceptor');
});
kissanApp.directive('shaLoading', function () {
return {
    restrict: 'A',
    replace: true,
    transclude: true,
    scope: {
        loading: '=shaLoading'
    },
    templateUrl: '/app/templates/loading.html',
    link: function (scope, element, attrs) {
        var spinner = new Spinner({lines:10,length:10,width:6,radius:16,corners:1.0,rotate:30,trail:40,speed:1.3,direction:1}).spin();
        var loadingContainer = element.find('.sha-loading-spinner-container')[0];
        if (loadingContainer)
        loadingContainer.appendChild(spinner.el);
    }
};
});
kissanApp.directive('focus', function () {
    return {
        restrict: 'A',
        link: function($scope,elem,attrs) {

            elem.bind('keydown', function(e) {
                var code = e.keyCode || e.which;
                if (code === 13) {
                    e.preventDefault();
                    elem.next().focus();
                }
            });
        }
    }
});
kissanApp.controller("MainController", ['$scope', '$location', '$rootScope', 'Languages', function ($scope, $location, $rootScope, Languages) {
    //$rootScope.language = Languages.english;
    $rootScope.$on("$routeChangeStart", function () {
        $rootScope.loading = true;
    });

    $scope.urlHistory = [];
    
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.$$absUrl.split('#')[1] !== $scope.urlHistory[$scope.urlHistory.length - 1]) {
            $scope.urlHistory.push($location.$$absUrl.split('#')[1]);
        }
        $rootScope.loading = false;
    });

    $scope.goBack = function () {
        $scope.urlHistory.pop();
        
         $location.$$search = {};
         var loca = $scope.urlHistory[$scope.urlHistory.length - 1];
         var a = loca.split('?');
         if (a[0]) {
             $location.path(a[0]);
         }
         if(a[1]){
             var b = a[1].split('&')
             angular.forEach(b, function (value) {
                 var c=value.split('=')
                 $location.search(c[0], c[1]);
             });
         }

         //search('page', 2)

        
    };
  
}]);

kissanApp.run(['$rootScope','$location', function ($rootScope,$location) {
    if (!$rootScope.layoutOption)
    {
        $location.url("/");
    }
}]);
