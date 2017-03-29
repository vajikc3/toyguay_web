(function() {
    angular
        .module('toyguay')
        .component('toyList', {
            templateUrl: 'src/components/toys/toy_list.tmpl.html',
            controller: ToyListComponent
        });

    ToyListComponent.$inject = ['$scope', '$uibModal', 'ToyService', 'UserService', 'CategoryService'];

    function ToyListComponent($scope, $uibModal, ToyService, UserService, CategoryService) {
        var $ctrl = this;

        /* ==== INTERFACE ==== */

        $ctrl.$onInit = onInit;
        $ctrl.getSellerAvatar = getSellerAvatar;
        $ctrl.getCategoryByName = getCategoryByName;
        $ctrl.openImageModal = openImageModal;
        $ctrl.getImageURL = getImageURL;

        init();
        /* ==== IMPLEMENTATION ==== */
        function init(){
            ToyService.searcher.activated = true;
            $ctrl.filteredList = ToyService.filteredList;
        }
        function onInit() {
            ToyService.getAll();
            init();
        }

        function getSellerAvatar(user){
            var userWithAvatar = UserService.setAvatarImageHelper(user);
            return userWithAvatar.imageURL;
        }

        function getCategoryByName(categoryName){
            return CategoryService.getCategoryByName(categoryName);
        }

        function openImageModal(imageURL) {
            var modalInstance = $uibModal.open({
              animation: true,
              component: 'toyImageModal',
              windowTemplateUrl: 'assets/uib/template/modal/window.html',
              size: 'lg',
              resolve: {
                imageURL: function () {
                  return imageURL;
                }
              }
            });
          }

          function getImageURL(toy){
            if (toy.imageURL.length === 0){
                return "http://placehold.it/250x250?text=Sin foto"
            } else {
                return toy.imageURL[0];
            }
          }
    }
})();