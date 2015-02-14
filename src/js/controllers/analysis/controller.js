 
angular.module("ekisaan.controllers.analysis", []).
    controller("analysis",
        function ($scope, $rootScope, $q, $routeParams, $filter, analysisService, mandirateService) {
            $scope.Title = $rootScope.language.ANALYSYS.TITLE;
            var me = this;
            $scope.analysis = {};

            $scope.register = function (analysis) {
                alert(analysis.cell)
            };

            init();
            function init() {
                var frm = $routeParams.from;
                if ($rootScope.GroupCollection) {
                }
                else {
                    $rootScope.GroupCollection = [];
                    loadRemoteData();
                }
            }

            function loadRemoteData() {
                $scope.viewLoading = true;
                $q.all([analysisService.getAllGraphs()]).then(
                        function (response) {
                            $rootScope.GroupCollection = response[0];
                            $scope.viewLoading = false;
                        }
                    )
            }

            $scope.LoadGraph = function (code) {
                $scope.ShowGraphTotalSales_Flag = false;
                if (code == 1) {
                    ShowGraphTotalSales();
                }
            }

            function ShowGraphTotalSales() {
                $scope.ShowGraphTotalSales_Flag = true;
            }

            $scope.data = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                      label: 'My First dataset',
                      fillColor: 'rgba(244,67,54,1)',
                      strokeColor: 'rgba(220,220,220,0.8)',
                      highlightFill: 'rgba(220,220,220,0.75)',
                      highlightStroke: 'rgba(220,220,220,1)',
                      data: [65, 59, 80, 81, 56, 55, 40]
                  },
                  {
                      label: 'My Second dataset',
                      fillColor: 'rgba(156,39,176,0.5)',
                      strokeColor: 'rgba(151,187,205,0.8)',
                      highlightFill: 'rgba(151,187,205,0.75)',
                      highlightStroke: 'rgba(151,187,205,1)',
                      data: [28, 48, 40, 19, 86, 27, 90]
                  },
                  {
                      label: 'My Thirf dataset',
                      fillColor: 'rgba(63,81,181,0.5)',
                      strokeColor: 'rgba(151,187,205,0.8)',
                      highlightFill: 'rgba(232,187,205,0.75)',
                      highlightStroke: 'rgba(112,187,205,1)',
                      data: [111, 33, 23, 34, 67, 24, 67]
                  }
                ]
            };
            $scope.piedata = [
                                  {
                                      value: 300,
                                      color: '#F7464A',
                                      highlight: '#FF5A5E',
                                      label: 'Red'
                                  },
                                  {
                                      value: 50,
                                      color: '#46BFBD',
                                      highlight: '#5AD3D1',
                                      label: 'Green'
                                  },
                                  {
                                      value: 100,
                                      color: '#FDB45C',
                                      highlight: '#FFC870',
                                      label: 'Yellow'
                                  }
            ];

            $scope.options = {

                // Sets the chart to be responsive
                responsive: true,

                //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
                scaleBeginAtZero: true,

                //Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: true,
                scaleFontColor: "#FFFFF",

                //String - Colour of the grid

                scaleGridLineColor: "rgba(0,0,0,1)",

                //Number - Width of the grid lines
                scaleGridLineWidth: 1,

                //Boolean - If there is a stroke on each bar
                barShowStroke: true,

                //Number - Pixel width of the bar stroke
                barStrokeWidth: 2,

                //Number - Spacing between each of the X value sets
                barValueSpacing: 5,

                //Number - Spacing between data sets within X values
                barDatasetSpacing: 1,

                //String - A legend template
                legendTemplate: '&lt;ul class="tc-chart-js-legend"&gt;&lt;% for (var i=0; i&lt;datasets.length; i++){%&gt;&lt;li&gt;&lt;span style="background-color:&lt;%=datasets[i].fillColor%&gt;"&gt;&lt;/span&gt;&lt;%if(datasets[i].label){%&gt;&lt;%=datasets[i].label%&gt;&lt;%}%&gt;&lt;/li&gt;&lt;%}%&gt;&lt;/ul&gt;'
            };

        })

.controller("totalSales",
function ($scope, $rootScope, $q, $routeParams, $filter, analysisService) {
    $scope.Title = "Total Commodity Sale";
    var me = this;
    $scope.by = 'm';
    $scope.search = {};

    $scope.$watch('search.year', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity)
    });

    $scope.$watch('search.commodity', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity)
    });

    $scope.loadGraphData = function () {
        $scope.viewLoading = true;
        $scope.data = {
            labels: [],
            datasets: [
              {
                  label: 'Amount in INR Crores',
                  fillColor: 'rgba(244,67,54,1)',
                  strokeColor: 'rgba(220,220,220,0.8)',
                  highlightFill: 'rgba(220,220,220,0.75)',
                  highlightStroke: 'rgba(220,220,220,1)',
                  data: []
              }
            ]
        };
        $q.all([$scope.by == 'm' ? analysisService.getCommodityTotalSale($scope.search.year, $scope.search.commodity.ID) : analysisService.getCommodityTotalYearlySale($scope.search.commodity.ID)]).then(
                function (response) {
                    totalSales = response[0];
                    if (totalSales.length > 0) {
                        angular.forEach(totalSales, function (sale) {
                            $scope.data.labels.push(sale.MonthName);
                            $scope.data.datasets[0].data.push(sale.TotalSales)
                        });
                    }
                    $scope.viewLoading = false;
                }
            )
    }

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - If there is a stroke on each bar
        barShowStroke: true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing: 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing: 1,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };


})

.controller("totalSalesByVariety",
function ($scope, $rootScope, $q, $routeParams, $filter, analysisService) {
    $scope.Title = "Total Sale By Variety";
    var me = this;
    $scope.by = 'm';
    $scope.search = {};
    $scope.showCommodityVariety = true;

    $scope.$watch('search.year', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.commodityVariety);
    });

    $scope.$watch('search.commodity', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.commodityVariety);
    });

    $scope.$watch('search.commodityVariety', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.commodityVariety);
    });

    $scope.loadGraphData = function () {
        $scope.viewLoading = true;
        //$scope.hideFilters = true;
        $scope.data = {
            labels: [],
            datasets: [
              {
                  label: 'Amount in INR Crores',
                  fillColor: 'rgba(244,67,54,1)',
                  strokeColor: 'rgba(220,220,220,0.8)',
                  highlightFill: 'rgba(220,220,220,0.75)',
                  highlightStroke: 'rgba(220,220,220,1)',
                  data: []
              }
            ]
        };
        $q.all([$scope.by == 'm' ? analysisService.getCommodityTotalSaleByVariety($scope.search.year, $scope.search.commodity.ID, $scope.search.commodityVariety.ID) : analysisService.getCommodityTotalYearlySaleByVariety($scope.search.commodity.ID, $scope.search.commodityVariety.ID)]).then(
                function (response) {
                    totalSales = response[0];
                    if (totalSales.length > 0) {
                        angular.forEach(totalSales, function (sale) {
                            $scope.data.labels.push(sale.MonthName);
                            $scope.data.datasets[0].data.push(sale.TotalSales)
                        });
                    }
                    $scope.viewLoading = false;
                }
            )
    }

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - If there is a stroke on each bar
        barShowStroke: true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing: 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing: 1,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };


})

.controller("totalSalesByCommodityByState",
function ($scope, $rootScope, $q, $routeParams, $filter, analysisService) {
    $scope.Title = "Total Commodity Sale By State";
    var me = this;
    $scope.by = 'm';
    $scope.search = {};
    $scope.showStateSelection = true;
    $scope.$watch('search.year', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.state)
    });

    $scope.$watch('search.commodity', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.state)
    });
    $scope.$watch('search.state', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.state)
    });

    $scope.loadGraphData = function () {
        $scope.viewLoading = true;
        $scope.data = {
            labels: [],
            datasets: [
              {
                  label: 'Amount in INR Crores',
                  fillColor: 'rgba(244,67,54,1)',
                  strokeColor: 'rgba(220,220,220,0.8)',
                  highlightFill: 'rgba(220,220,220,0.75)',
                  highlightStroke: 'rgba(220,220,220,1)',
                  data: []
              }
            ]
        };
        $q.all([$scope.by == 'm' ? analysisService.getCommodityTotalSaleByState($scope.search.year, $scope.search.commodity.ID, $scope.search.state.Id) : analysisService.getCommodityTotalYearlySaleByState($scope.search.commodity.ID, $scope.search.state.Id)]).then(
                function (response) {
                    totalSales = response[0];
                    if (totalSales.length > 0) {
                        angular.forEach(totalSales, function (sale) {
                            $scope.data.labels.push(sale.MonthName);
                            $scope.data.datasets[0].data.push(sale.TotalSales)
                        });
                    }
                    $scope.viewLoading = false;
                }
            )
    }

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - If there is a stroke on each bar
        barShowStroke: true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing: 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing: 1,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };


})

.controller("totalSalesByCommodityByStateByVariety",
function ($scope, $rootScope, $q, $routeParams, $filter, analysisService) {
    $scope.Title = "Total Sale By Variety By State";
    var me = this;
    $scope.by = 'm';
    $scope.search = {};
    $scope.showCommodityVariety = true;
    $scope.showStateSelection = true;


    $scope.$watch('search.commodity', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.commodityVariety && $scope.search.state);
    });

    $scope.$watch('search.commodityVariety', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.commodityVariety && $scope.search.state);
    });
    $scope.$watch('search.state', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.commodityVariety && $scope.search.state);
    });

    $scope.loadGraphData = function () {
        $scope.viewLoading = true;
        //$scope.hideFilters = true;
        $scope.data = {
            labels: [],
            datasets: [
              {
                  label: 'Amount in INR Crores',
                  fillColor: 'rgba(244,67,54,1)',
                  strokeColor: 'rgba(220,220,220,0.8)',
                  highlightFill: 'rgba(220,220,220,0.75)',
                  highlightStroke: 'rgba(220,220,220,1)',
                  data: []
              }
            ]
        };
        $q.all([$scope.by == 'm' ? analysisService.getCommodityTotalSaleByStateByVariety($scope.search.year, $scope.search.commodity.ID, $scope.search.state.Id, $scope.search.commodityVariety.ID) : analysisService.getCommodityTotalYearlySaleByStateByVariety($scope.search.commodity.ID, $scope.search.state.Id, $scope.search.commodityVariety.ID)]).then(
                function (response) {
                    totalSales = response[0];
                    if (totalSales.length > 0) {
                        angular.forEach(totalSales, function (sale) {
                            $scope.data.labels.push(sale.MonthName);
                            $scope.data.datasets[0].data.push(sale.TotalSales)
                        });
                    }
                    $scope.viewLoading = false;
                }
            )
    }

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - If there is a stroke on each bar
        barShowStroke: true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing: 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing: 1,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };


})


.controller("totalArrivals",
function ($scope, $rootScope, $q, $routeParams, $filter, analysisService) {
    $scope.Title = "Total Commodity Arrival";
    var me = this;
    $scope.by = 'm';
    $scope.search = {};

    $scope.$watch('search.year', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity)
    });

    $scope.$watch('search.commodity', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity)
    });

    $scope.loadGraphData = function () {
        $scope.viewLoading = true;
        $scope.data = {
            labels: [],
            datasets: [
              {
                  label: '',
                  fillColor: 'rgba(244,67,54,1)',
                  strokeColor: 'rgba(220,220,220,0.8)',
                  highlightFill: 'rgba(220,220,220,0.75)',
                  highlightStroke: 'rgba(220,220,220,1)',
                  data: []
              }
            ]
        };
        $q.all([$scope.by == 'm' ? analysisService.getCommodityTotalArrivals($scope.search.year, $scope.search.commodity.ID) : analysisService.getCommodityTotalYearlyArrivals($scope.search.commodity.ID)]).then(
                function (response) {
                    totalArrivals = response[0];
                    if (totalArrivals.length > 0) {
                        angular.forEach(totalArrivals, function (sale) {
                            $scope.data.labels.push(sale.MonthName);
                            $scope.data.datasets[0].label = 'Arrival in ' + sale.ArrivalUnit;
                            $scope.data.datasets[0].data.push(sale.TotalArrivals);
                        });
                    }
                    $scope.viewLoading = false;
                }
            )
    }

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - If there is a stroke on each bar
        barShowStroke: true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing: 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing: 1,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };


})

.controller("totalArrivalsByVariety",
function ($scope, $rootScope, $q, $routeParams, $filter, analysisService) {
    $scope.Title = "Total Arrival By Variety";
    var me = this;
    $scope.by = 'm';
    $scope.search = {};
    $scope.showCommodityVariety = true;

    $scope.$watch('search.year', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.commodityVariety);
    });

    $scope.$watch('search.commodity', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.commodityVariety);
    });

    $scope.$watch('search.commodityVariety', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.commodityVariety);
    });

    $scope.loadGraphData = function () {
        $scope.viewLoading = true;
        //$scope.hideFilters = true;
        $scope.data = {
            labels: [],
            datasets: [
              {
                  //label: 'Amount in INR Crores',
                  fillColor: 'rgba(244,67,54,1)',
                  strokeColor: 'rgba(220,220,220,0.8)',
                  highlightFill: 'rgba(220,220,220,0.75)',
                  highlightStroke: 'rgba(220,220,220,1)',
                  data: []
              }
            ]
        };
        $q.all([$scope.by == 'm' ? analysisService.getCommodityTotalArrivalsByVariety($scope.search.year, $scope.search.commodity.ID, $scope.search.commodityVariety.ID) : analysisService.getCommodityTotalYearlyArrivalsByVariety($scope.search.commodity.ID, $scope.search.commodityVariety.ID)]).then(
                function (response) {
                    totalArrivals = response[0];
                    if (totalArrivals.length > 0) {
                        angular.forEach(totalArrivals, function (sale) {
                            $scope.data.labels.push(sale.MonthName);
                            $scope.data.datasets[0].data.push(sale.TotalArrivals);
                            $scope.data.datasets[0].label = 'Arrival in ' + sale.ArrivalUnit;
                        });
                    }
                    $scope.viewLoading = false;
                }
            )
    }

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - If there is a stroke on each bar
        barShowStroke: true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing: 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing: 1,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };


})

.controller("totalArrivalsByCommodityByState",
function ($scope, $rootScope, $q, $routeParams, $filter, analysisService) {
    $scope.Title = "Total Commodity Arrival By State";
    var me = this;
    $scope.by = 'm';
    $scope.search = {};
    $scope.showStateSelection = true;
    $scope.$watch('search.year', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.state)
    });
    $scope.$watch('search.commodity', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.state)
    });
    $scope.$watch('search.state', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.state)
    });

    $scope.loadGraphData = function () {
        $scope.viewLoading = true;
        $scope.data = {
            labels: [],
            datasets: [
              {
                  //label: 'Amount in INR Crores',
                  fillColor: 'rgba(244,67,54,1)',
                  strokeColor: 'rgba(220,220,220,0.8)',
                  highlightFill: 'rgba(220,220,220,0.75)',
                  highlightStroke: 'rgba(220,220,220,1)',
                  data: []
              }
            ]
        };
        $q.all([$scope.by == 'm' ? analysisService.getCommodityTotalArrivalsByState($scope.search.year, $scope.search.commodity.ID, $scope.search.state.Id) : analysisService.getCommodityTotalYearlyArrivalsByState($scope.search.commodity.ID, $scope.search.state.Id)]).then(
                function (response) {
                    totalArrivals = response[0];
                    if (totalArrivals.length > 0) {
                        angular.forEach(totalArrivals, function (sale) {
                            $scope.data.labels.push(sale.MonthName);
                            $scope.data.datasets[0].data.push(sale.TotalArrivals);
                            $scope.data.datasets[0].label = 'Arrival in ' + sale.ArrivalUnit;
                        });
                    }
                    $scope.viewLoading = false;
                }
            )
    }

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - If there is a stroke on each bar
        barShowStroke: true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing: 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing: 1,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };


})

.controller("totalArrivalsByCommodityByStateByVariety",
function ($scope, $rootScope, $q, $routeParams, $filter, analysisService) {
    $scope.Title = "Total Arrival By Variety By State";
    var me = this;
    $scope.by = 'm';
    $scope.search = {};
    $scope.showCommodityVariety = true;
    $scope.showStateSelection = true;


    $scope.$watch('search.commodity', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.commodityVariety && $scope.search.state);
    });
    $scope.$watch('search.commodityVariety', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.commodityVariety && $scope.search.state);
    });
    $scope.$watch('search.state', function () {
        $scope.disabledLoadButton = !($scope.search.year && $scope.search.commodity && $scope.search.commodityVariety && $scope.search.state);
    });

    $scope.loadGraphData = function () {
        $scope.viewLoading = true;
        //$scope.hideFilters = true;
        $scope.data = {
            labels: [],
            datasets: [
              {
                  //label: 'Amount in INR Crores',
                  fillColor: 'rgba(244,67,54,1)',
                  strokeColor: 'rgba(220,220,220,0.8)',
                  highlightFill: 'rgba(220,220,220,0.75)',
                  highlightStroke: 'rgba(220,220,220,1)',
                  data: []
              }
            ]
        };
        $q.all([$scope.by == 'm' ? analysisService.getCommodityTotalArrivalsByStateByVariety($scope.search.year, $scope.search.commodity.ID, $scope.search.state.Id, $scope.search.commodityVariety.ID) : analysisService.getCommodityTotalYearlyArrivalsByStateByVariety($scope.search.commodity.ID, $scope.search.state.Id, $scope.search.commodityVariety.ID)]).then(
                function (response) {
                    totalArrivals = response[0];
                    if (totalArrivals.length > 0) {
                        angular.forEach(totalArrivals, function (sale) {
                            $scope.data.labels.push(sale.MonthName);
                            $scope.data.datasets[0].data.push(sale.TotalArrivals);
                            $scope.data.datasets[0].label = 'Arrival in ' + sale.ArrivalUnit;
                        });
                    }
                    $scope.viewLoading = false;
                }
            )
    }

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - If there is a stroke on each bar
        barShowStroke: true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing: 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing: 1,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };


});