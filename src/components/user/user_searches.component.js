(function() {
    angular
        .module('toyguay')
        .component('userSearches', {
            templateUrl: 'src/components/user/user_searches.tmpl.html',
            controller: UserSearches
        });

    UserSearches.$inject = [];

    function UserSearches() {
        var $ctrl = this;

    }
})();