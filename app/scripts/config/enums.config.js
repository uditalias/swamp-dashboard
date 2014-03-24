'use strict';

angular.module('swamp.config')
    .constant('ACCESS_LEVEL', {
        GUEST: 1,
        GUEST_ONLY: 2,
        USER: 3
    });