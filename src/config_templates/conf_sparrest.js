(function() {
    angular
        .module('toyguay')
        .value('CONF', {
            "SERVER_BASE": "http://localhost:9001",
            "API_SERVER_BASE" : "http://localhost:9000/",
            "API_BASE" : "http://localhost:9000/api/"
        })

})();