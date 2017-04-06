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

    AppController.$inject = ['AuthenticationService', 'UserService', '$scope', 'ToyService'];

    function AppController (AuthenticationService, UserService, $scope, ToyService) {
        $ctrl = this;
        $ctrl.loginState = AuthenticationService.state;
        $ctrl.logout = logout;
        $ctrl.searcher = ToyService.searcher;

        $ctrl.$onInit = onInit;

        init();

        function onInit(){

        }
        function init(){
            AuthenticationService.refreshState();
        }

        function logout() { 
            AuthenticationService.logout();
        }

        $ctrl.updateUser = function (){
            $ctrl.user = AuthenticationService.getLoggedUserData();
        }

    }

})();