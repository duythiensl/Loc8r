'use strict';
(function(){
        var resetpasswordCtrl =function( $timeout,$routeParams,$location,authentication){
		var vm = this;
		
		vm.pageHeader = {
			title:"Reset password Loc8r user!"
		};
		vm.credentials = {
			password:""
		};
		vm.returnPage = "";

		vm.onSubmit= function(){
			vm.formError = "";
			
			var password = document.getElementById('txtPassword').value;
			var confirmPassword = document.getElementById('txtConfirmPassword').value;
			if(!vm.credentials){
				vm.formError='All fields required, please try again';
			}if(password !== confirmPassword){
				vm.formError ='Passwords do not match';
			}else{
				vm.doResetpassword(password);
			}
		};
		vm.doResetpassword = function(password){
			vm.token = $routeParams.token;
			vm.formError = "";
			vm.formSuccess = '';
			authentication
            .resetpassword(vm.token,password)
            .then(function(dataTaked){
                var Data = dataTaked.data;
                $timeout( function(){
                    $location.path('/login');
                }, 5000 );
                vm.time = 5000;
                

                var timer = function() {
                if( vm.time > 1000 ) {
                    vm.time -= 1000;
                    vm.formSuccess = Data.successMsg + " redirecting to login ("+(vm.time/1000) +"s )";
                    $timeout(timer, 1000);
                    }
                };

                $timeout(timer, 1000);        
           },function(err){
               vm.formError = err.statusText;
           });
        };
    };
    resetpasswordCtrl.$injector=['$timeout','$routeParams','$location','authentication'];

    angular
    .module('loc8rApp')
    .controller('resetpasswordCtrl', resetpasswordCtrl);
})();