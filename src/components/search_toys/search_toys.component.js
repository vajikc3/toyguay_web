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
            $ctrl.searchTerm = "";
            $ctrl.toys = loadAllToys();
            $ctrl.loginState = AuthenticationService.state;
            $ctrl.selectedCategory = '';
            $ctrl.categories = [
                {id:1, name: 'kids'},
                {id:2, name: 'construction'},
                {id:3, name: 'playmobil'},
                {id:4, name: 'home'}
            ];

            /* ==== INTERFACE ==== */
            $ctrl.searchOnKeyUp = searchOnKeyUp;
            $ctrl.selectedItemChange = selectedItemChange;
            $ctrl.search = search;
            $ctrl.searcher = ToyService.searcher;
            
            $ctrl.selectCategory = selectCategory;
            $ctrl.quitCategoryFilter = quitCategoryFilter;

            /* ==== IMPLEMENTATION ==== */

            $scope.$watch(function(){
                return $ctrl.loginState.authenticated 
            }, function(newVal, oldVal){
                if(newVal !== oldVal){
                    search();
                }
            })

            /* __==-- SEARCH INPUT --==__ */
            // Buscar en BD cuando se pulsa Enter
            function searchOnKeyUp ($event) {
                if ($event.keyCode === 13){
                    search()
                }
            }
            
            // Cargamos todos los productos (para las sugerencias del autocompletador)
            function loadAllToys() {
                search();
            }

            // Buscar en BD
            function search () {
                var criteria = {};
                if ($ctrl.selectedCategory !== ''){
                    criteria.category = $ctrl.selectedCategory;
                }
                doSearch($ctrl.searchTerm, criteria);
            }

            function doSearch(term, criteria){
                ToyService
                    .search(term, criteria)
                    .then(function(toys){
                        $ctrl.toys = toys;
                    }).catch(function(err){
                        $ctrl.toys = [];
                    });
            }

            /* __==--CATEGORIAS--==__ */
            function quitCategoryFilter(){
                $ctrl.selectedCategory = '';
                search();
            }
            function selectCategory(category) {
                $ctrl.selectedCategory = category.name;
                search();
            }

            // Si seleccionamos un elemento sugerido llamamos a buscar en BD 
            function selectedItemChange() {
                search()
            }

        }
})()