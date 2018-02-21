'use strict';
(function(){
 
    function navigation(){
        return{
            restrict:'EA', //element attribute
            templateUrl:'/common/directives/navigation/navigation.template.html',
            controller:'navigationCtrl',
            controllerAs:'navvm'
        };
    }
    angular
    .module('loc8rApp')
    .directive('navigation',navigation);
})();