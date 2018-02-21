'use strict';
(function () {
   function reviewModalCtrl ($uibModalInstance,loc8rData,locationData) {
       var vm = this;
       vm.locationData = locationData;
       vm.onSubmit = function(){
        if(!vm.formData.reviewText || !vm.formData.rating){
            vm.formError ='All fields required, please  try  again!';
            return false;
        }else{
            
            vm.doAddReview(vm.locationData.locationid, vm.formData);


         } 
       };
       vm.doAddReview = function(locationid,formData){
            loc8rData.addReviewById(locationid,{
                rating : formData.rating,
                reviewText : formData.reviewText
            }).then(function(data){
                data = data.data;
                console.log('Send data success!');
                vm.modal.close(data);
                // console.log('data iss', data);
            },function(error){
                vm.formError = error.data.message;
            }); 
       };
       vm.modal = {
           close : function (result) {
               $uibModalInstance.close(result);

           }, 
           cancel : function () {
               $uibModalInstance.dismiss('cancel');
           }
       };
       
   }
   reviewModalCtrl.$inject = ['$uibModalInstance','loc8rData','locationData'];
   angular
       .module('loc8rApp')
       .controller('reviewModalCtrl', reviewModalCtrl);

})();

