(function() {
    angular
        .module('toyguay')
        .service('ToyService', ToyService);

    ToyService.$inject = ['$http', '$q', '$log', 'CONF']

    function ToyService($http, $q, $log, CONF) {

        var filteredList = {
            items: null
        };

        /* ==== INTERFACE ==== */
        return {
            getAll: getAll
        }
        
        /* ==== IMPLEMENTATION ==== */
        function getAll(){
            return $http
                .get(CONF.API_BASE + CONF.API_ENDPOINT_TOYS)
                .then(function (response) {
                    // Almacena la lista de productos en filteredList.items
                    filteredList.items = response.data;
                    return $q.when(response.data);
                })
                .catch(function (err) {
                    $log.error("Cannot obtain toy list from ToyGuay. Try again later...", err);
                    return  $q.when([]);
                })

        }

    }
})();