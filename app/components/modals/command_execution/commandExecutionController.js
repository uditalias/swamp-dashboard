'use strict';
angular.module('swamp.controllers').controller('commandExecutionController', ['$scope', '$rootScope', '$payload', 'modalService', 'CLIENT_REQUEST', '$sce', function($scope, $rootScope, $payload, modalService, CLIENT_REQUEST, $sce) {

  $scope.execution = $payload;
  $scope.terminating = false;

  $scope.dismiss = function() {
    modalService.dismiss();
  }

  $scope.confirm = function() {
    modalService.close();
  }

  $scope.parseAnsi = function(raw) {
    var ansi = _.ansi(raw);
    raw = '';
    for(var i = 0, len = ansi.length; i < len; i++) {
      if(ansi[i].foreground) {
        raw += '<span style="color:' + ansi[i].foreground + '">' + ansi[i].text + '</span>';
        continue;
      }
      raw += ansi[i].text;
    }

    return $sce.trustAsHtml(raw);
  };

  $scope.terminate = function() {
      $scope.terminating = true;

      $rootScope.$broadcast(CLIENT_REQUEST.REQUEST_COMMAND_TERMINATION, $scope.execution.id);
  }

}]);
