'use strict';
(function(){
    var aboutCtrl = function(){
        var vm = this;
        vm.pageHeader = {
            title: 'About Loc8r',
            strapline:'Find local!'
        };
        vm.main = {
            content:'Loc8r was created to help people find places to sit down and get a bit of work done.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit lorem lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n\n Id odit repellendus veniam eius magnam, ipsa expedita excepturi laboriosam! Praesentium blanditiis ipsam minus. Sapiente debitis, nobis. Aspernatur in quia odit reprehenderit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, neque? Vel, facere nostrum debitis autem odio in quaerat eaque labore. Sit nam soluta, vitae corporis, quam doloribus eligendi fugit earum..'
        };
    };
angular
    .module('loc8rApp')
    .controller('aboutCtrl',aboutCtrl);
})();