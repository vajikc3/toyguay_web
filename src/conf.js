(function() {
    angular
        .module('toyguay')
        .value('CONF', {
            "SERVER_BASE": "http://localhost:3000",
            "API_SERVER_BASE" : "http://localhost:8000/",
            "API_BASE" : "http://localhost:8000/api/",
            "API_ENDPOINT_TOYS": "toys/",
            "API_ENDPOINT_CATEGORIES": "categories/"
        })

})();