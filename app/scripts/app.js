'use strict';

var app = angular.module('swamp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'Scope.safeApply',
    'Scope.onReady',
    'swamp.config',
    'swamp.filters',
    'swamp.controllers',
    'swamp.directives',
    'swamp.services'
]);

angular.module('swamp.config', []);
angular.module('swamp.filters', []);
angular.module('swamp.controllers', []);
angular.module('swamp.directives', []);
angular.module('swamp.services', []);