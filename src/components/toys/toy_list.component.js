(function() {
    angular
        .module('toyguay')
        .component('toyList', {
            templateUrl: 'src/components/toys/toy_list.tmpl.html',
            controller: ToyListComponent
        });

    ToyListComponent.$inject = ['ToyService'];

    function ToyListComponent(ToyService) {
        var $ctrl = this;

        /* ==== INTERFACE ==== */

        $ctrl.$onInit = onInit; 

        /* ==== IMPLEMENTATION ==== */

        function onInit() {
            $ctrl.filteredList = ToyService.filteredList;
        }
    }
})();