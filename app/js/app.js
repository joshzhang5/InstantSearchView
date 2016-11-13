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

.controller('indexCtrl', ['$scope', function($scope) {
  $scope.imageList = [];
  $scope.imageList.push('test1.png');
  $scope.imageList.push('test2.png');
  $scope.imageList.push('test3.png');
  $scope.imageList.push('test4.png');
  $scope.imageList.push('test6.png');
  $scope.current = 1;
  $scope.next = 2;
  $scope.prev = 0;
  $scope.carMid = 1;
  $scope.carRight = 2;
  $scope.carLeft = 0;
  $scope.move = 0;
  $scope.query = "";


  $scope.moveCarousel = function(keyEvent) {
    //Math that moves the carousel and sets the current and previous page index's for the HTML bindings
    if (keyEvent.which == 37) {
        $scope.move--;
        $('.carousel').carousel('prev');
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
    } else if (keyEvent.which == 39) {
        $scope.move++;
        $('.carousel').carousel('next');
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
    }
  }

}]);


