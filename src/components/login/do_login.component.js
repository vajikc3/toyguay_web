(function() {
    angular
        .module('toyguay')
        .component('doLogin', {
            templateUrl: 'src/components/login/do_login.tmpl.html',
            bindings: { $router: '<' },
            controller: DoLoginComponent
        });

    DoLoginComponent.$inject = ['LoginService'];

    function DoLoginComponent(LoginService) {
        var $ctrl = this;
        $ctrl.doLogin = doLogin;


        //IMPL
        function doLogin() {
            LoginService.doLogin();
            this.$router.navigateByUrl('/toys/');
        }

    }


})();