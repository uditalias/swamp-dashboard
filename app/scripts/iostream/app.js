'use strict';
$(function() {

    var $stream = $('.io-container pre');
    var $filesList = $('.aside-content ul');
    var $selectedFile = $('.selected-file');
    var $themeSwitch = $('.theme-switch');
    var THEME_COOKIE_NAME = 'iostreamtheme';

    function _onStreamerData(data) {
        $stream.text($stream.text() + data);
    }

    function _onFileListItemClick(fileName, event) {

        $filesList.find('li').removeClass('selected');

        $(this).addClass('selected');

        $selectedFile.hide();

        $selectedFile.find('span').text(fileName);

        $selectedFile.show();

        _poll(fileName);

    }

    function _onFilesListResponse(data) {

        $filesList.find('li').off('click');

        $filesList.empty();

        data = data.data;

        var aTime, bTime;

        data = data.sort(function(a, b) {

          if(a.mtime && b.mtime) {
            aTime = new Date(a.mtime).getTime();
            bTime = new Date(b.mtime).getTime();

            if(aTime > bTime) {
              return -1;
            } else if (aTime < bTime) {
              return 1;
            } else {
              return 0;
            }
          } else {
            return 0;
          }
        }).map(function(stat) {
          return stat && stat.filename || '';
        });

        aTime = null;
        bTime = null;

        _.forEach(data, function(file) {

            var $item = $('<li />');

            $item.text(file);

            $item.on('click', _onFileListItemClick.bind($item, file));

            $item.appendTo($filesList);
        });

    }

    function _clearScreen() {
        $stream.text('');
    }

    function _poll(fileName) {
        _clearScreen();

        streamerService.poll(fileName);
    }

    function _touchThemeSwitch(setCookie) {
        if($('html').hasClass('light')) {
            $themeSwitch.find('span').text('ON');

            setCookie && $.cookie(THEME_COOKIE_NAME, 1, { expires: 365, path: '/' });

        } else {
            $themeSwitch.find('span').text('OFF');

            setCookie && $.cookie(THEME_COOKIE_NAME, 0, { expires: 365, path: '/' });
        }
    }

    function _initialize() {

        _touchThemeSwitch(false);

        $themeSwitch.on('click', function() {

            $('html').toggleClass('light');
            _touchThemeSwitch(true);

        });

        var _theme = $.cookie(THEME_COOKIE_NAME);
        if(_theme && parseInt(_theme) == 1) {
            $themeSwitch.trigger('click');
        }

        streamerService.initialize(window.serviceId, window.ioType, _onStreamerData);

        streamerService.getSTDFilesList(_onFilesListResponse);

        _poll();

    }

    _initialize();

});
