'use strict';
(function(){
	
	var forgotCtrl= function(authentication){
		var vm = this;
		vm.pageHeader = {
			title : 'Forgot password Loc8r user'
		};
		vm.credentials = {
			email:''
		};
		vm.onSubmit = function(){
			vm.formError = '';
			vm.formSuccess='';
			if(!vm.credentials.email){
				vm.formError = "All fields required, please try again!";
			}else{
				vm.sendToEmail();
			}
		};
		vm.sendToEmail = function(){
	
			vm.formError='';
			vm.formSuccess='';
			authentication
				.forgot(vm.credentials)
				.then(function(){
					 vm.formSuccess = 'An e-mail has been sent to your mail with further instructions!';
					
				},function(err){
					vm.formError = err.data.statusText;
				});	
		};
	};
    forgotCtrl.$injector=['authentication'];
    angular
        .module('loc8rApp')
        .controller('forgotCtrl',forgotCtrl);
    
})();