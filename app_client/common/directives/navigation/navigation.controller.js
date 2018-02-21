'use strict';
(function(){
    function navigationCtrl($location,authentication){
        var vm = this;
        vm.currentPath = $location.path();
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentUser = authentication.currentUser();
        vm.logout = function() {
           authentication.logout();
           $location.path('/');
       }; 
    }
    navigationCtrl.$inject = ['$location', 'authentication'];
    angular
        .module('loc8rApp')
        .controller('navigationCtrl',navigationCtrl);
})();