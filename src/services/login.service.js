(function() {
    angular
        .module('toyguay')
        .service('LoginService', LoginService);

    LoginService.$inject = ['store', 'jwtHelper', '$http', '$q', '$log', 'CONF', 'ENDPOINTS']

    function LoginService(store, jwtHelper, $http, $q, $log, CONF, ENDPOINTS) {
        var state = {
            authenticated : !!store.get('jwt')
        }

        /* ==== INTERFACE ==== */
        return {
            state: state,
            doLogin: doLogin,
            register: register,
            logout: logout,
            getJWTData: getJWTData
        }

        /* === IMPLEMENTATION === */
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
                        updateLoginData(response.data.token)
                        return ({success: true})
                    }).catch(function(error){
                        $log.error("Error del sistema autenticación: ", error);
                        return $q.reject(error);
                    })
        }
        
        function logout(){
            removeLoginData();
        }

        function register(user){
            return $http({
                        method: 'POST',
                        url: CONF.API_BASE + ENDPOINTS.REGISTER, 
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        data: user
                    }).then(function(response){
                        updateLoginData(response.data.token)
                        return ({success: true})
                    }).catch(function(error){
                        $log.error("Error del sistema autenticación: ", error);
                        return $q.reject(error);
                    })
        }

        function updateLoginData(token){
            store.set('jwt', token);
            state.authenticated = true;
        }

        function removeLoginData(){
            store.remove('jwt');
            state.authenticated = false;
        }

        function getJWTData(){
            var jwt = store.get('jwt');
            if (!jwt) return false;
            var decodedToken = jwtHelper.decodeToken(jwt);
            console.log(decodedToken);
            return decodedToken;
        }




    }
})();
