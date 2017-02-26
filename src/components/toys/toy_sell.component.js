(function() {
    angular
        .module('toyguay')
        .component('toySell', {
            templateUrl: 'src/components/toys/toy_sell.tmpl.html',
            controller: ToySellComponent
        });

    ToySellComponent.$inject = ['ToyService'];

    function ToySellComponent(ToyService) {
        ToyService.searcher.activated = false;
        var $ctrl = this;
    }
})();