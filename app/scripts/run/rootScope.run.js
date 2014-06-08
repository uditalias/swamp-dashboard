'use strict';

app.run(['$rootScope', function($rootScope) {

    $rootScope.__len__ = function(obj) {

        obj = obj || {};

        return Object.keys(obj).length;

    }

}]);