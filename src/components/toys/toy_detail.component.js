(function() {
    angular
        .module('toyguay')
        .component('toyDetail', {
            templateUrl: 'src/components/toys/toy_detail.tmpl.html',
            controller: ToyDetailComponent
        });

    ToyDetailComponent.$inject = []

    function ToyDetailComponent() {
        var $ctrl = this;
    }
})();