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
        "MODIFY_SERVICE_ENVIRONMENTS": "service.modifyEnvironments",
        "EXECUTE_COMMAND": "service.executeCommand",
        "COMMAND_STARTED": "command.started",
        "COMMAND_OUT": "command.out",
        "COMMAND_DISPOSED": "command.disposed",
        "TERMINATE_COMMAND": "command.terminate",
        "RUN_PRESET": "preset.run",
        "CREATE_PRESET": "preset.create",
        "DELETE_PRESET": "preset.delete",
        "PRESET_CREATED": "preset.created",
        "PRESET_DELETED": "preset.deleted",
        "SERVICE_LOG_OUT_SUBSCRIBE": "service.log.out.subscribe",
        "SERVICE_LOG_OUT_UNSUBSCRIBE": "service.log.out.unsubscribe",
        "SERVICE_LOG_ERROR_SUBSCRIBE": "service.log.error.subscribe",
        "SERVICE_LOG_ERROR_UNSUBSCRIBE": "service.log.error.unsubscribe"
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
        "COMMAND_STARTED": "event::command.started",
        "COMMAND_OUT": "event::command.out",
        "COMMAND_DISPOSED": "event::command.disposed",
        "PRESET_CREATED": "event::preset.created",
        "PRESET_DELETED": "event::preset.deleted",

        "SWAMP_MANAGER_INITIALIZED": "event::swamp.manager.initialized",
        "SWAMP_SERVICES_MANAGER_INITIALIZED": "event::swamp.services.manager.initialized",
        "OPEN_FOOTER_PANEL": "event::open.footer.panel",
        "FOOTER_PANEL_STATE_CHANGE": "event::footer.panel.state.change",
        "SERVICES_FILTER_CHANGE": "event::services.filter.change",
        "TAIL_LOGS_STATE_CHANGE": "event::tail.logs.state.change",
        "CLEAR_ALL_LOGS": "event::clear.all.logs",
        "VERTICAL_SCROLL_INTO_VIEW": "event::vertical.scroll.into.view",
        "VERTICAL_SCROLL_RECALCULATE_DIMENSIONS": "event::vertical.scroll.recalculate.dimensions",
        "DISPOSE_CONTEXT_MENUS": "event::dispose.context.menus",

        "STATE_CHANGE_START": "$stateChangeStart",
        "STATE_CHANGE_ERROR": "$stateChangeError",
        "STATE_CHANGE_SUCCESS": "$stateChangeSuccess",
        "VIEW_CONTENT_LOADED": "$viewContentLoaded"
    })
    .constant('SERVICE_STATE', {
        "NONE": "service.state.none",
        "STOP": "service.state.stop",
        "RUN": "service.state.run",
        "RESTART": "service.state.restart",
        "PENDING": "service.state.pending",
        "STARTING": "service.state.starting"
    })
    .constant('CLIENT_REQUEST', {
        "REQUEST_START_SERVICE": "request.start.service",
        "REQUEST_STOP_SERVICE": "request.stop.service",
        "REQUEST_RESTART_SERVICE": "request.restart.service",
        "REQUEST_COMMAND_EXECUTION": "request.command.execution",
        "REQUEST_COMMAND_TERMINATION": "request.command.termination"
    })
    .constant('AGGREGATED_LIST_TYPE', {
        "LIFO": 1,
        "FIFO": 2
    })
    .constant('MODAL_TYPE', {
        "SERVICE_ENVIRONMENTS_EDITOR": 'modal::service.environments.editor',
        "LOGS_SELECTOR": 'modal::logs.selector',
        "PROMPT": "modal::prompt",
        "EXECUTE_COMMAND_PROMPT": "modal::execute.command.prompt",
        "COMMAND_EXECUTION": "modal::command.execution",
        "RUN_PRESET": "modal::run.preset",
        "CREATE_PRESET": "modal::create.preset"
    })
    .constant('LOG_TYPE', {
        "OUT": "log.out",
        "ERROR": "log.error"
    });
