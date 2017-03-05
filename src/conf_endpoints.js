(function() {
    angular
        .module('toyguay')
        .value('ENDPOINTS', {
            "TOYS": "toys/",
            "CATEGORIES": "categories/",
            "AUTHENTICATE": "users/authenticate",
            "REGISTER": "users/register",
            "USERS": "users/"
        })

})();