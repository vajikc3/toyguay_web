(function() {
    angular
        .module('toyguay')
        .component('register', {
            templateUrl: 'src/components/login/register.tmpl.html',
            bindings: { $router: '<' },
            controller: Register
        });

    Register.$inject = ['LoginService', '$timeout']

    function Register(LoginService, $timeout) {

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
            city: '',
            province: '',
            country: '',
            state:''
        }
        $ctrl.registering = false;
        $ctrl.error = null;


        /* ==== INTERFACE ==== */
        
        $ctrl.register = register;

        
        /* ==== IMPLEMENTATION ==== */
        
        function register(){
            $ctrl.user.imageURL = 'https://robohash.org/' + $ctrl.user.user;
            $ctrl.registering = true;
            $timeout(function(){
                LoginService.register($ctrl.user)
                    .then(function(response){
                            $ctrl.registering = false;
                            $ctrl.$router.navigateByUrl('/toys/');
                    })
                    .catch(function(err){
                        $ctrl.error = error;
                    });
            }, 5000);
        }
    }
})();