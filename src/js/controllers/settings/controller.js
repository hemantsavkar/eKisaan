 
angular.module("ekisaan.controllers.settings", []).
    controller("settings",
        function ($scope, $rootScope, $q, $routeParams, $filter, settingsService) {
            $scope.Title = $rootScope.language.SETTINGS.TITLE;
            var me = this;
            //$rootScope.languges = [
            //    { Name: 'English', ID: 'en',Code:1 },
            //    { Name: 'हिंदी', ID: 'hi', Code: 2 },
            //    { Name: 'मराठी', ID: 'mr', Code: 3 },
            //    { Name: 'ગુજરાતી', ID: 'gu', Code: 4 },
            //    { Name: 'தமிழ்', ID: 'ta', Code: 5},
            //    { Name: 'తెలుగు', ID: 'te', Code: 6 },
            //    { Name: 'ಕನ್ನಡ', ID: 'kn', Code: 7},
            //    { Name: 'বাঙালি', ID: 'bn', Code: 8 },
            //    { Name: 'اردو', ID: 'ur', Code: 9 }
            //];
            

            if ($rootScope.settings.language != undefined) {
                var selectLanguage = $filter('filter')($scope.languges, { ID: $rootScope.settings.language.ID }, true);
                if (selectLanguage != undefined)
                {
                    $rootScope.settings.language = selectLanguage[0];
                }

            }
            
            //$scope.settings = settingsService.getDataFromLocalStorage();

            $scope.saveSettings = function (settings) {

                settingsService.saveDatainLocalStore(settings);
                $scope.viewLoading = true;
                $q.all([settingsService.savesettings(settings)])
                   .then(function (response) {
                       alert("Updated");
                   })
            };

           // init();
            function init() {
                var frm = $routeParams.from;

            }




        });


