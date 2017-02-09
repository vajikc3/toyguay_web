(function() {
    angular
        .module('toyguay')
        .component('toySell', {
            templateUrl: 'src/components/toys/toy_sell.tmpl.html',
            controller: ToySellComponent
        });

    ToySellComponent.$inject = [];

    function ToySellComponent() {
        var $ctrl = this;


    }
})();