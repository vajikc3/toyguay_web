;(function() {
    angular
        .module('toyguay')
        .directive("validInteger", validInteger);

    validInteger.$inject = [];
    function validInteger(){
        // /^[0-9]+(\\.[0-9]+)?$
        var INTEGER_REGEXP = /^-?\d+(\.\d+)?$/;
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.validInteger = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be valid
                        return true;
                    }

                    if (INTEGER_REGEXP.test(viewValue)) {
                      // it is valid
                      return true;
                    }

                    // it is invalid
                    return false;
              };
            }
          };
    }
})();
