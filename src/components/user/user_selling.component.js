(function() {
    angular
        .module('toyguay')
        .component('userSelling', {
            templateUrl: 'src/components/user/user_selling.tmpl.html',
            controller: UserSelling
        });

    UserSelling.$inject = ['ToyService', 'AuthenticationService'];

    function UserSelling(ToyService, AuthenticationService) {
        var $ctrl = this;
        $ctrl.toys = [];
        $ctrl.displayedToys = [];

        $ctrl.getLocaleDate = getLocaleDate;
        $ctrl.getStateText = getStateText;
        $ctrl.sellToy = sellToy;

        init();
        /* ==== IMPLEMENTATION ==== */
        function init(){
            ToyService.searcher.activated = false;
            loadSellerToys();
        }

        function loadSellerToys(){
            ToyService
                .getToysBySeller(AuthenticationService.getTokenData().id)
                .then(function(toys){
                    $ctrl.toys = toys;
                });
        }

        function onInit() {
            init();
        }

        function sellToy(toy){
            ToyService.deleteById(toy._id).then(function(){
                loadSellerToys();
            })
        }

        function getLocaleDate(dateStr){
             var dateObj = new Date(dateStr)
             return dateObj.toLocaleDateString()
        }

        function getStateText(state) {
            if(state.toLowerCase() === 'selling') {
                return "En Venta"
            } else {
                return "Vendido"
            }

        }

    }
})();