(function() {
    angular
        .module('toyguay')
        .component('toyDetail', {
            templateUrl: 'src/components/toys/toy_detail.tmpl.html',
            controller: ToyDetailComponent
        });

    ToyDetailComponent.$inject = ['ToyService']

    function ToyDetailComponent(ToyService) {
        var $ctrl = this;

        $ctrl.toy = {};

        /* ==== INTERFACE ==== */

        this.$routerOnActivate = routerOnActivate;

        /* ==== IMPLEMENTATION ==== */
        function routerOnActivate(payload) {
            return loadToy(payload.params.id)
        }

        function loadToy(id) {
                return ToyService
                    .get(id)
                    .then(function (toy) {
                        $ctrl.toy = toy;
                    })
            }
    }
})();