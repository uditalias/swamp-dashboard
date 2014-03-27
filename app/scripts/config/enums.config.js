'use strict';

angular.module('swamp.config')
    .constant('SOCKET_EVENTS', {
        "SWAMP_INITIAL": "swamp.initialData",
        "SWAMP_RESTART_ALL": "swamp.restartAllRunning",
        "SWAMP_STOP_ALL": "swamp.stopAllRunning",
        "SERVICE_START": "service.start",
        "SERVICE_STOP": "service.stop",
        "SERVICE_RESTART": "service.restart",
        "SERVICE_ERROR": "service.error",
        "SERVICE_OUT": "service.out",
        "SERVICE_MONITOR": "service.monitor"
    })
    .constant('EVENTS', {
        "SWAMP_SERVICES_RECEIVED": "swamp.services.received",
        "SERVICE_MONITOR_UPDATE": "service.monitor.update",
        "SERVICE_START": "service.start",
        "SERVICE_STOP": "service.stop",
        "SERVICE_RESTART": "service.restart"
    })
    .constant('SERVICE_STATE', {
        "STOP": "service.state.stop",
        "RUN": "service.state.run",
        "RESTART": "service.state.restart"
    })
    .constant('CLIENT_REQUEST', {
        "REQUEST_START_SERVICE": "request.start.service",
        "REQUEST_STOP_SERVICE": "request.stop.service",
        "REQUEST_RESTART_SERVICE": "request.restart.service"
    })
    .constant('AGGREGATED_LIST_TYPE', {
        "LIFO": 1,
        "FIFO": 2
    });