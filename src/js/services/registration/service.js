 
angular.module("ekisaan.services.registration", ['ekisaan_config']).
    service("registrationService", ['$http', '$q', 'SERVICES', function ($http, $q, SERVICES) {
        var serviceBase = SERVICES.BASE_URL;
        return ({
            getregistrationList: getregistrationList,
            saveregistration: saveregistration
        });
        function getregistrationList() {
            var request = $http({
                method: "get",
                url: "/api/registration"
            });
            return (request.then(function (response) { return response.data }));
        }
        function saveregistration(registrationData) {
            var request = $http({
                method: registrationData.ID == undefined ? "post" : "put",
                url: "http://reportmt.hemantsavkar.in/Register/" + registrationData.FirstName + '/' + registrationData.LastName + '/' + registrationData.MobileNo + '/' + registrationData.CityName + '/' + registrationData.DistrictName + '/' + registrationData.StateId.Id
                //url:serviceBase + SERVICES.SAVE_REGISTRATION +"/0",
                //data: registrationData
            });
            return (request.then(function (response) { return response.data }));
        }
    }]);
