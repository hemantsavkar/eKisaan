 
angular.module("ekisaan.services.landingmenu", []).
    service("landingmenuService", function ($http,$q) {

        return ({
            getLandingMenuList: getLandingMenuList,
            saveLandingMenu: saveLandingMenu,
            removeLandingMenu: removeLandingMenu,
            getLandingMenuDetails: getLandingMenuDetails,
            getLookupData: getLookupData
        });
      
        function getLandingMenuList() {
            var request = $http({
                method: "get",
                url: "/api/landingmenu"
            });
            return (request.then(function (response) { return response.data }));
        }

        function saveLandingMenu(landingmenuData) {
            var request = $http({
                method: landingmenuData.ID == undefined ? "post" : "put",
                url: "/api/landingmenu",
                data: landingmenuData
            });
            return (request.then(function (response) { return response.data }));
        }
        function removeLandingMenu(id) {
            var request = $http({
                method: "delete",
                url: "/api/landingmenu/DeleteLandingMenu",
                params: {
                    id: id
                },
                data: {
                    id: id
                }
            });

            return (request.then(function (response) { return response.data }));
        }

        function getLandingMenuDetails(id) {

        }

        function getLookupData(lookupType) {
            var request = $http({
                method: "get",
                url: "/api/Lookup/GetLookupData?lookupType=" + lookupType
            });
            return (request.then(function (response) { return response.data }));

        }

    });
