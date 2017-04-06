(function() {
    angular
        .module('toyguay')
        .component('userSold', {
            templateUrl: 'src/components/user/user_sold.tmpl.html',
            controller: UserSold
        });

    UserSold.$inject = ['ToyService', 'AuthenticationService'];

    function UserSold(ToyService, AuthenticationService) {
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
                    console.log(toys)
                    $ctrl.toys = toys;
                });
        }

        function onInit() {
            init();
        }

        function sellToy(toy){
            console.log(toy);
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