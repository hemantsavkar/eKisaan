 
angular.module("ekisaan.services.mandirate", ['ekisaan_config']).
    service("mandirateService", ['$http', '$q', 'SERVICES', '$rootScope', function ($http, $q, SERVICES, $rootScope) {

        var serviceBase = SERVICES.BASE_URL;
        var langCode = $rootScope.settings.language.ID;
        var langId = $rootScope.settings.language.Code;

        return ({
            getmandirateList: getmandirateList,
            getStateList: getStateList,
            getMarketList: getMarketList,
            getItemHistoryDetails: getItemHistoryDetails,
            getfavList: getfavList,
            addtofavList: addtofavList,
            getItemSalesDetails: getItemSalesDetails,
            removeFromfavList: removeFromfavList

        });

        function getmandirateList(search) {
            var request = $http({
                method: "get",
                //url: "../localdata/search/result.json"
                //url: serviceBase + SERVICES.SEARCH_COMODITY + "/" + search.state.Id + "/" + search.market.Id + "/" + search.date
                url: serviceBase + "/StartSearch/" + search.state.Id + "/" + search.market.MarketId + "/" + search.date + "/" + langCode
            });
            return (request.then(function (response) { return response.data }));
        }
        function getStateList(date) {

            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_REPORTEDSTATE_URL + "/" + date + "/" + langCode
                //url: "http://reportmt.hemantsavkar.in/GetStatesByLanguage/1"
                //url: "../localdata/master/states.json"
            });
            return (request.then(function (response) { return response.data }));
        }
        function getMarketList(stateID,date) {
            var request = $http({
                method: "get",
                //url: serviceBase + SERVICES.GET_MARKETBYSTATE_URL + "/" + stateID
                url: serviceBase + '/GetDataRepotedMarkets/' + stateID + "/" + date + "/" + langCode
            });
            return (request.then(function (response) { return response.data }));
        }

        function getItemHistoryDetails(marketId,commodityId,varietyId) {
            var request = $http({
                method: "get",
                //url: serviceBase + SERVICES.COMODITY_HISTORY + stateId + "/" + commodityId + "/" + marketId
                url: serviceBase + "/GetCommoditySalesHistory/" + marketId + "/" + commodityId + "/" + varietyId
            });
            return (request.then(function (response) { return response.data }));
        }
        function getItemSalesDetails(stateId,marketId,date, commodityId, varietyId) {
            var request = $http({
                method: "get",
                //url: serviceBase + SERVICES.COMODITY_HISTORY + stateId + "/" + commodityId + "/" + marketId
                url: serviceBase + "/GetCommoditySalesData/" + stateId + "/" + marketId + "/" + date + "/" + commodityId + "/" + varietyId
            });
            return (request.then(function (response) { return response.data }));
        }

        function removemandirate(id) {
            var request = $http({
                method: "delete",
                url: "/api/mandirate/Deletemandirate",
                params: {
                    id: id
                },
                data: {
                    id: id
                }
            });

            return (request.then(function (response) { return response.data }));
        }

        function getfavList(identifier) {
            var request = $http({
                method: "get",
                //url: "../localdata/favouirtes/result.json"
                url: serviceBase + "/GetUserFavourites/" + identifier + "/" + langId
            });
            return (request.then(function (response) { return response.data }));
        }

        function addtofavList(data) {
            var request = $http({
                method: "POST",
                //url: "../localdata/favouirtes/result.json"
                url: serviceBase + "/AddUserFavourites/" + data.identifier + "/" + data.stateId + "/" + data.marketId + "/" + data.commodityId + "/" + data.commodityVarietyId + "/" + data.type
            });
            return (request.then(function (response) { return response.data }));
        }

        function removeFromfavList(data) {
            var request = $http({
                method: "POST",
                //url: "../localdata/favouirtes/result.json"
                url: serviceBase + "/RemoveUserFavourite/" + data.id
            });
            return (request.then(function (response) { return response.data }));
        }
        
       
    }]);
