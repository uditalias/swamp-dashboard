'use strict';
$(function() {

    var $button = $('.side-menu-toggle');
    var $container = $('.io-container');

    function _toggle() {

        $(document.body).toggleClass('opened');

    }

    $button.on('click', _toggle);

    $container.on('click', function() {

        if($(document.body).hasClass('opened')) {

            _toggle();

        }

    });

    $(document).on('keydown', function(e) {

        if(e.which == 27) {

            if($(document.body).hasClass('opened')) {

                _toggle();

            }
        }

    });
});