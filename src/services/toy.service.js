(function() {
    angular
        .module('toyguay')
        .service('ToyService', ToyService);

    ToyService.$inject = ['$http', '$q', '$log', 'CONF', 'ENDPOINTS', 'UserService']

    function ToyService($http, $q, $log, CONF, ENDPOINTS, UserService) {

        var filteredList = {
            items: null
        };

        var searcher = {
            activated : false
        }

        /* ==== INTERFACE ==== */
        return {
            getAll: getAll,
            filteredList: filteredList,
            applySearchFilter: applySearchFilter,
            search: search,
            get: get,
            searcher: searcher
        }

        /* ==== IMPLEMENTATION ==== */

        function getAll(){
            return $http
                .get(CONF.API_BASE + ENDPOINTS.TOYS)
                .then(function (response) {
                    // Almacena la lista de productos en filteredList.items
                    filteredList.items = response.data.rows;
                    return $q.when(response.data);
                })
                .catch(function (err) {
                    $log.error("Cannot obtain toy list from ToyGuay. Try again later...", err);
                    return  $q.reject([]);
                })
        }

        function search(text) {
            return getAll()
                .then(function (response) {
                    var toys = response.rows;
                    filteredList.items = toys.filter(function(toy) {
                        var res = applySearchFilter(toy, text)
                        return res;
                    })
                    return setUserDataToToys(filteredList.items)
                        .then(function(itemsWithUserData){
                            filteredList.items = itemsWithUserData;
                            console.log("filteredList.items", filteredList.items);
                        });
                })
                .catch(function (err) {
                    $log.error("Cannot obtain product data from ToyGuay. Try again later...", err)
                    filteredList.items = [];
                    return $q.reject(filteredList)
                })
                
        }

        function setUserDataToToys(toyList){
            var toyListPromises = [];
            toyList = toyList.map(function(toy){
                var promise = UserService
                                .getUserData(toy.seller)
                                .then(function(sellerData){
                                    toy.seller_data = sellerData;
                                    return toy;
                                });
                toyListPromises.push(promise);
            });
            return $q.all(toyListPromises);
        }

        function applySearchFilter(toy, text) {
            var lowercaseQuery = angular.lowercase(text);
            var lowercaseToyName = angular.lowercase(toy.name);
            var lowercaseToyDesc = angular.lowercase(toy.description);
            var comp1 = lowercaseToyName.indexOf(lowercaseQuery) >= 0;
            var comp2 = lowercaseToyDesc.indexOf(lowercaseQuery) >= 0;
            return  comp1 || comp2;
        }


        function get(id) {
            if (!id) return $q.reject({error:"Falta ID de producto"})
            return $http
                .get(CONF.API_BASE + ENDPOINTS.TOYS + id)
                .then(function (response) {
                    return $q.when(response.data)
                })
                .catch(function (err) {
                    $log.error("Cannot obtain product data from ToyGuay. Try again later...", err)
                    return $q.when({})
                })
        }


    }
})();