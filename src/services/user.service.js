(function() {
    angular
        .module('toyguay')
        .service('UserService', UserService);

    UserService.$inject = ['$http', '$q', '$log', 'CONF', 'ENDPOINTS', 'lodash']

    function UserService($http, $q, $log, CONF, ENDPOINTS, lodash) {

        /* ==== INTERFACE ==== */
        return {
            getUserData: getUserData,
            setAvatarImageHelper: setAvatarImageHelper,
            getUserSellingToyCount:getUserSellingToyCount
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

        function getUserSellingToyCount(userID){
            return $http
                .get(CONF.API_BASE + ENDPOINTS.TOYS + "?seller=" + userID)
                .then(function (response) {
                    if(!response.data.sucess){
                        return $q.reject(response.data.error);
                    }
                    var sellingToys = lodash.filter(response.data.rows, {state: 'selling'});
                    return $q.when(sellingToys);
                })
                .catch(function (err) {
                    $log.error("Cannot obtain user selling toy data from ToyGuay.", err);
                    return  $q.reject(err);
                })
        }

    }
})();