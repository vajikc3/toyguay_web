(function() {
    angular
        .module('toyguay')
        .service('CategoryService', CategoryService);

    CategoryService.$inject = []

    function CategoryService() {

        /* ==== INTERFACE ==== */
        return {
            getAll: getAll
        }

        /* ==== IMPLEMENTATION ==== */
        function getAll() {
            return [
                {id:1, name: 'kids'},
                {id:2, name: 'construction'},
                {id:3, name: 'playmobil'},
                {id:4, name: 'home'},
                {id:4, name: 'default'}
            ];
        }
    }
})();