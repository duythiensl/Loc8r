
//cotroller
var locationListCtrl = function ($scope, loc8rData,geolocation) {
    $scope.message = "Checking your location";
    $scope.getData = function(position){
        //console.log(position);
        var lat = position.coords.latitude,
            lng = position.coords.longitude
         $scope.message = "searching for nearby places";
         loc8rData.locationByCoords(lat, lng)
         .then(function(response){
            var data = response.data;
            $scope.message = data.length > 0 ? "":"No locations found nearby";
            $scope.data = { locations : data };

         },function(error){
           $scope.message = "Sorry, something's gone wrong";
         });
    };
    $scope.showError = function(error){
        $scope.$apply(function(){
            $scope.message = error.message;
        });
    };
    $scope.noGeo = function(){
        $scope.$apply(function(){
            $scope.message = "Geolocation not supported by this browser.";
        });
    };
    geolocation.getPosition($scope.getData,$scope.showError,$scope.noGeo);
    
};

//service
var loc8rData = function ($http) {
  var locationByCoords = function(lat,lng){
    // return $http.get('/api/locations?lng=' + lng + '&lat=' + lat +'&maxDistance=20');
    return $http.get('/api/locations?lng=-0.9690884&lat=51.455041&maxDistance=20');
  };
  return {
     locationByCoords : locationByCoords
     };
};
var geolocation = function(){
    var getPosition = function(cbSuccess, cbError, cbNoGeo){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(cbSuccess,cbError);
        }else{
            cbNoGeo();
        };
    }
    return{
            getPosition : getPosition

        };
};

//fliter
var _isNumberic = function(input){
        return !isNaN(parseFloat(input)) && isFinite(input);
    };
var formatDistance = function(){
        var format = function(distance){
            var numDistance,unit
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
var ratingStars = function () {
     return {
         scope: {
             thisRating : '=rating'
         },
         templateUrl: '/javascripts/angular/rating-stars.html'
         };
};
angular
    .module('loc8rApp',[])
    .controller('locationListCtrl',locationListCtrl)
    .filter('formatDistance', formatDistance)
    .directive('ratingStars',ratingStars)
    .service('loc8rData',loc8rData)
    .service('geolocation', geolocation);