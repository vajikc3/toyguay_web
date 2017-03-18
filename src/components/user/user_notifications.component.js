(function() {
    angular
        .module('toyguay')
        .component('userNotifications', {
            templateUrl: 'src/components/user/user_notifications.tmpl.html',
            controller: UserNotifications
        });

    UserNotifications.$inject = [];

    function UserNotifications() {
        var $ctrl = this;

    }
})();