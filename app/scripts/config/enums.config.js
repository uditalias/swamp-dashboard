'use strict';

angular.module('swamp.config')
    .constant('EVENTS', {
        "SOCKET_SWAMP_INITIAL": "swamp.initialData",
        "SOCKET_SERVICE_START": "service.start",
        "SOCKET_SERVICE_STOP": "service.stop",
        "SOCKET_SERVICE_RESTART": "service.restart",
        "SOCKET_SERVICE_ERROR": "service.error",
        "SOCKET_SERVICE_OUT": "service.out",
        "SOCKET_SERVICE_MONITOR": "service.monitor"
    });