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
            getAll: getAll,
            filteredList: filteredList,
            applySearchFilter: applySearchFilter,
            search: search
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

        function search(text) {
            return getAll()
                .then(function (toys) {
                    filteredList.items = toys.filter(function(toy) {
                        var res = applySearchFilter(toy, text)
                        console.log(res)
                        return res
                    })
                    console.log(filteredList)
                    return $q.when(filteredList)
                })
                .catch(function (err) {
                    $log.error("Cannot obtain product data from ToyGuay. Try again later...", err)
                    return $q.when(filteredList)
                })
                
        }

        function applySearchFilter(toy, text) {
            console.log(toy, text);
            var lowercaseQuery = angular.lowercase(text);
            var lowercaseToyName = angular.lowercase(toy.name);
            var lowercaseToyDesc = angular.lowercase(toy.description);
            var comp1 = lowercaseToyName.indexOf(lowercaseQuery) >= 0;
            var comp2 = lowercaseToyDesc.indexOf(lowercaseQuery) >= 0;
            console.log(comp1, comp2);
            return  comp1 || comp2;
        }

    }
})();