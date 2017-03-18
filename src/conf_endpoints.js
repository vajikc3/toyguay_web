(function() {
    angular
        .module('toyguay')
        .value('ENDPOINTS', {
            "TOYS": "toys/",
            "CATEGORIES": "categories/",
            "USERS": "users/",
            "AUTHENTICATE": "users/authenticate",
            "REGISTER": "users/register",
            "RECOVER": "users/recover"
        })

})();