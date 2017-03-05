;(function() {
    angular
        .module('toyguay')
        .component('app', {
            $routeConfig: [
                {
                    name: 'Toys',
                    path: '/toys/...',
                    component: 'toys',
                    useAsDefault: true
                },
                {
                    name: 'Login',
                    path: '/login/...',
                    component: 'login'
                },
                {
                    name: 'User',
                    path: '/user/...',
                    component: 'user'
                }
            ],
            controller: AppController,
            bindings: { $router: '<' },
            templateUrl : 'src/components/app/app.tmpl.html'
        })

    AppController.$inject = ['LoginService', 'UserService', '$scope'];
    
    function AppController (LoginService, UserService, $scope) {
        $ctrl = this;
        $ctrl.loginState = LoginService.state;
        $ctrl.logout = logout;

        $ctrl.$onInit = onInit;

        init();

        function onInit(){
            console.log("oninit");
        }
        function init(){
            LoginService.refreshState();
            console.log($ctrl.loginState)
        }

        function logout() { 
            LoginService.logout();
        }

        $ctrl.updateUser = function (){
            $ctrl.user = LoginService.getLoggedUserData();
            console.log($ctrl.user)
        }

    }

})();