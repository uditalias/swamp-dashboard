"use strict";

 angular.module("swamp.config")

.constant("env", {
 "name": "development",
 "serviceUptimeTickInterval": 10000,
 "swampReloadSeconds": 6,
 "socketConnectionString": "http://localhost:2121/",
 "apiBasePath": "http://localhost:2121/"
})

;