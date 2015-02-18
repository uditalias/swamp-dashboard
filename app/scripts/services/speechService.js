'use strict';

angular.module('swamp.services').service('speechService', [

  'settingsService', 'SETTING', 'SPEAKABLE_TEXT',

  function (settingsService, SETTING, SPEAKABLE_TEXT) {

    var supported = !!window.speechSynthesis && !!window.SpeechSynthesisUtterance;
    var defaultLang = 'en-US';

    this._queue = [];

    this.speak = function (text, enqueue) {
      if (!supported || !settingsService.get(SETTING.SPEECH_ENABLED)) {
        return;
      }

      if(window.speechSynthesis.speaking) {

        if(enqueue) {
          this._queue.push(text);
        }

        return;
      }

      var msg = new SpeechSynthesisUtterance(text);

      msg.lang = defaultLang;

      msg.onend = _onMessageEnded.bind(this);

      window.speechSynthesis.speak(msg);
    };

    this.speakIfSpeakable = function(text) {
      _.forEach(SPEAKABLE_TEXT, function(speakableText) {

        if(speakableText.text == text) {

          return this.speak(text, speakableText.enqueue);

        }

      }.bind(this));
    };

    this.stop = function() {
      if(supported) {
        window.speechSynthesis.cancel && window.speechSynthesis.cancel();
      }
    };

    function _onMessageEnded() {
      if(this._queue.length > 0) {
        this.speak(this._queue.shift(), false);
      }
    }

  }]);
