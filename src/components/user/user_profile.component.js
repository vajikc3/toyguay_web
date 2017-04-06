(function() {
    angular
        .module('toyguay')
        .component('userProfile', {
            templateUrl: 'src/components/user/user_profile.tmpl.html',
            controller: UserProfile
        });

    UserProfile.$inject = ['ToyService'];

    function UserProfile(ToyService) {
        var $ctrl = this;


        init();

        function init(){
            ToyService.searcher.activated = false;
        }
    }
})();