(function() {
    angular
        .module('toyguay')
        .service('LoginService', LoginService);

    LoginService.$inject = ['$http', '$q', '$log', 'CONF']
    LoginService.$inject = ['store', '$http', '$q', '$log', 'CONF', 'ENDPOINTS']

    function LoginService($http, $q, $log, CONF) {
        var loginData = {
            logged : false
    function LoginService(store, $http, $q, $log, CONF, ENDPOINTS) {
        var state = {
            authenticated : false
        }

        /* ==== INTERFACE ==== */
        return {
            loginData: loginData,
            doLogin: doLogin
            state: state,
            doLogin: doLogin,
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
        function doLogin(user, password){
            return $http({
                        method: 'POST',
                        url: CONF.API_BASE + ENDPOINTS.AUTHENTICATE, 
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        data: { 
                            "user": user, 
                            "email": user,
                            "password": password
                        }
                    }).then(function(response){
                        store.set('jwt', response.data.token);
                        state.authenticated = true;
                        return ({success: true})
                    }).catch(function(error){
                        $log.error("Error del sistema autenticación: ", error);
                        return $q.reject(error);
                    })
        }
    }
})();
