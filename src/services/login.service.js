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

        function doLogin(){
            loginData.logged = true;
        }
    }
})();
