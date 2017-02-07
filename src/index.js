(function() {
    angular
        .module('toyguay', [
            'ngComponentRouter',
            'ui.bootstrap',
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