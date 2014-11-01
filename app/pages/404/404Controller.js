'use strict';
angular.module('swamp.controllers').controller('404Controller', ['$scope', function($scope) {

  $scope.reload = function() {

    location.href = location.origin;

  }

}]);
