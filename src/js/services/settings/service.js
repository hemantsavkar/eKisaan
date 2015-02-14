 
angular.module("ekisaan.services.settings", ['ekisaan_config']).
    service("settingsService", ['$http', '$q', 'SERVICES', 'localStorageService', function ($http, $q, SERVICES, localStorageService) {
        var serviceBase = SERVICES.BASE_URL;
        return ({
            getsettingsList: getsettingsList,
            savesettings: savesettings,
            saveDatainLocalStore: saveDatainLocalStore,
            getDataFromLocalStorage: getDataFromLocalStorage
        });
        function getsettingsList(identifier) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_SETTINGS + "/" + identifier,
            });
            return (request.then(function (response) { return response.data }));
        }
        function savesettings(settingsData) {
            var request = $http({
                method: "POST",
                url: serviceBase + SERVICES.SAVE_SETTINGS + settingsData.allowlocation + "/" + settingsData.language.Code + "/" + SERVICES.USER_IDENTIFIER,
                //data: settingsData
            });
            return (request.then(function (response) { return response.data }));
        }

        function saveDatainLocalStore(settingsData)
        {
            if (settingsData.language == undefined) {
                settingsData.language = { Name: 'English', ID: 'en' };
            }
            localStorageService.set('userDeviceSettings', { language: settingsData.language, allowLocation: settingsData.allowlocation });
        }
        function getDataFromLocalStorage()
        {
            var deviceDefaltSettings = {};
            var deviceSettings = localStorageService.get('userDeviceSettings');
            if (deviceSettings) {
                deviceDefaltSettings.language = deviceSettings.language;
                deviceDefaltSettings.allowlocation = deviceSettings.allowLocation;
            }
            return deviceDefaltSettings;

        }

    }]);
