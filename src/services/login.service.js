(function() {
    angular
        .module('toyguay')
        .service('LoginService', LoginService);

    LoginService.$inject = ['store', 'jwtHelper', '$http', '$q', '$log', 'CONF', 'ENDPOINTS', 'UserService']

    function LoginService(store, jwtHelper, $http, $q, $log, CONF, ENDPOINTS, UserService) {
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
            getTokenData: getTokenData
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
            console.log("updateLoginData", token);
            store.set('jwt', token);
            console.log(store.get('jwt'))
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
            console.log("userid", userID, getTokenData())
            UserService
                .getUserData(userID)
                .then(function(user){
                    console.log("loggin user", user)
                    if (!user.imageURL){
                        user = UserService.setAvatarImageHelper(user);
                    }
                    state.loggedUserData = user;
                    state.authenticated = true;
                    return "OK"
                })
                .catch(function(err){
                    console.log("loggin user ERR", err)
                    logout();
                    return "KO";
                });

        }

        function refreshState(){
            if (isLogged() && !hasLoggedUserData()) {
                setLoggedUserData()
            }
        }
    }
})();
