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
            templateUrl : 'src/components/app/app.tmpl.html'
        })

    AppController.$inject = ['LoginService', 'UserService', '$scope'];
    
    function AppController (LoginService, UserService, $scope) {
        $ctrl = this;
        $ctrl.logout = logout;
        $ctrl.loginState = LoginService.state;
        $ctrl.user = {};

        init();

        function init(){
            var userID = LoginService.getJWTData().id;
            if (userID){
                UserService
                    .getUserData(userID)
                    .then(function(user){
                    $ctrl.user = user;
                    $ctrl.user.imageURL = 'https://robohash.org/' + $ctrl.user.nick_name;
                });
            }
        }

        function logout() {
            LoginService.logout();
        }
    }

})();