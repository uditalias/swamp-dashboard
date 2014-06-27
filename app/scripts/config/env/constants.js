"use strict";

 angular.module("swamp.config")

.constant("env", {
 "name": "development",
 "serviceUptimeTickInterval": 5000,
 "swampReloadSeconds": 6,
 "socketConnectionString": "http://localhost:2121/"
})

;