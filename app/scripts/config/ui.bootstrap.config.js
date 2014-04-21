'use strict';

app.config(['$tooltipProvider', function($tooltipProvider){

    $tooltipProvider.setTriggers({
        'mouseover': 'mouseout'
    });

}]);