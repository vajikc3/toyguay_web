(function() {
    angular
        .module('toyguay')
        .component('userSold', {
            templateUrl: 'src/components/user/user_sold.tmpl.html',
            controller: UserSold
        });

    UserSold.$inject = [];

    function UserSold() {
        var $ctrl = this;

    }
})();