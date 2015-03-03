 
angular.module("ekisaan.directives.mandirate", [])
    .directive("categorySearchMenu", [function () {
       return {
           restrict: 'AE',
           scope: {
               menus: '='
           },
           template:
               '<div ng-repeat="menu in menus">' +
                   '<div class="col-xs-6" style="text-align:center">' +
                       '<a href="#/{{menu.navigationToView}}">' +
                           '<h4>' +
                               '<img ng-src="{{menu.image}}" style="height:80px;width:90px" />' +
                               '<br />{{menu.title}}' +
                           '</h4>' +
                       '</a>' +
                   '</div>' +
               '</div>'
       }
   }])
   .directive("goBack", ['$window',function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                $window.history.back();
            });
        }
    }
}])