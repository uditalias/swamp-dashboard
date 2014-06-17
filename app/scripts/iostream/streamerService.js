'use strict';

var streamerService = (function() {

    function Streamer(serviceId, ioType) {

        this._serviceId = serviceId;
        this._ioType = ioType == 'STDOUT' ? 'out' : 'error';
        this._xhr = null;

        this._createXhrObject();
    }

    Streamer.prototype._createXhrObject = function() {
        this._xhr = new XMLHttpRequest();

        this._xhr.onload = this._onLoad.bind(this);
        this._xhr.onloadend = this._onLoadEnd.bind(this);
        this._xhr.onreadystatechange = this._onXhrStateChanged.bind(this);
    };

    Streamer.prototype.poll = function() {

        $('.io-container pre').text('');

        this._xhr.open('GET' ,this._getStreamUri() ,true);

        this._xhr.send(null);
    };

    Streamer.prototype._onLoad = function() {
        $('.io-container pre').text(this._xhr.responseText);
    };

    Streamer.prototype._onLoadEnd = function() {
    };

    Streamer.prototype._onXhrStateChanged = function() {

        if(this._xhr.readyState == 4) {


        }
    };

    Streamer.prototype._getStreamUri = function() {

        return window.socketConnectionString + 'io/' + this._serviceId + '/' + this._ioType + '/stream/';

    };


    var _initialized    = false,
        _streamer       = null;


    function _initialize(serviceId, ioType) {

        if(!_initialized) {
            _initialized = true;

            _streamer = new Streamer(serviceId, ioType);
        }

    }

    function _poll() {

        if(_initialized) {

            _streamer.poll();

        }

    }

    return {
        initialize: _initialize,
        poll: _poll
    }
})();