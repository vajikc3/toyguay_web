(function() {
    angular
        .module('toyguay')
        .component('register', {
            templateUrl: 'src/components/login/register.tmpl.html',
            controller: Register
        });

    Register.$inject = ['LoginService']

    function Register(LoginService) {

    /*
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let nick_name = req.body.user;
    let password = req.body.password;
    let password_repeat = req.body.password_repeat;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let imageURL = req.body.imageURL;
    let state = req.body.state;
    */
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

        $ctrl.register = register;

        function register(){
            console.log($ctrl.user);
            LoginService.register($ctrl.user);
        }

        
    }


})();