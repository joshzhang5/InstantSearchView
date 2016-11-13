'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  //$routeProvider.otherwise({redirectTo: '/view1'});
}])
.controller('indexCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.imageList = [];
  $scope.current = 1;
  $scope.next = 2;
  $scope.prev = 0;
  $scope.carMid = 1;
  $scope.carRight = 2;
  $scope.carLeft = 0;
  $scope.move = 0;
  $scope.query = "gt";
  $scope.results = false;
  $scope.getImage = function(data){
    return 'data:image/png;base64,' + data;
  }
  $scope.test = "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";

  $scope.moveCarousel = function(keyEvent) {
    //Math that moves the carousel and sets the current and previous page index's for the HTML bindings
    if (keyEvent.which == 37) {
        $scope.move--;

        if ($scope.move % 3 == 0) {
            $scope.carLeft = ((($scope.prev - 1) % $scope.imageList.length) + $scope.imageList.length) % $scope.imageList.length;
        } else if ($scope.move % 3 == -1) {
            $scope.carRight = ((($scope.prev - 1) % $scope.imageList.length) + $scope.imageList.length) % $scope.imageList.length;
        } else {
            $scope.carMid = ((($scope.prev - 1) % $scope.imageList.length) + $scope.imageList.length) % $scope.imageList.length;
        }
        $scope.current = (($scope.current - 1 % $scope.imageList.length) + $scope.imageList.length) % $scope.imageList.length;
        $scope.next = (($scope.next - 1 % $scope.imageList.length) + $scope.imageList.length) % $scope.imageList.length;
        $scope.prev = (($scope.prev - 1 % $scope.imageList.length) + $scope.imageList.length) % $scope.imageList.length;
         $('.carousel').carousel('prev');
    } else if (keyEvent.which == 39) {
        $scope.move++;

        if ((($scope.move % 3) + 3) % 3 == 0) {
            $scope.carRight = ((($scope.next + 1) % $scope.imageList.length) + $scope.imageList.length) % $scope.imageList.length;
        } else if ((($scope.move % 3) + 3) % 3 == 1) {
            $scope.carLeft = ((($scope.next + 1) % $scope.imageList.length) + $scope.imageList.length) % $scope.imageList.length;
        } else {
            $scope.carMid = ((($scope.next + 1) % $scope.imageList.length) + $scope.imageList.length) % $scope.imageList.length;
        }
        $scope.current = (($scope.current + 1 % $scope.imageList.length) + $scope.imageList.length) % $scope.imageList.length;
        $scope.next = (($scope.next + 1 % $scope.imageList.length) + $scope.imageList.length) % $scope.imageList.length;
        $scope.prev = (($scope.prev + 1 % $scope.imageList.length) + $scope.imageList.length) % $scope.imageList.length;
        $('.carousel').carousel('next');
    } else if (keyEvent.which == 13) {
        var host = "http://143.215.90.149:4567/" + $scope.query;
        $http.get(host).then(function(response) {
        $scope.imageList = response.data;
        console.log("success");
        $scope.results = true;
        console.log($scope.imageList);
        })
    }
  }
}]);


