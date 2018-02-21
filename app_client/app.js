// if (window.location.pathname !== '/') {
//    window.location.href = '/#' + window.location.pathname;
// }
'use strict';

(function(){
    // angular.module('loc8rApp',['socialLogin','ui.bootstrap','ngRoute','ngSanitize']);
    // function config($routeProvider,$locationProvider,$httpProvider,socialProvider){
     angular.module('loc8rApp',['ui.bootstrap','ngRoute','ngSanitize']);

    function config($routeProvider,$locationProvider,$httpProvider){
    	$httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With']; //fix loi header
        
     //    socialProvider.setGoogleKey("206179895507-v4u0aprobcoh5cfarlva3m621ne96t5c.apps.googleusercontent.com");
        $locationProvider.html5Mode(true);
        // $locationProvider.hashPrefix('!');
        $routeProvider
        .when('/',{
            templateUrl:'home/home.view.html',
            controller:'homeCtrl',
            controllerAs:'vm', // ViewModel   
            })
        .when('/about',{
            templateUrl:'common/views/genericText.view.html',
            controller:'aboutCtrl',
            controllerAs:'vm'
        })
        .when('/location/:locationid',{
            templateUrl:'/locationDetail/locationDetail.view.html',
            controller:'locationDetailCtrl',
            controllerAs:'vm'
        })
        .when('/register',{
            templateUrl:'/auth/register/register.view.html',
            controller: 'registerCtrl',
            controllerAs: 'vm'
        })
        .when('/login',{
            templateUrl :'/auth/login/login.view.html',
            controller : 'loginCtrl',
            controllerAs : 'vm'
        })
        .when('/forgot',{
        	templateUrl: '/auth/forgotpassword/forgotpassword.view.html',
        	controller:'forgotCtrl',
        	controllerAs :'vm'
        })
        .when('/reset/:token',{
        	templateUrl:'/auth/resetpassword/resetpassword.view.html',
        	controller:'resetpasswordCtrl',
        	controllerAs:'vm'
        })
        .when('/callback/:token',{
            templateUrl :'/home/home.view.html',
            controller : 'loginByTokenCtrl',
            controllerAs : 'vm'
        })
        .otherwise({redirectTo:'/'}); 
    }
    angular
        .module('loc8rApp')
        .config(['$routeProvider','$locationProvider','$httpProvider',config]);
         // .config(['$routeProvider','$locationProvider','$httpProvider','socialProvider',config]);
})();