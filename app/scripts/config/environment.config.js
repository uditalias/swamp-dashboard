"use strict";

app.config(['env', '$httpProvider', function(env, $httpProvider) {

    if(env.name == 'production') {
        env.socketConnectionString = socketConnectionString;
        env.apiBasePath = '/';
    }


}]);
