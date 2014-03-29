'use strict';

app.run(['socketService', 'swampManager', function(socketService, swampManager) {

    swampManager.initialize();
    socketService.setup();

}]);