(function() {
    angular
        .module('toyguay')
        .service('LoginService', LoginService);

    LoginService.$inject = ['$http', '$q', '$log', 'CONF']

    function LoginService($http, $q, $log, CONF) {
        var loginData = {
            logged : false
        }

        /* ==== INTERFACE ==== */
        return {
            loginData: loginData,
            doLogin: doLogin
        }

        /* === IMPLEMENTATION === */
        function doLogin(){
            $http({
                method: 'POST',
                url: 'http://localhost:3000/api/v1/users/authenticate', 
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: { 
                    "user": "bardal", 
                    "password": "admin"
                }
            }).then(function(res){
                console.log("LOGIN", res);
            })
            //loginData.logged = true;
        }
    }
})();
