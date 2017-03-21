(function() {
    angular
        .module('toyguay')
        .component('toyDetail', {
            templateUrl: 'src/components/toys/toy_detail.tmpl.html',
            bindings: { $router: '<' },
            controller: ToyDetailComponent
        });

    ToyDetailComponent.$inject = ['ToyService', 'UserService']

    function ToyDetailComponent(ToyService, UserService) {
        var $ctrl = this;
        $ctrl.toy = {};
        $ctrl.seller = {};
        $ctrl.selectedImage = "";
        $ctrl.center = {};
        $ctrl.markers = {};

        /* ==== INTERFACE ==== */
        this.$routerOnActivate = routerOnActivate;
        $ctrl.selectImage = selectImage;
        $ctrl.getLocaleDate = getLocaleDate;

        /* ==== IMPLEMENTATION ==== */
        function routerOnActivate(payload) {
            ToyService.searcher.activated = false;
            return loadToy(payload.params.id)
        }

        function loadToy(id) {
            return ToyService
                .get(id)
                .then(function (toy) {
                    $ctrl.toy = toy;
                    if (toy.imageURL[0]) $ctrl.selectedImage = toy.imageURL[0];
                    loadUserData(toy.seller);
                })
                .catch(function(err){
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

        function loadUserData(sellerId){
            UserService
                .getUserData(sellerId)
                .then(function(user){
                    $ctrl.seller = user;
                    $ctrl.center = {
                        lat: $ctrl.seller.location.coordinates[0],
                        lng: $ctrl.seller.location.coordinates[1],
                        zoom: 13
                    }
                    $ctrl.markers=  {
                        mainMarker: {
                            lat: $ctrl.seller.location.coordinates[0],
                            lng: $ctrl.seller.location.coordinates[1],
                            focus: true
                        }
                    }
                });
            UserService
                .getUserSellingToyCount(sellerId)
                .then(function(toys){
                    $ctrl.seller.toys = toys;
                    $ctrl.seller.toyCount = toys.length;
                });
        }
        function getLocaleDate(dateStr){
             var dateObj = new Date(dateStr)
             return dateObj.toLocaleDateString()
        }
    }
})();