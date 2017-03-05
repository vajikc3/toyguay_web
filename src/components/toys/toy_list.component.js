(function() {
    angular
        .module('toyguay')
        .component('toyList', {
            templateUrl: 'src/components/toys/toy_list.tmpl.html',
            controller: ToyListComponent
        });

    ToyListComponent.$inject = ['$scope', 'ToyService', 'UserService'];

    function ToyListComponent($scope, ToyService, UserService) {
        var $ctrl = this;

        /* ==== INTERFACE ==== */

        $ctrl.$onInit = onInit;
        // $ctrl.getSellerData = getSellerData;
        

        init();
        
        /* ==== IMPLEMENTATION ==== */

        function init(){
            ToyService.searcher.activated = true;
            $ctrl.filteredList = ToyService.filteredList;
        }
        
        function onInit() {
            init();
        }

        // function getSellerData(sellerID) {
        //     UserService
        //         .getUserData(sellerID)
        //         .then(function(seller){
        //             return seller;
        //         })
        // }



    }
})();