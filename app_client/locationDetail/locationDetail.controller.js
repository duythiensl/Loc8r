'use strict';
(function(){ 
 function locationDetailCtrl ($routeParams, $uibModal,$location, loc8rData,authentication) {
        var vm = this;
		vm.locationid = $routeParams.locationid;
		vm.isLoggedIn = authentication.isLoggedIn();
		vm.currentPath = $location.path(); 
	
        loc8rData
        	.locationById(vm.locationid)
            .then(function(response){
                var data =  response.data;
                vm.data= {location:data};
                vm.pageHeader = {
                    title : vm.data.location.name
                };
            },function(error){
                console.log(error);
            });
        vm.popupReviewForm = function () {
                  var modalInstance = $uibModal.open({
                 
                  templateUrl: '/reviewModal/reviewModal.view.html',
                  controller: 'reviewModalCtrl as vm',
                  size: 'lg',
                  resolve:{
                    locationData: function(){
                        return{
                            locationid:vm.locationid,
                            locationName:vm.data.location.name
                        };
                    }
                  }
                });
                  modalInstance.result.then(function (data) {
                    console.log('data iss', data);
                    vm.data.location.reviews.push(data);
                });
                
           };

           
    }
    locationDetailCtrl.$inject = ['$routeParams','$uibModal','$location','loc8rData','authentication'];
    angular
        .module('loc8rApp')
        .controller('locationDetailCtrl',locationDetailCtrl);   

})();