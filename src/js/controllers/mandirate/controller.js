 
angular.module("ekisaan.controllers.mandirate", []).
    controller("mandirate",
        function ($scope, $rootScope, $q, $routeParams, $filter, mandirateService) {
            $scope.Title = "Rates";
            var me = this;
            $scope.landingmenu = {};
            $scope.selections = [];
            $scope.viewLoading = true;
            $scope.useSearch = true;
            $scope.Title = "Rates";
            $scope.from = 'rates';
            $rootScope.menus = [];
            $rootScope.options = {
                format: 'dd mmm, yyyy',
                formatSubmit: 'dd mmm, yyyy',
                today: 'Today',
                close: 'Close',
                onClose: function (e) {
                    // do something when the picker closes   
                },
                onStart: function (picker) {
                    if ($rootScope.date == undefined) {
                        var datetoAssign = new Date();
                        datetoAssign.setDate(datetoAssign.getDate() - 1)
                        $rootScope.date = $filter('date')(datetoAssign, 'dd MMM, yyyy');;
                        //this.set('select', [datetoAssign.getFullYear(), datetoAssign.getMonth(), datetoAssign.getDay()]);
                    }
                },
                onSet: function () {
                    $rootScope.date = $filter('date')(this.get(), 'dd MMM, yyyy');
                    if ($scope.search.state)
                        $scope.loadMarkets($scope.search.state);
                    loadRemoteData();
                }

            }
            $scope.loadMarkets = function (state) {
                $rootScope.selectedmarkets = [];
                $scope.loadingMarkets = true;
                $scope.viewLoading = true;
                var date = Date.parse($rootScope.date);
                date = $filter('date')(date, 'dd MMM yyyy');
                $scope.startSearchingOp = true;
                $rootScope.menus=[];
                $q.all([mandirateService.getMarketList(state.Id, date)])
               .then(function (response) {
                   $rootScope.selectedmarkets = response[0];
                   //if ($routeParams.from) {
                   //    setupStates();
                   //}
                   $scope.loadingMarkets = false;
                   $scope.viewLoading = false;
                    $scope.startSearchingOp = false;
               })
            }
            $scope.startSearch = function () {
                if ($scope.search.state && $scope.search.market) {
                    var date = Date.parse($rootScope.date);
                    $scope.search.date  = $filter('date')(date, 'dd MMM yyyy');
                    $scope.$rootScope = $scope.search.date;
                    $scope.startSearchingOp = true;
                    $q.all([mandirateService.getmandirateList($scope.search)])
                    .then(function (response) {
                        $scope.startSearchingOp = false;
                        if (response[0]) {
                            var menu = response[0].data;;
                            angular.forEach(menu, function (menuItem) {
                                menuItem.navigationToView = "categoryDetails?cat=" + menuItem.categoryId + "&Name=" + menuItem.category;
                                if (menuItem.metaData[0] != "")
                                    menuItem.image = "images/assets" + menuItem.metaData[0].image;
                                else
                                    menuItem.image = "images/assets/No_Image.png";// + menuItem.Category.category + "/" + menuItem.Category.metaData[0].image;

                                menuItem.title = menuItem.category;
                                menuItem.stateID = $scope.search.state.Id;
                                menuItem.marketID = $scope.search.market.MarketId;
                            });
                            $rootScope.menusScreen1 = menu;
                            $rootScope.menus = menu;
                            
                        }
                        else {
                            alert("No Data Found For Selected Criteria");
                        }
                    })
                }
                else {
                    alert("Please Select State & Market");
                }
            }
            $scope.confirmAddtoFav = function () {
                if ($scope.search.state && $scope.search.market) {
                    $scope.toggle('myOverlay', 'on');
                }
                else {
                    alert("Please Select State & Market");
                }
            }
            $scope.addtoFav = function () {
                // ($scope.search.state && $scope.search.market) {
                var data = {};
                data.identifier = "9860536907";
                data.stateId = $scope.search.state.Id;
                data.marketId = $scope.search.market.MarketId;
                data.commodityId = "-1";
                data.commodityVarietyId = "-1";
                data.type = "M";
                $q.all([mandirateService.addtofavList(data)])
                .then(function () {
                    $rootScope.favMenus = undefined;
                    alert("Added");
                })

                
            }
            $scope.canceled = function () {
            }
            $scope.removeFromFav = function () {
                // ($scope.search.state && $scope.search.market) {
                var data = {};
                data.id = $routeParams.RId
                $q.all([mandirateService.removeFromfavList(data)])
                .then(function () {
                    $rootScope.favMenus = undefined;
                    $scope.toggle('myRemoveOverlay', 'off');
                    alert("Removed");
                    //$location.path("/favourites");
                })
            }
            $scope.confirmRemoveFav = function () {
                $scope.toggle('myRemoveOverlay', 'on');
            }
            $scope.canceledemove = function () {
                $scope.toggle('myRemoveOverlay', 'off');
            }
          

            init();
           
            function init() {
                
                var frm = $routeParams.from;

                $scope.from = frm;

                if ($rootScope.states == undefined) {
                    $rootScope.states = [];
                    $rootScope.markets = [];
                    $rootScope.selectedmarkets = [];
                    $rootScope.search = {};

                    //var datetoAssign = new Date();
                    //datetoAssign.setDate(datetoAssign.getDate() - 1)
                    //$rootScope.search.date = datetoAssign;

                    $scope.viewLoading = true;
                    $scope.loadingStates = true;
                    loadRemoteData();
                
                }
                else {
                    if (frm == 'f') {

                        $scope.search.state = undefined;
                        $scope.search.market = undefined;
                        setupStates();
                    }
                    else {
                        if ($rootScope.menusScreen1)
                        {
                            $rootScope.menus = $rootScope.menusScreen1;
                        }
                        //$scope.search.state = undefined;
                        //$scope.search.market = undefined;
                    }
                }
                
         
            }
            function setupStates() {
                $scope.startSearchingOp = true;
                var marketId = $routeParams.marketID;

                var selectedState = $filter('filter')($rootScope.states, { Id: parseInt($routeParams.stateID) }, true);

                if (selectedState.length > 0)
                {
                    $scope.search.state = selectedState[0];

                    $scope.loadingMarkets = true;
                    $scope.startSearchingOp = true;
                    $rootScope.menus=[];
                    var date = Date.parse($rootScope.date);
                    date = $filter('date')(date, 'dd MMM yyyy');

                        $q.all([mandirateService.getMarketList($routeParams.stateID,date)])
                              .then(function (response) {
                                  $rootScope.selectedmarkets = response[0];
                                  var selectedMarket = $filter('filter')($rootScope.selectedmarkets, { MarketId: parseInt($routeParams.marketID) }, true);
                                  if (selectedMarket.length > 0) {
                                      $scope.search.market = selectedMarket[0];
                                  }
                                  else {
                                      $scope.search.market = undefined;
                                  }
                                  $scope.loadingMarkets = false;
                                  $scope.startSearchingOp = false;
                                  if ($scope.search.market != undefined)
                                      $scope.startSearch();
                                  else
                                      alert('No Data Reported By ' + $routeParams.marketName + ' On ' + date);
                              })
                    

                }
                else {
                    $scope.search.state = undefined;
                }



                //angular.forEach($rootScope.markets, function (market) {
                //    if (market.Id == marketId) {
                //        $scope.search.market = market;
                //        angular.forEach($rootScope.states, function (state) {
                //            if (state.Id == market.stateid) {
                //                $scope.search.state = state;
                //                $scope.loadMarkets($scope.search.state);
                //                $scope.startSearch();
                //            }
                //        })
                //    }
                //});





            }
            function loadRemoteData() {
                setTimeout(function () {
                    var date = Date.parse($rootScope.date);
                    date = $filter('date')(date, 'dd MMM yyyy');
                    $q.all([mandirateService.getStateList(date)])
                    .then(function (response) {
                        $rootScope.states = response[0];
                        if ($routeParams.from) {
                            setupStates();
                        }
                        $scope.loadingStates = false;
                        $scope.viewLoading = false;
                    })
                }, 500);
            }
            $scope.replacedMessage = function (orginal, add) {
                return orginal.replace("{0}", add);
            }
         
        })
.controller("mandirateDetailsCategory",
        function ($scope,$rootScope, $q, $routeParams, $filter, mandirateService) {
            $scope.Title = $routeParams.Name;
            var me = this;
            $scope.landingmenu = {};
            $scope.selections = [];
            $scope.viewLoading = true;
            $rootScope.comodities = [];
            
            var catId = $routeParams.cat;
            var varId = $routeParams.var;
            $scope.menus = [];
            var cmodoties=[];
            angular.forEach($rootScope.menus, function (resultRow) {
                if (resultRow.categoryId == catId)
                {
                    angular.forEach(resultRow.comodities, function (comodity) {
                        comodity.navigationToView = "itemDetails?itemId=" + comodity.id + "&Name=" + comodity.commodity + "&Cat=" + catId + "&Var=" + comodity.varietyid;
                        comodity.image = comodity.metaData[0].image!=null?( "images/assets/" + comodity.metaData[0].image):( "images/assets/No_Image.png");
                        comodity.title = comodity.commodity + "(" + comodity.variety + ")";
                        $scope.Title
                    });
                    cmodoties = resultRow.comodities;
                }
            })
            
            $scope.menus = cmodoties;
        })
.controller("itemRateDetails",
        function ($scope, $rootScope,$q, $routeParams, $filter,$location, mandirateService) {
            $scope.Title = $routeParams.Name;
            var me = this;
            $scope.landingmenu = {};
            $scope.selections = [];
            $scope.viewLoading = true;
            $rootScope.options = {
                format: 'dd mmm, yyyy',
                formatSubmit: 'dd mmm, yyyy',
                today: 'Today',
                close: 'Close',
                onClose: function (e) {
                    // do something when the picker closes   
                },
                onStart: function (picker) {
                    if ($rootScope.date == undefined) {
                        var datetoAssign = new Date();
                        datetoAssign.setDate(datetoAssign.getDate() - 1)
                        $rootScope.date = $filter('date')(datetoAssign, 'dd MMM, yyyy');;
                        //this.set('select', [datetoAssign.getFullYear(), datetoAssign.getMonth(), datetoAssign.getDay()]);
                    }
                },
                onSet: function () {
                    $rootScope.date = $filter('date')(this.get(), 'dd MMM, yyyy');
                    init();
                }

            }
            $scope.replacedMessage = function (orginal, add) {
                return orginal.replace("{0}", add);
            }
         
            var itemDetails = {};
            var id = $routeParams.itemId;
            var catId = $routeParams.Cat;
            var varId = $routeParams.Var;
          
            var from = $routeParams.from;

            var allMenus = [];
            var stateId, marketId;
            init();
            $scope.from = from;
            function init() {
                if (!from) {
                    allMenus = $rootScope.menus
                    angular.forEach($rootScope.menus, function (resultRow) {
                        if (resultRow.categoryId == catId) {
                            stateId = resultRow.stateID;
                            marketId = resultRow.marketID;
                            angular.forEach(resultRow.comodities, function (comodity) {
                                if (comodity.id == id && comodity.varietyid == varId) {
                                    itemDetails.id = id;
                                    itemDetails.name = comodity.commodity + " (" + comodity.variety + ")";
                                    itemDetails.image = comodity.metaData[0].image != null ? ("images/assets/" + comodity.metaData[0].image) : ("images/assets/No_Image.png");;
                                    itemDetails.max = comodity.maxPrice;
                                    itemDetails.min = comodity.minPrice;
                                    itemDetails.modal = comodity.modalPrice;
                                    itemDetails.totalArriaval = comodity.totalArrival;
                                    itemDetails.variety = comodity.variety;
                                    itemDetails.varietyId = comodity.varietyid;
                                    itemDetails.history = [];
                                    itemDetails.priceUnit = comodity.priceUnit;
                                    itemDetails.arrivalUnit = comodity.arrivalUnit;

                                    $scope.loadingStates = true;
                                    $q.all([mandirateService.getItemHistoryDetails(marketId, id, varId)])
                                        .then(function (response) {
                                            //itemDetails.unit = response[0].UnitofArrival;
                                            itemDetails.history = response[0]
                                            $scope.loadingStates = false;
                                        })
                                }
                            });
                        }
                    })
                }
                else {
                    angular.forEach($rootScope.favMenus, function (menuItem) {
                        if (menuItem.type == "C") {
                            angular.forEach(menuItem.items, function (commodity) {
                                if (commodity.commodity.CommodityId == id) {
                                    itemDetails.id = commodity.commodity.CommodityId;
                                    itemDetails.name = commodity.commodity.title;
                                    itemDetails.image = commodity.metaData[0].Image != null ? ("images/assets/" + commodity.commodity.Category + "/" + commodity.metaData[0].Image) : ("images/assets/No_Image.png");

                                    itemDetails.varietyId = commodity.commodity.COMMODITYVARIETYID;

                                    itemDetails.history = [];

                                    $scope.loadingStates = true;

                                    if ($rootScope.date == undefined) {
                                        var datetoAssign = new Date();
                                        datetoAssign.setDate(datetoAssign.getDate() - 1)
                                        $rootScope.date = $filter('date')(datetoAssign, 'dd MMM, yyyy');;
                                    }

                                    var date = Date.parse($rootScope.date);
                                    date = $filter('date')(date, 'dd MMM yyyy');

                                    $q.all([mandirateService.getItemSalesDetails(commodity.commodity.StateId, commodity.commodity.MarketId, date, commodity.commodity.CommodityId, commodity.commodity.COMMODITYVARIETYID), mandirateService.getItemHistoryDetails(commodity.commodity.MarketId, commodity.commodity.CommodityId, commodity.commodity.COMMODITYVARIETYID)])
                                        .then(function (response) {
                                            if (response[0] != "null") {
                                                itemDetails.name = response[0].COMMODITY;
                                                itemDetails.max = response[0].MAXPRICE;
                                                itemDetails.min = response[0].MINPRICE;
                                                itemDetails.modal = response[0].MODALPRICE;
                                                itemDetails.totalArriaval = response[0].ARRIVALS;
                                                itemDetails.variety = response[0].VARIETY;
                                                itemDetails.priceUnit = response[0].UNITOFPRICE;
                                                itemDetails.arrivalUnit = response[0].UNITOFARRIVAL;
                                                itemDetails.atState = response[0].STATENAME;
                                                itemDetails.atMarket = response[0].MARKET;
                                            } else {

                                                itemDetails.max = "NA";
                                                itemDetails.min = "NA";
                                                itemDetails.modal = "NA";
                                                itemDetails.totalArriaval = "NA";
                                                itemDetails.variety = "NA";
                                                itemDetails.priceUnit = "NA";
                                                itemDetails.arrivalUnit = "NA";
                                                itemDetails.atState = "NA";
                                                itemDetails.atMarket = "NA";
                                            }

                                            itemDetails.history = response[1]
                                            $scope.loadingStates = false;
                                        })
                                }
                            });
                        }
                    })
                }
                //$scope.itemDetails = itemDetails;
            }
            $scope.formatDate = function (date)
            {
                return Date(parseInt(date.substr(6)));
                //return date.substr(6).substring(0, 12);
            }
            $scope.itemDetails = itemDetails;

            $scope.confirmAddtoFav = function () {
                $scope.toggle('myOverlay', 'on');
            }
            $scope.confirmRemoveFav = function () {
                $scope.toggle('myRemoveOverlay', 'on');
            }
            $scope.shareData = function () {
                $scope.toggle('modalShare', 'on');
            }
            $scope.addtoFav = function () {
                // ($scope.search.state && $scope.search.market) {
                var data = {};
                data.identifier = "9860536907";
                data.stateId = $scope.search.state.Id;
                data.marketId = $scope.search.market.MarketId;
                data.commodityId = $scope.itemDetails.id;
                data.commodityVarietyId = $scope.itemDetails.varietyId;
                data.type = "C";
                $q.all([mandirateService.addtofavList(data)])
                .then(function () {
                    $rootScope.favMenus = undefined;
                    $scope.toggle('myOverlay', 'off');
                    alert("Added");
                })
            }
            $scope.removeFromFav = function () {
                // ($scope.search.state && $scope.search.market) {
                var data = {};
                data.id = $routeParams.RId
                $q.all([mandirateService.removeFromfavList(data)])
                .then(function () {
                    $rootScope.favMenus = undefined;
                    $scope.toggle('myRemoveOverlay', 'off');
                    //var remainedItems = [];
                    //angular.forEach($rootScope.favMenus, function (menuItem) {
                    //    if (menuItem.type == "C") {
                    //        angular.forEach(menuItem.items, function (commodity) {
                    //            if (commodity.commodity.CommodityId != id) {
                    //                remainedItems.push(commodity);
                    //            }
                    //        })
                    //    }
                    //});
                    alert("Removed");

                    $location.path("/favourites");
                })
            }

            $scope.canceledemove = function () {
                $scope.toggle('myRemoveOverlay', 'off');
            }
            $scope.canceled = function () {
            }
        })
.controller("favouritesHome",
    function ($scope,$rootScope, $q, $routeParams, $filter, mandirateService) {
        var me = this;
        $scope.landingmenu = {};
        $scope.selections = [];
        
        $scope.Title = $rootScope.language.FAVOURITES.TITLE;
        $scope.from = 'fav';

        if (!$rootScope.favMenus) {
            $scope.menus = [];
            $rootScope.favMenus = [];
            $scope.viewLoading = true;
            loadRemoteData();
        }
        else {
            $scope.menus = $rootScope.favMenus;
        }
    
        function loadRemoteData() {

            var identifier = "9860536907";
            $scope.viewLoading = true;
            $q.all([mandirateService.getfavList(identifier)])
                .then(function (response) {
                    var allfavCommodities = response[0].favCommodities;
                    var allfavStates = response[0].favStates;
                    var allfavMarkets = response[0].favMarkets;
                    var allFavs = [];

                    //angular.forEach(allfavCommodities, function (menuItem) {
                    //    //Format Data For Markets
                    //      ////Format Data For Comodities
                    //        menuItem.navigationToView = "allFavComodities";
                    //        menuItem.image = "../../../images/assets/" + menuItem.metaData[0].Image;
                    //        menuItem.title = menuItem.title;
                        
                    //    allFavs.push(menuItem)
                    //});

                    //angular.forEach(allfavMarkets, function (menuItem) {
                    //    //Format Data For Markets
                    //    if (menuItem.type == "M") {
                    //        menuItem.navigationToView = "allFavMarkets";
                    //        menuItem.image = "../../../images/assets/" + menuItem.metaData[0].Image;
                    //        menuItem.title = menuItem.title;
                    //    }
                    //    else if (menuItem.type == "C") {  ////Format Data For Comodities
                    //        menuItem.navigationToView = "allFavComodities";
                    //        menuItem.image = "../../../images/assets/" + menuItem.metaData[0].Image;
                    //        menuItem.title = menuItem.title;
                    //    }
                    //    allFavs.push(menuItem)
                    //});

                    var menuItem = {};
                    menuItem.type = "C";
                    menuItem.navigationToView = "allFavComodities";
                    menuItem.image = "images/assets/mandi_trans.png";
                    menuItem.title = $rootScope.language.FAVOURITES.TITLECOMMODITIES;
                    menuItem.items = [];
                    angular.forEach(allfavCommodities, function (childmenuItem) {
                        childmenuItem.image = "images/assets/" + childmenuItem.metaData[0].Image;
                        childmenuItem.title = childmenuItem.title;
                        menuItem.items.push(childmenuItem)
                    });

                    allFavs.push(menuItem);

                    menuItem = {};
                    menuItem.type = "M";
                    menuItem.navigationToView = "allFavMarkets";
                    menuItem.image = "images/assets/085.png";
                    menuItem.title = $rootScope.language.FAVOURITES.TITLEMARJETS;

                    menuItem.items = [];
                    angular.forEach(allfavMarkets, function (childmenuItem) {
                        childmenuItem.image = "images/assets/" + childmenuItem.metaData[0].Image;
                        childmenuItem.title = childmenuItem.title;
                        menuItem.items.push(childmenuItem)
                    });

                    allFavs.push(menuItem);

                    //menuItem = {};
                    //menuItem.type = "S";
                    //menuItem.navigationToView = "allFavMarkets";
                    //menuItem.image = "../../../images/assets/085.png";
                    //menuItem.title = "States";
                    //allFavs.push(menuItem);


                    $scope.menus = allFavs;
                    $rootScope.favMenus = allFavs;
                    $scope.loadingStates = false;
                    $scope.viewLoading = false;
                })
            }

            //$scope.menus = [
            //    { navigationToView: "allFavMarkets", image: "../../../images/assets/085.png", title: "Market" },
            //    { navigationToView: "allFavComodities", image: "../../../images/assets/mandi_trans.png", title: "Comodity" },
            //]
    })
.controller("favouirtesMarkets",
        function ($scope,$rootScope, $q, $routeParams, $filter, mandirateService) {
            $scope.Title = $rootScope.language.FAVOURITES.TITLEMARJETS;
            var me = this;
            $scope.menus = [];
            angular.forEach($rootScope.favMenus, function (menuItem) {
                if (menuItem.type == "M") {
                    angular.forEach(menuItem.items, function (market) {
                        $scope.menus.push({
                            navigationToView: "mandirates?from=f&marketID=" + market.market.MarketId + "&stateID=" + market.market.StateId + "&marketName=" + market.title + "&RId=" + market.market.Id,
                            image: market.metaData[0].Image != null ? ("images/assets/City/" + market.metaData[0].Image) : ("images/assets/Blank_Market.png"),
                            title: market.title
                        });
                    });
                }
            });
        })
.controller("favouirtesComodities",
        function ($scope, $rootScope,$q, $routeParams, $filter, mandirateService) {
            
            $scope.Title = $rootScope.language.FAVOURITES.TITLECOMMODITIES;
            var me = this;
            $scope.landingmenu = {};
            $scope.selections = [];
            $scope.viewLoading = true;
            $scope.menus = [];
                angular.forEach($rootScope.favMenus, function (menuItem) {
                    if (menuItem.type == "C") {
                        angular.forEach(menuItem.items, function (comodity) {
                            $scope.menus.push({
                                navigationToView: "itemDetails?from=f&itemId=" + comodity.commodity.CommodityId + "&Name=" + comodity.title + "&Cat=" + comodity.commodity.CategoryId + "&Var=" + comodity.commodity.COMMODITYVARIETYID + "&RId=" + comodity.commodity.Id,
                                image: comodity.metaData[0].Image!=null?("images/assets/" + comodity.commodity.Category + "/" + comodity.metaData[0].Image):("images/assets/No_Image.png"),
                                title: comodity.title
                            });
                            comodity.title = comodity.title;
                            comodity.image = comodity.metaData[0].Image != null ? ("images/assets/" + comodity.commodity.Category + "/" + comodity.metaData[0].Image) : ("images/assets/No_Image.png");
                        });
                    }
                });


        })