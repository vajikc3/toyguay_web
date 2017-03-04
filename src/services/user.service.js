(function() {
    angular
        .module('toyguay')
        .service('UserService', UserService);

    UserService.$inject = ['$http', '$q', '$log', 'CONF', 'ENDPOINTS']

    function UserService($http, $q, $log, CONF, ENDPOINTS) {

        /* ==== INTERFACE ==== */
        return {
            getUserData: getUserData
        }

        /* ==== IMPLEMENTATION ==== */
        function getUserData(id) {
            console.log("getuserdata", id);
            return $http
                .get(CONF.API_BASE + ENDPOINTS.USERS + id)
                .then(function (response) {
                    console.log("response", response);
                    return $q.when(response.data.user);
                })
                .catch(function (err) {
                    $log.error("Cannot obtain user data from ToyGuay.", err);
                    return  $q.when({});
                })
        }
    }
})();