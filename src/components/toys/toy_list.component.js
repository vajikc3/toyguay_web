(function() {
    angular
        .module('toyguay')
        .component('toyList', {
            templateUrl: 'src/components/toys/toy_list.tmpl.html',
            controller: ToyListComponent
        });

    ToyListComponent.$inject = ['$scope', 'ToyService', 'UserService', 'CategoryService'];

    function ToyListComponent($scope, ToyService, UserService, CategoryService) {
        var $ctrl = this;

        /* ==== INTERFACE ==== */

        $ctrl.$onInit = onInit;
        $ctrl.getSellerAvatar = getSellerAvatar;
        $ctrl.getCategoryByName = getCategoryByName;

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
    }
})();