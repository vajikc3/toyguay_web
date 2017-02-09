(function() {
    angular
        .module('toyguay')
        .component('userProfile', {
            templateUrl: 'src/components/user/user_profile.tmpl.html',
            controller: UserProfile
        });

    UserProfile.$inject = [];

    function UserProfile() {
        var $ctrl = this;

    }
})();