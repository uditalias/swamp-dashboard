'use strict';

angular.module('swamp', [
    'swamp.config',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'Scope.safeApply',
    'Scope.onReady',
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