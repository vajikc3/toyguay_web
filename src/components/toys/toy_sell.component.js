(function() {
    angular
        .module('toyguay')
        .component('toySell', {
            templateUrl: 'src/components/toys/toy_sell.tmpl.html',
            bindings: { $router: '<' },
            controller: ToySellComponent
        });

    ToySellComponent.$inject = ['ToyService'];

    function ToySellComponent(ToyService) {
        ToyService.searcher.activated = false;
        var $ctrl = this;
        $ctrl.toy = {};

        /* __==--Interface--==__ */
        $ctrl.sellToy = sellToy;

        /* __==--Impl--==__ */
        function sellToy(toy){
            console.log("sell");
            ToyService
                .sell(toy)
                .then(function(result){
                    console.log("OK", result)
                    $ctrl.$router.navigateByUrl('/toys/');
                })
                .catch(function(err){
                    console.log("error", err);
                });
        }
    }
})();