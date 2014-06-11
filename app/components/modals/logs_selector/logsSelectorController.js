'use strict';
angular.module('swamp.controllers').controller('logsSelectorController', ['$scope', '$payload', 'modalService', function($scope, $payload, modalService) {

    $scope.handler = {
        filterQuery: '',
        filteredTabsContent: []
    };
    $scope.selectedTabs = {};
    $scope.tabsContent = $payload.tabsContent;
    $scope.enabledTabsContent = $payload.enabledTabsContent;

    $scope.applyChanges = function() {

        modalService.close($scope.selectedTabs);

    }

    $scope.cancel = function() {

        modalService.dismiss();

    }

    _.forEach($scope.enabledTabsContent, function(tab) {

        $scope.selectedTabs[tab.id] = true;

    });

}]);