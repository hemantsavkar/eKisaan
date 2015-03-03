 
angular.module("ekisaan.controllers.landingmenu", []).
    controller("landingmenu",
       ['$scope', '$rootScope','$q','$routeParams', '$filter', 'landingmenuService','Languages', function ($scope, $rootScope,$q, $routeParams, $filter, landingmenuService,Languages) {
            $scope.Title = "LandingMenus";
            //$scope.EMAIL_REGEXP = '/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
            var me = this;
            $scope.landingmenu = {};
            $scope.selections = [];
            $scope.viewLoading = true;
            if (!$rootScope.layoutOption)
                $rootScope.layoutOption = 'blocks';
            initMenus();
            $rootScope.$on('languageChanged', function (event, data) {
                initMenus();
            })
            function initMenus() {
                var timeOut = 1;
                if (!$rootScope.language)
                {
                    $rootScope.language = Languages.english;
                }
                    $scope.menus = [
                                      { navigationToView: "mandirates", icon: "inr", title: $rootScope.language.MENU.RATES },
                                      { navigationToView: "favourites", icon: "bookmark-o", title: $rootScope.language.MENU.FAVOURITES },
                                      { navigationToView: "analysis", icon: "bar-chart", title: $rootScope.language.MENU.ANALYSYS },
                                      { navigationToView: "signup", icon: "sign-in", title: $rootScope.language.MENU.REGISTER },
                                      //{ navigationToView: "share", icon: "share-alt", title: $rootScope.language.MENU.SHARE },
                                      //{ navigationToView: "transact", icon: "inr", title: "Transact" },
                                      { navigationToView: "settings", icon: "gears", title: $rootScope.language.MENU.SETTINGS },
                                      { navigationToView: "help", icon: "question", title: $rootScope.language.MENU.HELP }
                    ]
            }
            $rootScope.changeLayout = function (layout) {
                if (layout == 'l')
                {
                    $rootScope.layoutOption = 'list';
                }
                else if (layout == 'b')
                {
                    $rootScope.layoutOption = 'blocks';
                }
            }
        }]);


