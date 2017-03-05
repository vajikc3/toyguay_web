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

    AppController.$inject = ['AuthenticationService', 'UserService', '$scope'];
    
    function AppController (AuthenticationService, UserService, $scope) {
        $ctrl = this;
        $ctrl.loginState = AuthenticationService.state;
        $ctrl.logout = logout;

        $ctrl.$onInit = onInit;

        init();

        function onInit(){
            console.log("oninit");
        }
        function init(){
            AuthenticationService.refreshState();
            console.log($ctrl.loginState)
        }

        function logout() { 
            AuthenticationService.logout();
        }

        $ctrl.updateUser = function (){
            $ctrl.user = AuthenticationService.getLoggedUserData();
            console.log($ctrl.user)
        }

    }

})();