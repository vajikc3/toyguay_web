(function() {
    angular
        .module('toyguay')
        .component('doLogin', {
            templateUrl: 'src/components/login/do_login.tmpl.html',
            bindings: { $router: '<' },
            controller: DoLoginComponent
        });

    DoLoginComponent.$inject = ['LoginService', '$timeout', 'store', 'jwtHelper'];

    function DoLoginComponent(LoginService, $timeout, store, jwtHelper) {
        var $ctrl = this;
        $ctrl.authenticating = false;
        $ctrl.user = '';
        $ctrl.password = '';
        $ctrl.error = null;

        $ctrl.doLogin = doLogin;
        $ctrl.closeAlert = closeAlert;
        
        //IMPL
        function doLogin() {
            $ctrl.authenticating = true;
            console.log("user", $ctrl.user)
            LoginService
                .doLogin($ctrl.user, $ctrl.password)
                .then(function(response){
                    $timeout(function(){
                        $ctrl.$router.navigateByUrl('/toys/');
                    }, 1000);
                })
                .catch(function(error){
                    $ctrl.error = error;
                })
                .finally(function(){
                    $ctrl.authenticating = false;
                });
        }

        function closeAlert(){

        }
    }


})();