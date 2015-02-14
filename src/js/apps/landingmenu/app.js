 
angular.module("ekisaan.landingmenu", [
    'ekisaan.controllers.landingmenu',
    'ekisaan.directives.landingmenu',
    'ekisaan.filters.landingmenu',
    'ekisaan.services.landingmenu',
    'djds4rce.angular-socialshare',
    'ekisaan_config',
    'ekisaan_languages'
]).config(['$routeProvider',

			 function ($routeProvider) {
			     $routeProvider
                    .when('/landingmenus', {
                        templateUrl: 'landingmenu/alllandingmenus.html',
                        controller: 'landingmenu'
                    })
			 }
])
.run(['$rootScope', '$FB', '$q', '$filter', 'settingsService', 'SERVICES', 'Languages','localStorageService', function ($rootScope, $FB, $q, $filter, settingsService, SERVICES, Languages,localStorageService) {
    $rootScope.languges = [
           { Name: 'English', ID: 'en', Code: 1 },
           { Name: 'हिंदी', ID: 'hi', Code: 2 },
           { Name: 'मराठी', ID: 'mr', Code: 3 },
           { Name: 'ગુજરાતી', ID: 'gu', Code: 4 },
           { Name: 'தமிழ்', ID: 'ta', Code: 5 },
           { Name: 'తెలుగు', ID: 'te', Code: 6 },
           { Name: 'ಕನ್ನಡ', ID: 'kn', Code: 7 },
           { Name: 'বাঙালি', ID: 'bn', Code: 8 },
           { Name: 'اردو', ID: 'ur', Code: 9 }
    ];
    $FB.init('745654258822969');
    //$rootScope.settings = settingsService.getDataFromLocalStorage();

    function saveDatainLocalStore(settingsData) {
        if (settingsData.language == undefined) {
            settingsData.language = { Name: 'English', ID: 'en', Code: 1 };
        }
        localStorageService.set('userDeviceSettings', { language: settingsData.language, allowLocation: settingsData.allowlocation });
    }
    function getDataFromLocalStorage() {
        var deviceDefaltSettings = {};
        var deviceSettings = localStorageService.get('userDeviceSettings');
        if (deviceSettings) {
            deviceDefaltSettings.language = deviceSettings.language;
            deviceDefaltSettings.allowlocation = deviceSettings.allowLocation;
        }
        return deviceDefaltSettings;
    }
    
    var localData = getDataFromLocalStorage();
    if (localData.language) {
        $rootScope.settings = {};
        var selectLanguage = $filter('filter')($rootScope.languges, { Code: localData.language.Code }, true);
        if (selectLanguage != undefined) {
            if (selectLanguage[0].ID == 'mr') {
                $rootScope.language = Languages.marathi;
            } else {
                $rootScope.language = Languages.english;
            }
            $rootScope.settings.language = selectLanguage[0];
            $rootScope.settings.allowlocation = localData.allowLocation;
        }
    }

    if (!$rootScope.language) {
        $q.all([settingsService.getsettingsList(SERVICES.USER_IDENTIFIER)])
                      .then(function (response) {
                          $rootScope.settings = {};
                          var selectLanguage = $filter('filter')($rootScope.languges, { Code: response[0].Language }, true);
                          if (selectLanguage != undefined) {
                              if (selectLanguage[0].ID == 'mr') {
                                  $rootScope.language = Languages.marathi;
                              } else {
                                  $rootScope.language = Languages.english;
                              }
                              $rootScope.$broadcast('languageChanged', $rootScope.language);
                              $rootScope.settings.language = selectLanguage[0];
                              $rootScope.settings.allowlocation = response[0].AllowLocation;
                              saveDatainLocalStore($rootScope.settings);
                          }
                      })
    }
}]);