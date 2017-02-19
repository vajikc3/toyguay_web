(function() {
    angular
        .module('toyguay')
        .component('searchToys', {
            templateUrl: 'src/components/search_toys/search_toys.tmpl.html',
            controller: SearchToysComponent
        })

        SearchToysComponent.$inject = ['$log', 'ToyService']

        function SearchToysComponent($log, ToyService) {
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


            /* ==== IMPLEMENTATION ==== */
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
            //Busca sugerencias cuando cambia el texto (ver template y md-search-text-change)
            function searchTextChange(text) {
                console.log();
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
              return ToyService
                    .getAll()
                    .then(function (toys) {
                        $ctrl.toys = toys
                    }) 
            }

            // Buscar en BD
            function searchBD () {
                ToyService.search($ctrl.searchTerm)
            }

            // Buscar en BD cuando se pulsa Enter
            function searchOnKeyUp ($event) {
                if ($event.keyCode === 13){
                    searchBD()
                }
            }
        }
})()