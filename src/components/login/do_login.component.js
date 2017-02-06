(function() {
    angular
        .module('toyguay')
        .component('doLogin', {
            templateUrl: 'src/components/login/do_login.tmpl.html',
            controller: DoLoginComponent
        });

    DoLoginComponent.$inject = ['LoginService']

    function DoLoginComponent(LoginService) {
        var $ctrl = this;

        var $ctrl.doLogin = LoginService.doLogin;

        
    }


})();