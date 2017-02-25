(function() {
    angular
        .module('toyguay')
        .value('CONF', {
            "SERVER_BASE": "http://localhost:9001",
            "API_SERVER_BASE" : "http://toyguay.com/",
            "API_BASE" : "http://toyguay.com/api/v1/"
        })
})();