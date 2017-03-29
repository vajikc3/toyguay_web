;(function() {
    angular
        .module('toyguay')
        .directive("imageSelector", function(){
            return {
                restrict: "E",
                scope: {
                    imageSelected: "&"
                },
                template: "<input class='fileinput' type='file' accept='image/*' data-filename-placement='inside'/>",
                link: function(scope, element, attr){
                    element.find('input').attr('id' , "input_" + attr.id);
                    $('#input_' + attr.id).bootstrapFileInput();
                    $('.file-inputs').bootstrapFileInput();
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