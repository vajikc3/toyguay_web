;(function() {
    angular
        .module('toyguay', [
            'ngComponentRouter',
            'ui.bootstrap',
            'angular-jwt',
            'angular-storage',
            'ngMessages',
            'ngLodash',
            'azureBlobUpload',
            'ui-leaflet',
            'geolocation',
            'smart-table'
        ])

    /* === CONFIG === */
    angular
        .module('toyguay')
        .config( function ($locationProvider, $httpProvider, jwtInterceptorProvider, jwtOptionsProvider) {
            $locationProvider.html5Mode(true)

            // Configuración URLENCODE para enviar objetos json vía $http.post
            $httpProvider.defaults.transformRequest = function(data){
                if (data === undefined) {
                    return data;
                }

                if (data instanceof Blob){
                    var formData = new FormData();
                    formData.append('file', data);
                    return formData;
                }

                return $.param(data);
            }

            // Configuración jwtInterceptorProvider -- Envia token en cada request
            jwtOptionsProvider.config({
                urlParam: 'token',
                whiteListedDomains: ['localhost']
            });
            jwtInterceptorProvider.tokenGetter = function(store) {
                return store.get('jwt');
            }
            $httpProvider.interceptors.push('jwtInterceptor');
        });

    /* === VALUES === */
    angular
        .module('toyguay')
        .value('$routerRootComponent', 'app')
})();