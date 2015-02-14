 
angular.module("ekisaan.controllers.help", []).
    controller("help",
        function ($scope, $rootScope, $q, $routeParams, $filter, helpService) {
            $scope.Title = $rootScope.language.HELP.TITLE;
            var me = this;
        });


