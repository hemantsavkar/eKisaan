 
angular.module("ekisaan.services.analysis", ['ekisaan_config']).
    service("analysisService", ['$http', '$q', 'SERVICES', function ($http, $q, SERVICES) {
        var serviceBase = SERVICES.BASE_URL;
        return ({
            getAllGraphs: getAllGraphs,
            getCommodityVariety: getCommodityVariety,
            getAllCategories: getAllCategories,
            getCommodityByCategory: getCommodityByCategory,
            getListedYears: getListedYears,
            
            getCommodityTotalSale: getCommodityTotalSale,
            getCommodityTotalYearlySale: getCommodityTotalYearlySale,

            getCommodityTotalSaleByVariety: getCommodityTotalSaleByVariety,
            getCommodityTotalYearlySaleByVariety: getCommodityTotalYearlySaleByVariety,

            getCommodityTotalSaleByState: getCommodityTotalSaleByState,
            getCommodityTotalYearlySaleByState: getCommodityTotalYearlySaleByState,

            getCommodityTotalSaleByStateByVariety: getCommodityTotalSaleByStateByVariety,
            getCommodityTotalYearlySaleByStateByVariety: getCommodityTotalYearlySaleByStateByVariety,


            //For Total Arrivals

            getCommodityTotalArrivals: getCommodityTotalArrivals,
            getCommodityTotalYearlyArrivals: getCommodityTotalYearlyArrivals,

            getCommodityTotalArrivalsByVariety: getCommodityTotalArrivalsByVariety,
            getCommodityTotalYearlyArrivalsByVariety: getCommodityTotalYearlyArrivalsByVariety,

            getCommodityTotalArrivalsByState: getCommodityTotalArrivalsByState,
            getCommodityTotalYearlyArrivalsByState: getCommodityTotalYearlyArrivalsByState,

            getCommodityTotalArrivalsByStateByVariety: getCommodityTotalArrivalsByStateByVariety,
            getCommodityTotalYearlyArrivalsByStateByVariety: getCommodityTotalYearlyArrivalsByStateByVariety

        });

        function getAllGraphs() {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_ALLGRAPHS
            });
            return (request.then(function (response) { return response.data }));
        }

        function getCommodityTotalSale(forYear, forCommodity) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_TOTALSALE + "/" + forYear + "/" + forCommodity
            });
            return (request.then(function (response) { return response.data }));
        }
        function getCommodityTotalYearlySale(forCommodity) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_TOTALSALEYEARLY + "/" + forCommodity
            });
            return (request.then(function (response) { return response.data }));
        }
        function getCommodityTotalSaleByState(forYear, forCommodity,forState) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_COMMODITYTOTALSALEBYSTATE + "/" + forYear + "/" + forCommodity + "/" + forState
            });
            return (request.then(function (response) { return response.data }));
        }
        function getCommodityTotalYearlySaleByState(forCommodity, forState) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_COMMODITYTOTALSALEBYSTATEYEARLY + "/" + forCommodity + "/" + forState
            });
            return (request.then(function (response) { return response.data }));
        }
        function getCommodityTotalSaleByStateByVariety(forYear, forCommodity, forState, forVariety) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_COMMODITYTOTALSALEBYSTATEBYVARIETY + "/" + forYear + "/" + forCommodity + "/" + forState + "/" + forVariety
            });
            return (request.then(function (response) { return response.data }));
        }
        function getCommodityTotalYearlySaleByStateByVariety(forCommodity, forState, forVariety) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_COMMODITYTOTALSALEBYSTATEYEARLYBYVARIETY + "/" + forCommodity + "/" + forState + "/" + forVariety
            });
            return (request.then(function (response) { return response.data }));
        }
        function getCommodityTotalSaleByVariety(forYear, forCommodity, forVariety) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_COMMODITYTOTALSALEBYVARIETY + "/" + forYear + "/" + forCommodity + "/" + forVariety
            });
            return (request.then(function (response) { return response.data }));
        }
        function getCommodityTotalYearlySaleByVariety(forCommodity, forVariety) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_COMMODITYTOTALSALEBYVARIETYYEARLY + "/" + forCommodity + "/" + forVariety
            });
            return (request.then(function (response) { return response.data }));
        }

        //For Arrivals

        function getCommodityTotalArrivals(forYear, forCommodity) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_TOTALARRIVAL + "/" + forYear + "/" + forCommodity
            });
            return (request.then(function (response) { return response.data }));
        }
        function getCommodityTotalYearlyArrivals(forCommodity) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_TOTALARRIVALYEARLY + "/" + forCommodity
            });
            return (request.then(function (response) { return response.data }));
        }
        function getCommodityTotalArrivalsByState(forYear, forCommodity, forState) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_COMMODITYTOTALARRIVALBYSTATE + "/" + forYear + "/" + forCommodity + "/" + forState
            });
            return (request.then(function (response) { return response.data }));
        }
        function getCommodityTotalYearlyArrivalsByState(forCommodity, forState) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_COMMODITYTOTALARRIVALBYSTATEYEARLY + "/" + forCommodity + "/" + forState
            });
            return (request.then(function (response) { return response.data }));
        }
        function getCommodityTotalArrivalsByStateByVariety(forYear, forCommodity, forState, forVariety) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_COMMODITYTOTALARRIVALBYSTATEBYVARIETY + "/" + forYear + "/" + forCommodity + "/" + forState + "/" + forVariety
            });
            return (request.then(function (response) { return response.data }));
        }
        function getCommodityTotalYearlyArrivalsByStateByVariety(forCommodity, forState, forVariety) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_COMMODITYTOTALARRIVALBYSTATEYEARLYBYVARIETY + "/" + forCommodity + "/" + forState + "/" + forVariety
            });
            return (request.then(function (response) { return response.data }));
        }
        function getCommodityTotalArrivalsByVariety(forYear, forCommodity, forVariety) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_COMMODITYTOTALARRIVALBYVARIETY + "/" + forYear + "/" + forCommodity + "/" + forVariety
            });
            return (request.then(function (response) { return response.data }));
        }
        function getCommodityTotalYearlyArrivalsByVariety(forCommodity, forVariety) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_COMMODITYTOTALARRIVALBYVARIETYYEARLY + "/" + forCommodity + "/" + forVariety
            });
            return (request.then(function (response) { return response.data }));
        }



        function getAllCategories() {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_ALLCATEGOREIS
            });
            return (request.then(function (response) { return response.data }));
        }
        function getListedYears() {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_LISTEDYEARS
            });
            return (request.then(function (response) { return response.data }));
        }
        function getCommodityByCategory(category) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_COMMODITYBYCATEGOREIS + "/" + category
            });
            return (request.then(function (response) { return response.data }));
        }
        function getCommodityVariety(commodityID) {
            var request = $http({
                method: "get",
                url: serviceBase + SERVICES.GET_COMMODITYVARIETY + "/" + commodityID
            });
            return (request.then(function (response) { return response.data }));
        }




    }]);
