;(function() {
    angular
        .module('toyguay')
        .directive("validCategoryCount", validCategoryCount);

    validCategoryCount.$inject = [];
    function validCategoryCount(){
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.validCategoryCount = function(modelValue) {
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