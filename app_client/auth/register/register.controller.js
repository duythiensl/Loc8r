'use strict';
(function(){
        var registerCtrl = function($location,authentication){
        var vm = this;
        vm.pageHeader ={
            title: 'Create a new Loc8r account'
        };
        vm.credentials = {
            name : "",
            email : "",
            password : ""
        };
        vm.returnPage = $location.search().page || '/';
        vm.onSubmit = function(){
        	var password = document.getElementById("txtPassword").value;
	        var confirmPassword = document.getElementById("txtConfirmPassword").value;
            vm.formError = "";
            if(!vm.credentials.name || !vm.credentials.email || !vm.credentials.password){
                vm.formError = "All fields required, please try again!";
            }if(password !== confirmPassword) {
	            vm.formError="Passwords do not match.";
	            return false;
	        }
            else{
                vm.doRegister();
                return true;
            }
        };
        vm.doRegister = function(){
             
            vm.formError ="form Error";
            authentication
                .register(vm.credentials)
                .then(function(){
                    $location.search('page',null);
                    $location.path(vm.returnPage);

                },function(err){

                    vm.formError = err.data.message;
                });
        };
    };
    registerCtrl.$injector =['$location','authentication'];
    angular
        .module('loc8rApp')
        .controller('registerCtrl',registerCtrl);
    

})();