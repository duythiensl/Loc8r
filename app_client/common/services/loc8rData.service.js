'use strict';
(function(){ 
    angular
        .module('loc8rApp')
        .service('loc8rData',loc8rData);
    loc8rData.$injector = ['$http','authentication'];    
    function loc8rData($http,authentication) {
         var locationByCoords = function (lat, lng) {
            // return $http.get('/api/locations?lng=' + lng + '&lat=' + lat +'&maxDistance=20');
             return $http.get('/api/locations?lng=-0.9690884&lat=51.4550410&maxDistance=20');
         };
         var locationById = function(locationid){
            return $http.get('/api/locations/' + locationid);
         };

        var config = {
                headers: {
                   Authorization: 'Bearer '+ authentication.getToken()
               } 
            };
         var addReviewById = function(locationid,data){
            
            return $http.post('/api/locations/'+locationid+ '/reviews',data,config);
         };
         return {
             locationByCoords : locationByCoords,
             locationById :locationById,
             addReviewById:addReviewById
         };
    }    
})();