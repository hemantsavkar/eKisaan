 
angular.module("ekisaan.controllers.share", []).
    controller("share",
        function ($scope, $rootScope, $q, $routeParams, $filter, shareService, mandirateService) {
            $scope.Title = $rootScope.language.SHARE.TITLE;

            var me = this;
            $scope.share = {};

            $scope.register = function (share) {
                alert(share.cell)
            };

            init();
            function init() {
                var frm = $routeParams.from;
            }


        });


