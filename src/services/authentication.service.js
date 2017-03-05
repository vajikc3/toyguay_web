(function() {
    angular
        .module('toyguay')
        .service('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['store', 'jwtHelper', '$http', '$q', '$log', 'CONF', 'ENDPOINTS', 'UserService']

    function AuthenticationService(store, jwtHelper, $http, $q, $log, CONF, ENDPOINTS, UserService) {
        var state = {
            authenticated : false,
            loggedUserData: {}
        }

        /* ==== INTERFACE ==== */
        return {
            state: state,
            refreshState: refreshState,
            doLogin: doLogin,
            register: register,
            logout: logout,
            getTokenData: getTokenData,
            recoverPass: recoverPass
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
                return {success: true}
            }).catch(function(error){
                $log.error("Error del sistema autenticación: ", error);
                return error;
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
                // console.log("register response", response);
                // updateLoginData(response.data.token);
                return $q.when({success: true})
            }).catch(function(error){
                $log.error("Error del sistema autenticación: ", error);
                return $q.reject(error);
            })
        }

        function updateLoginData(token){
            store.set('jwt', token);
            setLoggedUserData()
        }

        function removeLoginData(){
            store.remove('jwt');
            state.authenticated = false;
            state.loggedUserData = {};
        }

        function getTokenData(){
            var token = store.get('jwt');
            if (!token) return false;
            var decodedToken = jwtHelper.decodeToken(token);
            return decodedToken;
        }

        function isLogged(){
            if (!store.get('jwt')) return false;
            return true;
        }

        function hasLoggedUserData(){
            if (!state.loggedUserData.first_name) return false;
            return true;
        }

        function setLoggedUserData(){
            var userID = getTokenData().id;
            UserService
                .getUserData(userID)
                .then(function(user){
                    if (!user.imageURL){
                        user = UserService.setAvatarImageHelper(user);
                    }
                    state.loggedUserData = user;
                    state.authenticated = true;
                    return "OK"
                })
                .catch(function(err){
                    logout();
                    return "KO";
                });

        }

        function refreshState(){
            if (isLogged() && !hasLoggedUserData()) {
                setLoggedUserData()
            }
        }

        function recoverPass(userOrEmail){
            var user = {
                user: userOrEmail,
                email: userOrEmail
            }
            return $http({
                method: 'POST',
                url: CONF.API_BASE + ENDPOINTS.RECOVER, 
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: user
            }).then(function(response){
                return $q.when({success: true})
            }).catch(function(error){
                $log.error("Error del sistema recuperación de contraseña: ", error);
                return $q.reject(error);
            })

        }

    }
})();
