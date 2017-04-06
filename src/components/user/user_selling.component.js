(function() {
    angular
        .module('toyguay')
        .component('userSelling', {
            templateUrl: 'src/components/user/user_selling.tmpl.html',
            controller: UserSelling
        });

    UserSelling.$inject = [];

    function UserSelling() {
        var $ctrl = this;

    }
})();