
'use strict';
(function(){
    function addHtmlLineBreaks(){
        return function(text){ 
            if (text === undefined){
                return;
            }
            var output = text.replace(/\n/g, '<br/>');
            return output;
        };
    }
    angular
    .module('loc8rApp')
    .filter('addHtmlLineBreaks', addHtmlLineBreaks);
})();