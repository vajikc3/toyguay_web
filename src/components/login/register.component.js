(function() {
    angular
        .module('toyguay')
        .component('register', {
            templateUrl: 'src/components/login/register.tmpl.html',
            controller: Register
        });

    Register.$inject = ['LoginService']

    function Register(LoginService) {

        var $ctrl = this;
        $ctrl.user = {
            first_name: '',
            last_name: '',
            email: '',
            user: '',
            password: '',
            password_repeat: '',
            longitude: 0,
            latitude: 0,
            imageURL: '',
            state:''
        }

        /* ==== INTERFACE ==== */
        
        $ctrl.register = register;

        
        /* ==== IMPLEMENTATION ==== */
        
        function register(){
            console.log($ctrl.user);
            LoginService.register($ctrl.user);
        }
    }
})();