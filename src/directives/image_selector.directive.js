;(function() {
    angular
        .module('toyguay')
        .directive("imageSelector", function(){
            return {
                restrict: "E",
                scope: {
                    imageSelected: "&"
                },
                template: "<input type='file' accept='image/*' />",
                link: function(scope, element){
                    element.bind("change", function(e){
                        if(e.target.files.length > 0){
                            scope.imageSelected({
                                "file": e.target.files[0]
                            })
                        }
                    })
                }
            };
        });
    }
)();