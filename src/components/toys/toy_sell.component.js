(function() {
    angular
        .module('toyguay')
        .component('toySell', {
            templateUrl: 'src/components/toys/toy_sell.tmpl.html',
            bindings: { $router: '<' },
            controller: ToySellComponent
        });

    ToySellComponent.$inject = ['ToyService', 'CategoryService', 'AuthenticationService', 'lodash'];

    function ToySellComponent(ToyService, CategoryService, AuthenticationService, lodash) {
        ToyService.searcher.activated = false;
        var $ctrl = this;
        $ctrl.categories = CategoryService.getAll();
        $ctrl.toy = {};
        $ctrl.toy.categories = [];

        /* __==--Interface--==__ */
        this.$routerOnActivate = routerOnActivate;
        $ctrl.sellToy = sellToy;
        $ctrl.addCategory = addCategory;
        $ctrl.removeCategoryFromToy= removeCategoryFromToy;
        $ctrl.uploadImage = uploadImage;

        /* __==--Impl--==__ */
        function routerOnActivate(){
            if (!AuthenticationService.state.authenticated){
                $ctrl.$router.navigateByUrl('/login/')
            }
        }

        function sellToy(toy){
            console.log("sell");
            ToyService
                .sell(toy)
                .then(function(result){
                    console.log("OK", result)
                    $ctrl.$router.navigateByUrl('/toys/');
                })
                .catch(function(err){
                    console.log("error", err);
                });
        }

        function addCategory(category) {
            lodash.remove($ctrl.categories, category);
            $ctrl.toy.categories.push(category);
        }

        function removeCategoryFromToy(category) {
            lodash.remove($ctrl.toy.categories, category);
            $ctrl.categories.push(category);
        }

        function uploadImage(file){
            ToyService.uploadImage(file).then(function(response){
                console.log("OK", response);
            })
        }
    }
})();