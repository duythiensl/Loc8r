'use strict';
(function(){
   
        function authentication($window,$http,$location){
        	delete $http.defaults.headers.common['X-Requested-With'];
            var saveToken = function(token){
                $window.localStorage['loc8r-token'] = token;
            };
            var getToken = function(){
                return $window.localStorage['loc8r-token'];
            };
            var register = function(user){
                return $http.post('/api/register',user).then(function(data){

                     data = data.data;    

                    saveToken(data.token);
                });
            };
            var login = function(user){
                return $http.post('/api/login',user).then(function(data){
                    data = data.data;   
                    saveToken(data.token);
                   
                });
            };
            var loginByToken = function(token){
                $location.path('/');
                return saveToken(token);
               
            };
    
            var logout = function(){
                $window.localStorage.removeItem('loc8r-token');
                $window.location.reload();
            };
            var isLoggedIn = function(){
                var token = getToken();
              
                if(token){
                    var payload = JSON.parse($window.atob(token.split('.')[1]));
                    return payload.exp > Date.now() / 1000;

                }else{
                    return false;
                }
            };
            var currentUser = function(){
                if(isLoggedIn()){
                    var token = getToken();
                    var payload = JSON.parse($window.atob(token.split('.')[1]));    
                    return{
                        email : payload.email,
                        name : payload.name
                    };
                }
            };
            var forgot = function(email){
            	return $http.post('/api/forgot',email).then(function(data){
            		 data = data.data;
            	});
            };
            var resetpassword = function(token,password){

            	return $http.post('/api/reset/'+token+'/'+password).then(function(data){
            		return data;
            	});
            };
            return{
                saveToken : saveToken,
                getToken : getToken,
                register : register,
                login : login,
                loginByToken:loginByToken,
                logout : logout,
                isLoggedIn : isLoggedIn,
                currentUser : currentUser,
                forgot :forgot,
                resetpassword:resetpassword
            };
        }
       
        authentication.$injector = ['$window','$http'];     
        angular.module('loc8rApp')
        .service('authentication',authentication);

})();

