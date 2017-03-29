;(function() {
    angular
        .module('toyguay')
        .component('toyImageModal', {
            templateUrl: 'src/components/toys/toy_image_modal.tmpl.html',
            bindings: {
                resolve: '<',
                close: '&'
            },
            controller: ToyImageModalComponent
        });

    ToyImageModalComponent.$inject = [];

    function ToyImageModalComponent() {
        var $ctrl = this;
        $ctrl.$onInit = function () {
          $ctrl.imageURL = $ctrl.resolve.imageURL;
        };

        $ctrl.ok = function () {
          $ctrl.close();
        };
    }
})();
