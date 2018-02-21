'use strict';
(function(){

    let homeCtrl = function($scope,loc8rData,geolocation,$location) {
    //content controller
        var vm=this;
        console.log('here,now');
        vm.returnPage = $location.search().page || '/'; 
        vm.pageHeader = {
             title: 'Loc8r',
             strapline: 'Find places to work with wifi near you!'
         };
         vm.sidebar = {
             content: "Looking for wifi and a seat etc etc"
         };
        vm.message = "Checking your location";
        vm.getData = function(position){
            //console.log(position);
            var lat = position.coords.latitude,
                lng = position.coords.longitude;
             vm.message = "searching for nearby places";
             loc8rData.locationByCoords(lat, lng)
             .then(function(response){
                var data = response.data;
                vm.message = data.length > 0 ? "":"No locations found nearby";
                vm.data = { locations : data };

             },function(error){
               vm.message = "Sorry, something's gone wrong with err:"+error;
             });
        };
        vm.showError = function(error){
           $scope.$apply(function(){
                vm.message = error.message;
            });
        };
        vm.noGeo = function(){
           $scope.$apply(function(){
                vm.message = "Geolocation not supported by this browser.";
            });
        };
        geolocation.getPosition(vm.getData,vm.showError,vm.noGeo);

    }
    homeCtrl.$injector = ['$scope','loc8rData','geolocation'];
    angular
     .module('loc8rApp')
     .controller('homeCtrl', homeCtrl);
})();