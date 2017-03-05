(function() {
    angular
        .module('toyguay')
        .component('recoverPass', {
            templateUrl: 'src/components/login/recover_pass.tmpl.html',
            bindings: { $router: '<' },
            controller: RecoverPassComponent
        });

    RecoverPassComponent.$inject = ['AuthenticationService', 'ToyService', '$timeout'];

    function RecoverPassComponent(AuthenticationService, ToyService, $timeout) {
        var $ctrl = this;


        $ctrl.recovering = false;
        $ctrl.userOrEmail = '';
        $ctrl.error = null;

        /* ==== INTERFACE ==== */
        
        $ctrl.recover = recover;
        
        $ctrl.$onInit = onInit;

        /* ==== IMPLEMENTATION ==== */

        function onInit(){
            ToyService.searcher.activated = false;
        }

        function recover() {
            $ctrl.recovering = true;
            $timeout(function(){
                AuthenticationService
                    .recoverPass($ctrl.userOrEmail)
                    .then(function(response){
                        $timeout(function(){
                            $ctrl.recovering = false;
                            $ctrl.$router.navigateByUrl('/login/');
                        }, 1000)
                    })
                    .catch(function(error){
                        $ctrl.error = error;
                    })
            }, 1000);
        }
    }


})();