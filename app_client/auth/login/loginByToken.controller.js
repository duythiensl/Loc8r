'use strict';
(function(){
    var loginByTokenCtrl= function (authentication,$routeParams){
        var vm = this;
        vm.token = $routeParams.token;
        authentication
        .loginByToken(vm.token);
    };
    loginByTokenCtrl.$injector=['authentication','$routeParams'];
    angular
        .module('loc8rApp')
        .controller('loginByTokenCtrl',loginByTokenCtrl);   
}());