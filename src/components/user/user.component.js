(function() {
    angular
        .module('toyguay')
        .component('user', {
            $routeConfig: [
                {
                    path: '/selling',
                    name: 'UserSelling',
                    component: 'userSelling',
                    useAsDefault: true
                },
                {
                    path: '/sold',
                    name: 'UserSold',
                    component: 'userSold'
                },
                {
                    path: '/searches',
                    name: 'UserSearches',
                    component: 'userSearches'
                },
                {
                    path: '/profile',
                    name: 'UserProfile',
                    component: 'userProfile'
                },
                {
                    path: '/notifications',
                    name: 'UserNotifications',
                    component: 'userNotifications'
                }
            ],
            template: '<ng-outlet></ng-outlet>'
        })
})()