(function() {
    angular
        .module('toyguay')
        .service('ToyService', ToyService);

    ToyService.$inject = ['$http', '$q', '$log', 'CONF', 'ENDPOINTS', 'UserService', 'azureBlob']

    function ToyService($http, $q, $log, CONF, ENDPOINTS, UserService, azureBlob) {

        var filteredList = {
            items: null
        };

        var searcher = {
            activated : false,
            criteria : {}
        }

        /* ==== INTERFACE ==== */
        return {
            get: get,
            getAll: getAll,
            sell: sell,
            filteredList: filteredList,
            applySearchFilter: applySearchFilter,
            search: search,
            searcher: searcher,
            uploadImage: uploadImage
        }

        /* ==== IMPLEMENTATION ==== */

        function get(id) {
            if (!id) return $q.reject({error:"Falta ID de producto"})
            return $http
                .get(CONF.API_BASE + ENDPOINTS.TOYS + id)
                .then(function (response) {
                    // BAckend Devuelve el objeto toy dentro de un objeto error
                    //    --> cuando se corrija se debería de volvera poner `return $q.when(response.data);`
                    console.log("toy.service get", response)
                    return $q.when(response.data.error);
                })
                .catch(function (err) {
                    $log.error("Cannot obtain product data from ToyGuay. Try again later...", err)
                    return $q.reject(err.data.error)
                })
        }

        function getAll(criteria){
            var queryParams = [];
            if(!!criteria){
                searcher.criteria = criteria;
            }
            if (searcher.criteria.category) {
                queryParams.push("category=" + searcher.criteria.category);
            }
            return $http
                .get(CONF.API_BASE + ENDPOINTS.TOYS + '?' + queryParams.join('&'))
                .then(function (response) {
                    console.log("getall response", response)
                    // Almacena la lista de productos en filteredList.items
                    filteredList.items = response.data.rows;
                    return $q.when(filteredList.items);
                })
                .catch(function (err) {
                    $log.error("Cannot obtain toy list from ToyGuay. Try again later...", err);
                    return  $q.reject([]);
                })
        }

        function search(text, criteria) {
            console.log("search", text, criteria)
            return getAll(criteria)
                .then(function (toys) {
                    console.log("search response", toys)
                    if (!toys) return $q.when([]);
                    filteredList.items = toys.filter(function(toy) {
                        var res = applySearchFilter(toy, text)
                        return res;
                    })
                    console.log("search filteredList", filteredList)
                    return $q.when(filteredList.items);
                })
                .catch(function (err) {
                    $log.error("Cannot obtain product data from ToyGuay. Try again later...", err)
                    filteredList.items = [];
                    return $q.reject(filteredList.items)
                })
        }

        function applySearchFilter(toy, text) {
            console.log("applySearchFilter", text, toy);
            var lowercaseQuery = angular.lowercase(text);
            var lowercaseToyName = angular.lowercase(toy.name);
            var lowercaseToyDesc = angular.lowercase(toy.description);
            var comp1 = lowercaseToyName.indexOf(lowercaseQuery) >= 0;
            var comp2 = lowercaseToyDesc.indexOf(lowercaseQuery) >= 0;
            return  comp1 || comp2;
        }

        function sell(toy){
            if (!toy.categories || toy.categories.length === 0) {
                toy.categories = ['default'].join(',');
            }
            return $http({
                method: 'POST',
                url: CONF.API_BASE + ENDPOINTS.TOYS,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: toy
            }).then(function(response){
                return $q.when({success: true});
            }).catch(function(error){
                $log.error("Error del sistema autenticación: ", error);
                return $q.reject(error);
            });
        }

        function uploadImage(file){
            console.log("llega");
            return azureBlob.upload({
              baseUrl: 'https://toyguay.blob.core.windows.net/toyguay-image-container/',// baseUrl for blob file uri (i.e. http://<accountName>.blob.core.windows.net/<container>/<blobname>),
              sasToken: '?sv=2016-05-31&ss=b&srt=sco&sp=rwdlac&se=2017-05-30T23:10:02Z&st=2017-03-12T16:10:02Z&spr=https,http&sig=m4iDUx39YwN2Md%2FTf8XKakYIB%2F2shegPWBbY1yU9UfU%3D',// Shared access signature querystring key/value prefixed with ?,
              file: file, // File object using the HTML5 File API,
              progress: function(){console.log("progress")},// progress callback function,
              complete: function(response){console.log("complete");$q.when(response)},// complete callback function,
              error: function(){console.log("error")},// error callback function,
              blockSize: 1024// Use this to override the DefaultBlockSize,
            })
            // return $http.put("https://toyguay.blob.core.windows.net/?sv=", 
            //                 file, {headers:"Authorization": })
            //     .then(function(response){
            //         return $q.when(response);
            //     })
            //     .catch(function(err){
                //     console.log("error azure", err);
                //     return $q.reject(err);
                // })
        }


    }
})();