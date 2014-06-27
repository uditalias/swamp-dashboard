'use strict';
$(function() {

    var $stream = $('.io-container pre');
    var $filesList = $('.aside-content ul');
    var $selectedFile = $('.selected-file');
    var $themeSwitch = $('.theme-switch');

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

        _.forEach(data.data, function(file) {

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

    function _setThemeSwitchLabel() {
        if($('html').hasClass('light')) {
            $themeSwitch.find('span').text('ON');
        } else {
            $themeSwitch.find('span').text('OFF');
        }
    }

    function _initialize() {

        _setThemeSwitchLabel();

        $themeSwitch.on('click', function() {

            $('html').toggleClass('light');

            _setThemeSwitchLabel();

        });

        streamerService.initialize(window.serviceId, window.ioType, _onStreamerData);

        streamerService.getSTDFilesList(_onFilesListResponse);

        _poll();

    }

    _initialize();

});