(function() {
    angular
        .module('toyguay')
        .value('CONF', {
            "SERVER_BASE": "http://localhost:9001",
            "API_SERVER_BASE" : "http://localhost:3000/",
            "API_BASE" : "http://localhost:3000/api/v1/",
            "AZURE_IMAGES_API":"http://toyguay-image-api.azurewebsites.net/",
            "AZURE_IMAGES_BASE":"https://toyguay.blob.core.windows.net/toyguay-image-container/"
        })
})();