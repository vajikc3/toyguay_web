(function() {
    angular
        .module('toyguay')
        .service('LoginService', LoginService);

    LoginService.$inject = ['store', '$http', '$q', '$log', 'CONF', 'ENDPOINTS']

    function LoginService(store, $http, $q, $log, CONF, ENDPOINTS) {
        var state = {
            authenticated : !!store.get('jwt')
        }

        /* ==== INTERFACE ==== */
        return {
            state: state,
            doLogin: doLogin,
            register: register,
            logout: logout
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



    }
})();
