(function() {
    angular
        .module('toyguay')
        .component('doLogin', {
            templateUrl: 'src/components/login/do_login.tmpl.html',
            bindings: { $router: '<' },
            controller: DoLoginComponent
        });

    DoLoginComponent.$inject = ['AuthenticationService', 'ToyService', '$timeout', 'store', 'jwtHelper'];

    function DoLoginComponent(AuthenticationService, ToyService,  $timeout, store, jwtHelper) {
        var $ctrl = this;


        $ctrl.authenticating = false;
        $ctrl.user = '';
        $ctrl.password = '';
        $ctrl.error = null;

        /* ==== INTERFACE ==== */
        
        $ctrl.doLogin = doLogin;
        
        $ctrl.$onInit = onInit;

        /* ==== IMPLEMENTATION ==== */

        function onInit(){
            ToyService.searcher.activated = false;
        }

        function doLogin() {
            $ctrl.authenticating = true;
            $timeout(function(){
                AuthenticationService
                    .doLogin($ctrl.user, $ctrl.password)
                    .then(function(response){
                        $timeout(function(){
                            $ctrl.authenticating = false;
                            $ctrl.$router.navigateByUrl('/toys/');
                        }, 1000)
                    })
                    .catch(function(error){
                        $ctrl.authenticating = false;
                        $ctrl.error = error;
                    })
            }, 1000);
        }



    }


})();