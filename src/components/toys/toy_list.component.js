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
        
        init();
        /* ==== IMPLEMENTATION ==== */

        function init(){
            ToyService.searcher.activated = true;
            $ctrl.filteredList = ToyService.filteredList;
        }
        
        function onInit() {
            init();
        }
    }
})();