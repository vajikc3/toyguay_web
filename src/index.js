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
        .config( function ($locationProvider, $httpProvider, jwtInterceptorProvider, jwtOptionsProvider) {
            $locationProvider.html5Mode(true)

            // Configuración urlencode para enviar objetos json vía $http.post
            $httpProvider.defaults.transformRequest = function(data){
                if (data === undefined) {
                    return data;
                }
                return $.param(data);
            }

            // Configuración jwtInterceptorProvider -- Envia token en cada request
            jwtOptionsProvider.config({
                urlParam: 'token',
                whiteListedDomains: ['localhost']
            });

            jwtInterceptorProvider.tokenGetter = function(store) {
                console.log("jwtInterceptor");
                return store.get('jwt');
            }
            $httpProvider.interceptors.push('jwtInterceptor');
        });

    angular
        .module('toyguay')
        .value('$routerRootComponent', 'app')
})();