 
var INTEGER_REGEXP = "^[7-9][0-9]{9}$";
angular.module("ekisaan.directives.registration", []).

    directive('mobileno', function () {
        return {
            require: 'ngModel',
            restrict: "A",
            link: function (scope, elm, attrs, ctrl) {
                // create the regex obj.
                var regex = new RegExp(INTEGER_REGEXP, 'i');
                // add a parser that will process each time the value is 
                // parsed into the model when the user updates it.
                ctrl.$parsers.unshift(function (value) {
                    // test and set the validity after update.

                    if (value != undefined) {
                        var valid = regex.test(value);
                        ctrl.$setValidity('mobileno', valid);
                        // if it's valid, return the value to the model, 
                        // otherwise return undefined.
                        return valid ? value : undefined;
                    }
                    else {
                        return undefined;
                    }
                });

                // add a formatter that will process each time the value 
                // is updated on the DOM element.
                ctrl.$formatters.unshift(function (value) {
                    // validate.
                    if (value != undefined) {
                        ctrl.$setValidity('mobileno', regex.test(value));
                        // return the value or nothing will be written to the DOM.
                        return value;
                    }
                    else {
                        return undefined;
                    }
                });

            }
        }
    });

