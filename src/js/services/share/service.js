 
angular.module("ekisaan.services.share", []).
    service("shareService", function ($http,$q) {

        return ({
            getshareList: getshareList,
            saveshare: saveshare
        });
        function getshareList() {
            var request = $http({
                method: "get",
                url: "/api/share"
            });
            return (request.then(function (response) { return response.data }));
        }
        function saveshare(shareData) {
            var request = $http({
                method: shareData.ID == undefined ? "post" : "put",
                url: "/api/share",
                data: shareData
            });
            return (request.then(function (response) { return response.data }));
        }
    });
