 
angular.module("ekisaan.filters.mandirate", []).
    filter("checkBlankURL", [function () {
        return function (url) {
            if (url == "")
                return ""
            else
                return url;
        }
    }]);
