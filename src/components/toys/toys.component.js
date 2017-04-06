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
                },
                {
                    path: '/sell',
                    name: 'ToySell',
                    component: 'toySell'
                }
            ],
            template: '<ng-outlet></ng-outlet>'
        })
})()