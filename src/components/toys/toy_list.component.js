(function() {
    angular
        .module('toyguay')
        .component('toyList', {
            templateUrl: 'src/components/toys/toy_list.tmpl.html',
            controller: ToyListComponent
        });

    ToyListComponent.$inject = ['$scope', 'ToyService'];

    function ToyListComponent($scope, ToyService) {
        var $ctrl = this;

        /* ==== INTERFACE ==== */

        $ctrl.$onInit = onInit;
        console.log("oninig", $ctrl); 
        
        /* ==== IMPLEMENTATION ==== */
        
        function onInit() {
            ToyService.searcher.activated = true;
            $ctrl.filteredList = ToyService.filteredList;
        }
    }
})();