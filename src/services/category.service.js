(function() {
    angular
        .module('toyguay')
        .service('CategoryService', CategoryService);

    CategoryService.$inject = ['$http', '$q', '$log', 'CONF', 'ENDPOINTS', 'lodash']

    function CategoryService($http, $q, $log, CONF, ENDPOINTS, lodash) {
        var cachedCategories = {
            items : []
        };

        /* ==== INTERFACE ==== */
        return {
            getAll: getAll,
            getCategoryByName: getCategoryByName
        }

        /* ==== IMPLEMENTATION ==== */
        function getAll() {
            return $http
                .get(CONF.API_BASE + ENDPOINTS.CATEGORIES)
                .then(function (response) {
                    cachedCategories.items = response.data.rows;
                    return $q.when(response.data.rows);
                })
                .catch(function (err) {
                    $log.error("Cannot obtain categories from ToyGuay. Try again later...", err)
                    return $q.reject(err)
                })
        }

        function getCategoryByName(categoryName){
            return lodash.find(cachedCategories.items, {name : categoryName})
        }
    }
})();


// db.categories.insertMany( [
//                 {id:1, name: 'kids'},
//                 {id:2, name: 'construction'},
//                 {id:3, name: 'playmobil'},
//                 {id:4, name: 'home'},
//                 {id:4, name: 'default'}
//             ]);