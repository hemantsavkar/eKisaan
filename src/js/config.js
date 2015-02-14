var ekisaan_config = angular.module('ekisaan_config', [])
    .constant('SERVICES', {
        BASE_URL: 'http://reportmt.hemantsavkar.in/',
        //BASE_URL: 'http://localhost:49773/',
        GET_STATE_URL: '/GetStatesByLanguage/',
        GET_REPORTEDSTATE_URL: '/GetDataReportedStates/',
        GET_MARKETBYSTATE_URL: '/GetMarketsByStateId/',
        SAVE_REGISTRATION: '/RegisterUser/',
        SEARCH_COMODITY: '/GetCommodityCollectionByDate/',
        COMODITY_HISTORY: '/GetCommodityHistory/',
        USER_IDENTIFIER: '9860536907',
        SAVE_SETTINGS: '/SavePrefrences/',
        GET_SETTINGS: '/GetPrefrences/',
        GET_ALLGRAPHS: '/GetAllGraphs',
        GET_TOTALSALE: '/GetCommoditySales/',
        GET_ALLCATEGOREIS: '/GetCommodityCategory',
        GET_COMMODITYBYCATEGOREIS: '/GetCommodityByCategory',
        GET_LISTEDYEARS: '/GetListedYears',
        GET_TOTALSALEYEARLY: '/GetCommodityYearlySales/',
        GET_COMMODITYVARIETY: '/GetVariertyByCommodity/',
        GET_COMMODITYTOTALSALEBYVARIETY: '/GetCommoditySalesByVariety/',
        GET_COMMODITYTOTALSALEBYVARIETYYEARLY: '/GetCommodityYearlySalesByVariety/',
        GET_COMMODITYTOTALSALEBYSTATE: '/GetCommoditySalesByState/',
        GET_COMMODITYTOTALSALEBYSTATEYEARLY: '/GetCommodityYearlySalesByState/',
        GET_COMMODITYTOTALSALEBYSTATEBYVARIETY: '/GetCommoditySalesByStateByVariety/',
        GET_COMMODITYTOTALSALEBYSTATEYEARLYBYVARIETY: '/GetCommodityYearlySalesByStateByVariety/',

        GET_TOTALARRIVAL: '/GetCommodityTotalArrivals/',
        GET_TOTALARRIVALYEARLY: '/GetCommodityYearlyTotalArrivals/',
        GET_COMMODITYTOTALARRIVALBYVARIETY: '/GetCommodityTotalArrivalsByVariety/',
        GET_COMMODITYTOTALARRIVALBYVARIETYYEARLY: '/GetCommodityYearlyTotalArrivalsByVariety/',
        GET_COMMODITYTOTALARRIVALEBYSTATE: '/GetCommodityTotalArrivalsByState/',
        GET_COMMODITYTOTALARRIVALEBYSTATEYEARLY: '/GetCommodityYearlyTotalArrivalsByState/',
        GET_COMMODITYTOTALARRIVALBYSTATE: '/GetCommodityTotalArrivalsByState/',
        GET_COMMODITYTOTALARRIVALBYSTATEYEARLY: '/GetCommodityTotalArrivalsByState/',

        GET_COMMODITYTOTALARRIVALBYSTATEBYVARIETY: '/GetCommodityTotalArrivalsByStateByVariety/',
        GET_COMMODITYTOTALARRIVALBYSTATEYEARLYBYVARIETY: '/GetCommodityYearlyTotalArrivalsByStateByVariety/'

    }
 );