(function() {
    angular
        .module('toyguay')
        .component('searchToys', {
            templateUrl: 'src/components/search_toys/search_toys.tmpl.html',
            controller: SearchToysComponent
        })

        SearchToysComponent.$inject = ['$scope', '$log', 'ToyService', 'CategoryService', 'AuthenticationService', 'geolocation']

        function SearchToysComponent($scope, $log, ToyService, CategoryService, AuthenticationService, geolocation) {
            var $ctrl = this
            // Lista de productos para sugerencias del autocompletador
            $ctrl.searchTerm = "";
            $ctrl.toys = loadAllToys();
            $ctrl.loginState = AuthenticationService.state;
            $ctrl.selectedCategory = '';
            $ctrl.selectedRadius = null;
            $ctrl.categories = [];
            CategoryService.getAll().then(function(categories){
                $ctrl.categories = categories;
            });
            $ctrl.geolocation = null;
            geolocation.getLocation().then(function(data){
              $ctrl.geolocation = {latitude:data.coords.latitude, longitude:data.coords.longitude};
            });

            /* ==== INTERFACE ==== */
            $ctrl.searchOnKeyUp = searchOnKeyUp;
            $ctrl.search = search;
            $ctrl.searcher = ToyService.searcher;

            $ctrl.selectCategory = selectCategory;
            $ctrl.quitCategoryFilter = quitCategoryFilter;

            $ctrl.selectRadius = selectRadius;
            $ctrl.quitDistanceFilter = quitDistanceFilter;

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
                console.log("searchOnKeyUp")
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
                console.log("search 1")
                if (!!$ctrl.geolocation && !!$ctrl.selectedRadius){
                    console.log("search 2", $ctrl.selectRadius)
                    criteria.geolocation = $ctrl.geolocation;
                    criteria.radius = $ctrl.selectedRadius;
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
                $ctrl.selectedCategory = category;
                search();
            }

            /* __==--DISTANCIA--==__ */
            function quitDistanceFilter(){
                $ctrl.selectedRadius = null;
                search();
            }

            function selectRadius(radius) {
                $ctrl.selectedRadius = radius;
                search();
            }
        }
})()