"use strict";

angular.module('swamp.config')
    .constant('MODAL_CONFIG', {

        "modal::service.environments.editor": {
            templateUrl: 'components/modals/environments_editor/environmentsEditor.html',
            controller: 'environmentsEditorController',
            windowClass: 'modal-size_60'
        },

        "modal::logs.selector": {
            templateUrl: 'components/modals/logs_selector/logsSelector.html',
            controller: 'logsSelectorController',
            windowClass: 'modal-size_50'
        },

        "modal::prompt": {
            templateUrl: 'components/modals/prompt/prompt.html',
            controller: 'promptController',
            windowClass: 'modal-size_30'
        },

        "modal::execute.command.prompt": {
            templateUrl: 'components/modals/execute_command_prompt/executeCommandPrompt.html',
            controller: 'executeCommandPromptController',
            windowClass: 'modal-size_50'
        },

        "modal::command.execution": {
            templateUrl: 'components/modals/command_execution/commandExecution.html',
            controller: 'commandExecutionController',
            windowClass: 'modal-size_80 max-height'
        }

    });
