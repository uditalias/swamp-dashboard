"use strict";

app.config(['env', function(env) {

    if(env.name == 'production') {
        env.socketConnectionString = socketConnectionString;
    }
}]);