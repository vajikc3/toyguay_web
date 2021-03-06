(function() {
    angular
        .module('toyguay')
        .component('register', {
            templateUrl: 'src/components/login/register.tmpl.html',
            bindings: { $router: '<' },
            controller: Register
        });

    Register.$inject = ['AuthenticationService', '$timeout']

    function Register(AuthenticationService, $timeout) {

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
                AuthenticationService.register($ctrl.user)
                    .then(function(response){
                        $ctrl.registering = false;
                        AuthenticationService
                            .doLogin($ctrl.user.user, $ctrl.user.password)
                            .then(function(){
                                $ctrl.$router.navigateByUrl('/toys/');
                            })
                            .catch(function(){
                                $ctrl.$router.navigateByUrl('/login/');
                            })
                    })
                    .catch(function(error){
                        $ctrl.error = error;
                    });
            }, 5000);
        }
    }
})();