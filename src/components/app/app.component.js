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
                }
            ],
            controller: AppController,
            templateUrl : 'src/components/app/app.tmpl.html'
        })

    AppController.$inject = ['LoginService'];
    
    function AppController (LoginService) {
        $ctrl = this;
        $ctrl.loginData = LoginService.loginData;
    }
})()