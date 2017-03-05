(function() {
    angular
        .module('toyguay')
        .component('searchToys', {
            templateUrl: 'src/components/search_toys/search_toys.tmpl.html',
            controller: SearchToysComponent
        })

        SearchToysComponent.$inject = ['$scope', '$log', 'ToyService', 'AuthenticationService']

        function SearchToysComponent($scope, $log, ToyService, AuthenticationService) {
            var $ctrl = this
            // Lista de productos para sugerencias del autocompletador
            $ctrl.toys = loadAllToys();
            
            /* ==== INTERFACE ==== */
            $ctrl.querySearch = querySearch;
            $ctrl.searchOnKeyUp = searchOnKeyUp;
            $ctrl.selectedItemChange = selectedItemChange;
            $ctrl.searchTermChange   = searchTextChange;
            $ctrl.searchBD = searchBD;
            $ctrl.searchTerm = "";
            $ctrl.searcher = ToyService.searcher;
            $ctrl.doSearch = doSearch;

            $ctrl.loginState = AuthenticationService.state;

            /* ==== IMPLEMENTATION ==== */

            $scope.$watch(function(){
                return $ctrl.loginState.authenticated 
            }, function(newVal, oldVal){
                console.log("watch", newVal, oldVal);
                if(newVal !== oldVal){
                    searchBD();
                }
            })


            // Buscador de sugerencias
            function querySearch (query) {
                if (query) {
                    var res = $ctrl.toys.filter( function (toy) {
                        return ToyService.applySearchFilter(toy, query);
                    })
                    return res;
                } else {
                    return [];
                }
            }

            function searchTextChange(text) {
               // $ctrl.searchTerm = text
               // if ($ctrl.searchTerm === "" ) {
               //      loadAllProducts()
               //      querySearch("")
               // }
            }
            
            // Si seleccionamos un elemento sugerido llamamos a buscar en BD 
            function selectedItemChange() {
                searchBD()
            }

            // Cargamos todos los productos (para las sugerencias del autocompletador)
            function loadAllToys() {
                doSearch('');
            }

            // Buscar en BD
            function searchBD () {
                doSearch($ctrl.searchTerm);
            }

            function doSearch(term){
                ToyService
                    .search(term)
                    .then(function(toys){
                        $ctrl.toys = toys;
                    }).catch(function(err){
                        $ctrl.toys = [];
                    });
            }

            // Buscar en BD cuando se pulsa Enter
            function searchOnKeyUp ($event) {
                if ($event.keyCode === 13){
                    searchBD()
                }
            }
        }
})()