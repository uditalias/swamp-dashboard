"use strict";

 angular.module("swamp.config")

.constant("env", {
 "name": "development",
 "socketClientLibUrl": "http://localhost:2121/socket.io/socket.io.js",
 "socketConnectionString": "http://localhost:2121/"
})

;