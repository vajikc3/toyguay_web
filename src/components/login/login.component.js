(function() {
    angular
        .module('toyguay')
        .component('login', {
            $routeConfig: [
                {
                    path: '/login',
                    name: 'DoLogin',
                    component: 'doLogin',
                    useAsDefault: true
                },
                {
                     path: '/register',
                     name: 'Register',
                     component: 'register'
                }
            ],
            template: '<ng-outlet></ng-outlet>'
        })
})()