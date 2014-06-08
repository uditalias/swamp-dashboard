"use strict";

angular.module('swamp.config')
    .constant('MODAL_CONFIG', {

        "modal::service.environments.editor": {
            templateUrl: 'components/modals/environments_editor/environmentsEditor.html',
            controller: 'environmentsEditorController',
            windowClass: 'modal-size_60'
        }

    });