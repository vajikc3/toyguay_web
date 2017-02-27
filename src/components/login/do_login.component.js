(function() {
    angular
        .module('toyguay')
        .component('doLogin', {
            templateUrl: 'src/components/login/do_login.tmpl.html',
            bindings: { $router: '<' },
            controller: DoLoginComponent
        });

    DoLoginComponent.$inject = ['LoginService', 'ToyService', '$timeout', 'store', 'jwtHelper'];

    function DoLoginComponent(LoginService, ToyService,  $timeout, store, jwtHelper) {
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
                LoginService
                    .doLogin($ctrl.user, $ctrl.password)
                    .then(function(response){
                            $ctrl.authenticating = false;
                            $ctrl.$router.navigateByUrl('/toys/');
                    })
                    .catch(function(error){
                        $ctrl.error = error;
                    })
            }, 5000);
        }



    }


})();