;(function() {
    angular
        .module('toyguay')
        .directive("validImageCount", validImageCount);

    validImageCount.$inject = [];
    function validImageCount(){
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.validImageCount = function(modelValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be valid
                        return false;
                    }

                    if (modelValue > 0) {
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
