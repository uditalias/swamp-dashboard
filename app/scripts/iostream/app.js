'use strict';
$(function() {


    streamerService.initialize(window.serviceId, window.ioType);

    streamerService.poll();


});