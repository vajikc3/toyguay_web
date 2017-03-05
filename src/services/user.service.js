(function() {
    angular
        .module('toyguay')
        .service('UserService', UserService);

    UserService.$inject = ['$http', '$q', '$log', 'CONF', 'ENDPOINTS']

    function UserService($http, $q, $log, CONF, ENDPOINTS) {

        /* ==== INTERFACE ==== */
        return {
            getUserData: getUserData,
            setAvatarImageHelper: setAvatarImageHelper
        }

        /* ==== IMPLEMENTATION ==== */
        function getUserData(id) {
            return $http
                .get(CONF.API_BASE + ENDPOINTS.USERS + id)
                .then(function (response) {
                    if(!response.data.sucess){
                        return $q.reject(response.data.error);    
                    }
                    response.data.user = setAvatarImageHelper(response.data.user);
                    return $q.when(response.data.user);
                })
                .catch(function (err) {
                    $log.error("Cannot obtain user data from ToyGuay.", err);
                    return  $q.reject(err);
                })
        }

        function setAvatarImageHelper(user){
            if (!user) return;
            if (!user.nick_name) return user.imageURL = 'https://robohash.org/' + (new Date()).getTime();
            user.imageURL = 'https://robohash.org/' + user.nick_name;
            return user;
        }

    }
})();