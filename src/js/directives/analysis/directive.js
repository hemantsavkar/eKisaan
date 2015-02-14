 
angular.module("ekisaan.directives.analysis", []).

    directive('mobileno', function () {
       
    })
.directive("reportdataselection", ['$rootScope', '$q', 'analysisService','mandirateService', function ($rootScope, $q, analysisService,mandirateService) {
    return {
        restrict: 'AE',
        link: function ($scope, element, attrs) {
            $scope.hideFilters = false;
            $scope.disabledLoadButton = true;
            init();
            function init() {
                if ($rootScope.categories) {
                }
                else {
                    $rootScope.categories = [];
                    loadRemoteData();
                }
                if ($rootScope.states == undefined) {
                    loadStates();
                }
            }

            function loadStates() {
                $scope.loadingStates = true;
                $q.all([mandirateService.getStateList()])
              .then(function (response) {
                  $rootScope.states = response[0];
                  $scope.loadingStates = false;
              })
            }
            function loadRemoteData() {
                $scope.loadingCategories = true;
                $q.all([analysisService.getAllCategories(), analysisService.getListedYears()]).then(
                           function (response) {
                               $rootScope.categories = response[0];
                               $rootScope.years = response[1];
                               $scope.search.year = getYear();
                               $scope.loadingCategories = false;
                           });
            }
            function getYear() {
                var d = new Date();
                return d.getFullYear();
            }

            $scope.loadCommodities = function (category) {
                $scope.loadingCommodities = true;
                $q.all([analysisService.getCommodityByCategory(category.ID)]).then(
                       function (response) {
                           $scope.commodities = response[0];
                           $scope.loadingCommodities = false;
                       });
            }
            $scope.loadCommoditiesVarieties = function (commodity) {
                $scope.loadingCommoditiesVariety = true;
                $q.all([analysisService.getCommodityVariety(commodity.ID)]).then(
                       function (response) {
                           $scope.commodityVarieties = response[0];
                           $scope.loadingCommoditiesVariety = false;
                       });
            }

            $scope.changeMode = function (mode) {
                $scope.by = mode;
                    $scope.search.year = getYear();
            }
        },
        template: '<div class="col-xs-12" ng-hide="hideFilters">' +
            '<div class="col-xs-6   has-success has-feedback" >' +
                '<button ng-class="by==\'m\'?\'btn btn-danger btn-block\':\'btn btn-info btn-block\'" ng-click="changeMode(\'m\')">' +
                '<i class="fa fa-calendar fa-1x"></i>' +
                    ' Monthly' +
                    '</button>' +
            '</div>' +
            '<div class="col-xs-6  has-success has-feedback" style="margin-right:0px" >' +
                '<button ng-class="by==\'y\'?\'btn btn-danger btn-block\':\'btn btn-info btn-block\'" ng-click="changeMode(\'y\')">' +
                    '<i class="fa fa-calendar fa-1x"></i>' +
                    ' Yearly' +
                '</button>' +
            '</div>' +
            '<div class="col-xs-12 form-group  has-success has-feedback" style="margin-left: 10px; padding: 2px; margin-top: 2px; padding-right: 22px">' +
                '<div class="input-group margin-bottom-sm col-xs-12">' +
                    '<select ng-options="o.Name for o in categories" ng-model="search.category" style="line-height:15px" ng-change="loadCommodities(search.category)" class="form-control  input-sm text-right" data-rule-required="true" required focus>' +
                        '<option value="">--- Category ---</option>' +
                    '</select>' +
                    '<div class="btn input-group-addon" style="font-size: 15px" ng-show="loadingCategories">' +
                        '<i class="fa fa-spinner fa-spin fa-1x"></i>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="col-xs-12 form-group  has-success has-feedback" style="margin-top: 2px; margin-left: 10px; padding: 2px; padding-right: 22px">' +
                '<div class="input-group margin-bottom-sm col-xs-12">' +
                    '<select ng-options="o.Name for o in commodities" ng-model="search.commodity"  ng-change="showCommodityVariety?loadCommoditiesVarieties(search.commodity):return" style="line-height: 15px;" class="form-control  input-sm text-right" data-rule-required="true" required focus>' +
                        '<option value="">--- Commodity ---</option>' +
                    '</select>' +
                    '<div class="btn input-group-addon" style="font-size: 11px" ng-show="loadingCommodities">' +
                        '<i class="fa fa-spinner fa-spin fa-1x"></i>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="col-xs-12 form-group  has-success has-feedback" style="margin-top: 2px; margin-left: 10px; padding: 2px; padding-right: 22px" ng-show="showCommodityVariety">' +
                '<div class="input-group margin-bottom-sm col-xs-12">' +
                    '<select ng-options="o.Name for o in commodityVarieties" ng-model="search.commodityVariety" style="line-height: 15px;" class="form-control  input-sm text-right" data-rule-required="true" required focus>' +
                        '<option value="">--- Commodity Variety---</option>' +
                    '</select>' +
                    '<div class="btn input-group-addon" style="font-size: 11px" ng-show="loadingCommoditiesVariety">' +
                        '<i class="fa fa-spinner fa-spin fa-1x"></i>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="col-xs-12 form-group  has-success has-feedback" style="margin-top: 2px; margin-left: 10px; padding: 2px; padding-right: 22px"  ng-show="showStateSelection">' +
                '<div class="input-group margin-bottom-sm col-xs-12">' +
                    '<select ng-options="o.Name for o in states" ng-model="search.state" style="line-height: 15px;" class="form-control  input-sm text-right" data-rule-required="true" required focus>' +
                        '<option value="">--- State ---</option>' +
                    '</select>' +
                    '<div class="btn input-group-addon" style="font-size: 11px" ng-show="loadingStates">' +
                        '<i class="fa fa-spinner fa-spin fa-1x"></i>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="col-xs-6 has-success has-feedback" style="margin-top:2px" ng-hide="by==\'y\'">' +
                '<select ng-options="o for o in years" ng-model="search.year" style="line-height:15px" class="form-control  input-sm text-right" data-rule-required="true" required focus>' +
                    '<option value="">--- Year ---</option>' +
                '</select>' +
            '</div>' +
            '<div ng-class="{\'col-xs-6  has-success has-feedback\': by==\'m\', \'col-xs-12  has-success has-feedback\': by==\'y\'}" class="col-xs-6  has-success has-feedback" style="margin-top:2px">' +
                '<button class="btn btn-info btn-block" ng-click="hideFilters=!hideFilters;loadGraphData();" ng-disabled="disabledLoadButton">' +
                    '<i class="fa fa-bar-chart fa-1x"></i>' +
                   ' Load Graph' +
                '</button>' +
            '</div>' +
        '</div>' +
        '<div class="col-xs-5 form-group  has-success has-feedback pull-right" style="margin-top: 2px; margin-left: 10px;margin-right:5px; padding: 2px">' +
                '<button class="btn btn-primary btn-block" ng-hide="!hideFilters" ng-click="hideFilters=!hideFilters">' +
                    '<i class="fa fa-filter fa-1x"></i>' +
                    '&nbsp; Change Filters' +
                '</button>' +
            '</div>'
    }
}])

