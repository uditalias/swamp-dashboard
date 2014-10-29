'use strict';

angular.module('swamp.config')
    .constant('SOCKET_EVENTS', {
        "CONNECT": "connect",
        "DISCONNECT": "disconnect",
        "MESSAGE": "message",
        "SWAMP_INITIAL": "swamp.initialData",
        "SWAMP_OUT": "swamp.out",
        "SWAMP_ERROR": "swamp.error",
        "SWAMP_RESTART_ALL": "swamp.restartAllRunning",
        "SWAMP_STOP_ALL": "swamp.stopAllRunning",
        "SWAMP_START_ALL": "swamp.startAll",
        "SERVICE_START": "service.start",
        "SERVICE_STOP": "service.stop",
        "SERVICE_RESTART": "service.restart",
        "SERVICE_PENDING": "service.pending",
        "SERVICE_STARTING": "service.starting",
        "SERVICE_ERROR": "service.error",
        "SERVICE_OUT": "service.out",
        "SERVICE_MONITOR": "service.monitor",
        "MODIFY_SERVICE_ENVIRONMENTS": "service.modifyEnvironments"
    })
    .constant('EVENTS', {
        "SWAMP_SERVICES_RECEIVED": "event::swamp.services.received",
        "SWAMP_DISCONNECTED": "event::swamp.disconnected",
        "SWAMP_OUT": "event::swamp.out",
        "SWAMP_ERROR": "event::swamp.error",
        "SWAMP_DATA_RECEIVED": "event::swamp.data.received",
        "SERVICE_MONITOR_UPDATE": "event::service.monitor.update",
        "SERVICE_START": "event::service.start",
        "SERVICE_STOP": "event::service.stop",
        "SERVICE_RESTART": "event::service.restart",
        "SERVICE_PENDING": "event::service.pending",
        "SERVICE_STARTING": "event::service.starting",
        "SERVICE_OUT": "event::service.out",
        "SERVICE_ERROR": "event::service.error",
        "MODIFY_SERVICE_ENVIRONMENTS": "event::service.modify.environments",

        "SWAMP_MANAGER_INITIALIZED": "event::swamp.manager.initialized",
        "SWAMP_SERVICES_MANAGER_INITIALIZED": "event::swamp.services.manager.initialized",
        "OPEN_FOOTER_PANEL": "event::open.footer.panel",
        "FOOTER_PANEL_STATE_CHANGE": "event::footer.panel.state.change",
        "SERVICES_FILTER_CHANGE": "event::services.filter.change",
        "TAIL_LOGS_STATE_CHANGE": "event::tail.logs.state.change",
        "CLEAR_ALL_LOGS": "event::clear.all.logs",
        "VERTICAL_SCROLL_INTO_VIEW": "event::vertical.scroll.into.view",
        "VERTICAL_SCROLL_RECALCULATE_DIMENSIONS": "event::vertical.scroll.recalculate.dimensions",
        "DISPOSE_CONTEXT_MENUS": "event::dispose.context.menus"
    })
    .constant('SERVICE_STATE', {
        "STOP": "service.state.stop",
        "RUN": "service.state.run",
        "RESTART": "service.state.restart",
        "PENDING": "service.state.pending",
        "STARTING": "service.state.starting"
    })
    .constant('CLIENT_REQUEST', {
        "REQUEST_START_SERVICE": "request.start.service",
        "REQUEST_STOP_SERVICE": "request.stop.service",
        "REQUEST_RESTART_SERVICE": "request.restart.service"
    })
    .constant('AGGREGATED_LIST_TYPE', {
        "LIFO": 1,
        "FIFO": 2
    })
    .constant('MODAL_TYPE', {
        "SERVICE_ENVIRONMENTS_EDITOR": 'modal::service.environments.editor',
        "LOGS_SELECTOR": 'modal::logs.selector',
        "PROMPT": "modal::prompt"
    })
    .constant('LOG_TYPE', {
        "OUT": "log.out",
        "ERROR": "log.error"
    });
