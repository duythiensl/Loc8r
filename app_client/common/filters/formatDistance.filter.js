'use strict';
(function(){ 
    var _isNumberic = function(input){
            return !isNaN(parseFloat(input)) && isFinite(input);
        };
    var formatDistance = function(){
            var format = function(distance){
                var numDistance,unit;
                if(distance && _isNumberic(distance)){
                    if(distance > 1){
                        numDistance = parseFloat(distance).toFixed(1);
                        unit = 'km';
                    }else{
                        numDistance = parseInt(distance*1000,10);
                        unit = 'm';
                    }
                    return numDistance + " " + unit;
                }else{
                    return "?";
                }
            };
            return format;
        };
    angular
        .module('loc8rApp')
        .filter('formatDistance',formatDistance);
})();