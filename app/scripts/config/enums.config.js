'use strict';

angular.module('swamp.config')
    .constant('SOCKET_EVENTS', {
        "SWAMP_INITIAL": "swamp.initialData",
        "SERVICE_START": "service.start",
        "SERVICE_STOP": "service.stop",
        "SERVICE_RESTART": "service.restart",
        "SERVICE_ERROR": "service.error",
        "SERVICE_OUT": "service.out",
        "SERVICE_MONITOR": "service.monitor"
    })
    .constant('EVENTS', {
        "SWAMP_SERVICES_RECEIVED": "swamp.services.received",
        "SERVICE_MONITOR_UPDATE": "service.monitor.update"
    });