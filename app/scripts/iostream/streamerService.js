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

        this._xhr.onreadystatechange = this._onXhrStateChanged.bind(this);
    };

    Streamer.prototype.poll = function() {

        this._xhr.open('GET' ,this._getStreamUri() ,true);

        this._xhr.send(null);
    };

    Streamer.prototype._onXhrStateChanged = function() {

        console.log(this._xhr.response);

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