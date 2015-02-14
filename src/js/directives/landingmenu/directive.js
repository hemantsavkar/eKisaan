 
angular.module("ekisaan.directives.landingmenu", []).
    directive("landingMenu", [function () {
        return {
            restrict: 'AE',
            scope: {
                menus: '='
            },
            template:
                '<br/><div ng-repeat="menu in menus">' +
                    '<div class="col-xs-4" style="text-align:center">' +
                        '<a href="#/{{menu.navigationToView}}">' +
                            '<h4>' +
                                '<i class="fa fa-{{menu.icon}} fa-align-center fa-3x"></i>' +
                                '<br />{{menu.title}}' +
                            '</h4>' +
                        '</a>' +
                    '</div>' +
                '</div>'
        }

    }]);