// Inicializador de Aplicación
//    * ngMaterial => Directivas para dar estilo Material a la aplicación
//    * ngLodash => Librería JS con funciones para facilitar el filtro, búqueda, mapeos...en
//                  colecciones y arrays
//    * ngSanitize => Necesario para renderizar texto html que nos llega del backend
//    * ng-haversine => Pues qué te voy a contar yo de ésto Vermicida! ;P

(function() {
    angular
        .module('whatapop', [
            'ngComponentRouter'
        ])

    angular
        .module('whatapop')
        .config( function ($locationProvider) {
            $locationProvider.html5Mode(true)
        })

    angular
        .module('whatapop')
        .value('$routerRootComponent', 'app')
})();