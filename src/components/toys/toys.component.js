(function() {
    /*
     El componente de productos contiene la lista de productos
     y el detalle de producto (productList y productDetail)
     */
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