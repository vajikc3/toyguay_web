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

        $ctrl.$onInit = function() {

            ToyService.getAll().then(function(toys){
                $ctrl.filteredList = toys;
            });

        }
    }
})();