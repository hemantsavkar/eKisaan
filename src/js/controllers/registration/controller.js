 
angular.module("ekisaan.controllers.registration", []).
    controller("registration",
        function ($scope, $rootScope, $q, $routeParams, $filter, registrationService, mandirateService) {
            $scope.Title = $rootScope.language.REGISTER.TITLE;
            var me = this;
            $scope.registration = {};

            $scope.register = function (registration) {
                if (registration.StateId) {
                    //registration.UserType = "C";
                    //registration.StateId = "" + registration.StateId.Id + "";
                    //registration.MobileNo = "" + registration.MobileNo + "";
                    //registration.CityName = "1";
                    //registration.CityPin = "";
                    //registration.DistrictName = "";
                    //registration.LId = "0";
                    //registration.Id = "0";

                    $scope.viewLoading = true;
                    $q.all([registrationService.saveregistration(registration)])
                       .then(function (response) {
                           if (response[0]=='1')
                           {
                               $scope.toggle('myOverlay', 'on');
                               $scope.registration = {};
                           }
                           else if (response[0] == '-2') {
                               alert("Registration Already Exist For Mobile No " + registration.MobileNo);
                           }
                           $scope.viewLoading = false;
                       })
                }
                else {

                    alert("Select State");
                }
            };

           init();
            function init() {

                var frm = $routeParams.from;

                if ($rootScope.states == undefined) {
                    loadRemoteData();
                }
                function loadRemoteData() {
                    $q.all([mandirateService.getStateList()])
               .then(function (response) {
                   $rootScope.states = response[0];
                   if ($routeParams.from) {
                       setupStates();
                   }
                   $scope.loadingStates = false;
                   $scope.viewLoading = false;
               })
                }

            }


        });


