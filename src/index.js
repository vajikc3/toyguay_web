(function() {
;(function() {
    angular
        .module('toyguay', [
            'ngComponentRouter',
            'ui.bootstrap',
            'angular-jwt',
            'angular-storage',
            'ngMessages'
        ])

    angular
        .module('toyguay')
        .config( function ($locationProvider, $httpProvider) {
            $locationProvider.html5Mode(true)


            $httpProvider.defaults.transformRequest = function(data){
                if (data === undefined) {
                    return data;
                }
                return $.param(data);
            }

        })

    angular
        .module('toyguay')
        .value('$routerRootComponent', 'app')
})();