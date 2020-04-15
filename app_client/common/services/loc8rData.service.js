'use strict';
(function () {
    angular
        .module('loc8rApp')
        .service('loc8rData', loc8rData);
    loc8rData.$injector = ['$http', 'authentication'];
    function loc8rData($http, authentication) {
        var locationByCoords = function (lat, lng) {
            // return $http.get('/api/locations/near?lng=' + lng + '&lat=' + lat +'&maxDistance=20');
            return $http.get('/api/locations/near?lng=105.8103235583809&lat=20.99115807158535&maxDistance=20');
        };
        var locationById = function (locationid) {
            return $http.get('/api/locations/' + locationid);
        };

        var config = {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        };
        var addReviewById = function (locationid, data) {

            return $http.post('/api/locations/' + locationid + '/reviews', data, config);
        };
        return {
            locationByCoords: locationByCoords,
            locationById: locationById,
            addReviewById: addReviewById
        };
    }
})();