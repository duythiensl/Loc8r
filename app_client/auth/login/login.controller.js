'use strict';
(function(){
    
    var loginCtrl= function($location,authentication, $window){
        var vm = this;
        vm.pageHeader ={
            title : 'Sign in to Loc8r'
        };
        vm.credentials = {
            email : "",
            password : ""
        };
        vm.returnPage = $location.search().page || '/';
        vm.onSubmit = function(){
            vm.formError = "";
            if(!vm.credentials.email || !vm.credentials.password){
                vm.formError = "All fields required, please try again!";
            }else{
                vm.doLogin();
            }
        };
        vm.doLogin = function(){
            vm.formError ="formError";
            authentication
                .login(vm.credentials)
                .then(function(){
                    $location.search('page',null);
                    $location.path('vm.returnPage');

                },function(err){
                    vm.formError = err.data.message;
                });
        };
        vm.loginGoogle = function(){
            vm.disabled = true;
        	$window.location = $window.location.protocol + '//' + $window.location.host + '/api/auth/google';
         
        };
        vm.loginFacebook = function(){
        	authentication
        	.loginFacebook()
        	.then(function(response){
        		var data = response;
        		console.log('login with facebook!',data);
        	},function(err){
        		console.log(err);
        	});
        };

    };
    loginCtrl.$injector =['$location','authentication','$window'];
    angular
        .module('loc8rApp')
        .controller('loginCtrl',loginCtrl);
    
})();