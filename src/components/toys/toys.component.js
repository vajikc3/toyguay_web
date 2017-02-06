(function() {
    angular
        .module('toyguay')
        .component('toys', {
            $routeConfig: [
                {
                    path: '/',
                    name: 'ToyList',
                    component: 'toyList',
                    useAsDefault: true
                },
                {
                    path: '/:id',
                    name: 'ToyDetail',
                    component: 'toyDetail'
                }
            ],
            template: '<ng-outlet></ng-outlet>'
        })
})()