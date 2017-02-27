(function() {
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
            templateUrl : 'src/components/app/app.tmpl.html'
        })

    AppController.$inject = ['LoginService', '$scope'];
    
    function AppController (LoginService, $scope) {
        $ctrl = this;
        $ctrl.logout = logout;
        $ctrl.loginState = LoginService.state;

        function logout() {
            LoginService.logout();
        }
    }

})()