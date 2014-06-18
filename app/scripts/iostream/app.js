'use strict';
$(function() {

    var $stream = $('.io-container pre');

    function _onStreamerData(data) {
        $stream.text(data);
    }

    function _onFilesListResponse(data) {

        console.log(data);

    }

    function _clearScreen() {
        $stream.text('');
    }

    function _poll() {
        _clearScreen();

        streamerService.poll();
    }

    streamerService.initialize(window.serviceId, window.ioType, _onStreamerData);

    streamerService.getSTDFilesList(_onFilesListResponse);

    _poll();

});