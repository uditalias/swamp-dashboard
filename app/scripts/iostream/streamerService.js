'use strict';

var streamerService = (function() {

    function Streamer(serviceId, ioType, callback) {

        this._serviceId = serviceId;
        this._ioType = ioType == 'STDOUT' ? 'out' : 'error';
        this._xhr = null;
        this._dataCallback = callback || function() {};

        this._createXhrObject();
    }

    Streamer.prototype._createXhrObject = function() {
        this._xhr = new XMLHttpRequest();

        this._xhr.onload = this._onLoad.bind(this);
        this._xhr.onloadend = this._onLoadEnd.bind(this);
        this._xhr.onreadystatechange = this._onXhrStateChanged.bind(this);
    };

    Streamer.prototype.poll = function(fileName) {

        this._xhr.open('GET' ,this._getStreamUri(fileName) ,true);

        this._xhr.send(null);
    };

    Streamer.prototype._onLoad = function() {
        this._dataCallback && this._dataCallback(this._xhr.responseText);
    };

    Streamer.prototype._onLoadEnd = function() {
    };

    Streamer.prototype._onXhrStateChanged = function() {

        if(this._xhr.readyState == 4) {


        }
    };

    Streamer.prototype._getStreamUri = function(fileName) {

        return window.socketConnectionString + 'io/' + this._serviceId + '/' + this._ioType + '/stream/' + (fileName ? 'fileName=' + fileName : '');

    };

    Streamer.prototype.getIOType = function() {

        return this._ioType;

    };

    Streamer.prototype.getServiceId = function() {

        return this._serviceId;

    };


    var _initialized    = false,
        _streamer       = null;


    function _initialize(serviceId, ioType, callback) {

        if(!_initialized) {
            _initialized = true;

            _streamer = new Streamer(serviceId, ioType, callback);
        }
    }

    function _poll(fileName) {

        if(_initialized) {

            _streamer.poll(fileName);

        }

    }

    function _getSTDFilesList(callback) {

        $.get(window.socketConnectionString + 'io/' + _streamer.getServiceId() + '/' + _streamer.getIOType() + '/list/', function(data) {

            callback && callback(data);

        });

    }

    return {
        initialize: _initialize,
        getSTDFilesList: _getSTDFilesList,
        poll: _poll
    }
})();