(function() {
    angular
        .module('toyguay')
        .component('toySell', {
            templateUrl: 'src/components/toys/toy_sell.tmpl.html',
            bindings: { $router: '<' },
            controller: ToySellComponent
        });

    ToySellComponent.$inject = ['$timeout', 'ToyService', 'CategoryService', 'AuthenticationService', 'lodash'];

    function ToySellComponent($timeout, ToyService, CategoryService, AuthenticationService, lodash) {
        ToyService.searcher.activated = false;
        var $ctrl = this;
        this.$routerOnActivate = routerOnActivate;
        /* __==--Interface props--==__ */
        $ctrl.categories = CategoryService.getAll();
        $ctrl.toy = {};
        $ctrl.selectedCategories = [];
        $ctrl.toy.images = [];
        $ctrl.imageLoading = [false,false,false,false];
        $ctrl.error = null;

        /* __==--Interface methods--==__ */
        $ctrl.sellToy = sellToy;
        $ctrl.addCategory = addCategory;
        $ctrl.removeCategoryFromToy= removeCategoryFromToy;
        $ctrl.uploadImage = uploadImage;
        $ctrl.getImageURL = getImageURL;
        $ctrl.isImageLoading = isImageLoading;

        /* __==--Impl--==__ */
        function routerOnActivate(){
            if (!AuthenticationService.state.authenticated){
                $ctrl.$router.navigateByUrl('/login/')
            }
        }

        function sellToy(valid){
            if (valid){
                $ctrl.toy.categories = $ctrl.selectedCategories;
                ToyService
                    .sell($ctrl.toy)
                    .then(function(result){
                        $timeout(function(){
                            $ctrl.$router.navigateByUrl('/toys/');
                        }, 2000)
                    })
                    .catch(function(error){
                        $ctrl.error = error;
                    });
            }
        }

        function addCategory(category) {
            lodash.remove($ctrl.categories, category);
            $ctrl.selectedCategories.push(category);
        }

        function removeCategoryFromToy(category) {
            lodash.remove($ctrl.selectedCategories, category);
            $ctrl.categories.push(category);
        }

        function getImageURL(id){
            if ($ctrl.imageLoading[id]) return "assets/images/loading.gif";
            if (!$ctrl.toy.images[id]) return "http://placehold.it/250x250?text=Sin foto " + (id + 1);
            return $ctrl.toy.images[id];
        }

        function uploadImage(file, id){
            $ctrl.imageLoading[id] = true;
            ToyService.uploadImage(file).then(function(imgURL){
                $ctrl.toy.images[id] = imgURL;
                $ctrl.imageLoading[id] = false;
            })
        }
        function isImageLoading(){
            return $ctrl.imageLoading.reduce(function(lastValue, actualValue){
                return lastValue || actualValue;
            }, false)
        }
    }
})();