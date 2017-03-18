(function() {
    angular
        .module('toyguay')
        .component('toyDetail', {
            templateUrl: 'src/components/toys/toy_detail.tmpl.html',
            bindings: { $router: '<' },
            controller: ToyDetailComponent
        });

    ToyDetailComponent.$inject = ['ToyService']

    function ToyDetailComponent(ToyService) {
        var $ctrl = this;
        $ctrl.toy = {};
        $ctrl.selectedImage = "";

        /* ==== INTERFACE ==== */
        this.$routerOnActivate = routerOnActivate;
        $ctrl.selectImage = selectImage;

        /* ==== IMPLEMENTATION ==== */
        function routerOnActivate(payload) {
            return loadToy(payload.params.id)
        }

        function loadToy(id) {
            return ToyService
                .get(id)
                .then(function (toy) {
                    console.log("loadtoy toy", toy)
                    $ctrl.toy = toy;
                    if (toy.imageURL[0]) $ctrl.selectedImage = toy.imageURL[0];
                })
                .catch(function(err){
                    console.log("loadtoy err", err);
                    if (err.code === 403) {
                        $ctrl.$router.navigateByUrl('/login/')
                    } else {
                        $ctrl.$router.navigateByUrl('/toys/')
                    }
                })
        }

        function selectImage(image){
            $ctrl.selectedImage = image;
        }
    }
})();