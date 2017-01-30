(function() {
    angular
        .module('toyguay', [
            'ngComponentRouter'
        ])

    angular
        .module('toyguay')
        .config( function ($locationProvider) {
            $locationProvider.html5Mode(true)
        })

    angular
        .module('toyguay')
        .value('$routerRootComponent', 'app')
})();