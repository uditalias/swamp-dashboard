var ansiparse = function (str) {
    //
    // I'm terrible at writing parsers.
    //
    var matchingControl = null,
        matchingData = null,
        matchingText = '',
        ansiState = [],
        result = [],
        state = {},
        eraseChar;

    //
    // General workflow for this thing is:
    // \033\[33mText
    // |     |  |
    // |     |  matchingText
    // |     matchingData
    // matchingControl
    //
    // In further steps we hope it's all going to be fine. It usually is.
    //

    //
    // Erases a char from the output
    //
    eraseChar = function () {
        var index, text;
        if (matchingText.length) {
            matchingText = matchingText.substr(0, matchingText.length - 1);
        }
        else if (result.length) {
            index = result.length - 1;
            text = result[index].text;
            if (text.length === 1) {
                //
                // A result bit was fully deleted, pop it out to simplify the final output
                //
                result.pop();
            }
            else {
                result[index].text = text.substr(0, text.length - 1);
            }
        }
    };

    for (var i = 0; i < str.length; i++) {
        if (matchingControl != null) {
            if (matchingControl == '\033' && str[i] == '\[') {
                //
                // We've matched full control code. Lets start matching formating data.
                //

                //
                // "emit" matched text with correct state
                //
                if (matchingText) {
                    state.text = matchingText;
                    result.push(state);
                    state = {};
                    matchingText = "";
                }

                matchingControl = null;
                matchingData = '';
            }
            else {
                //
                // We failed to match anything - most likely a bad control code. We
                // go back to matching regular strings.
                //
                matchingText += matchingControl + str[i];
                matchingControl = null;
            }
            continue;
        }
        else if (matchingData != null) {
            if (str[i] == ';') {
                //
                // `;` separates many formatting codes, for example: `\033[33;43m`
                // means that both `33` and `43` should be applied.
                //
                // TODO: this can be simplified by modifying state here.
                //
                ansiState.push(matchingData);
                matchingData = '';
            }
            else if (str[i] == 'm') {
                //
                // `m` finished whole formatting code. We can proceed to matching
                // formatted text.
                //
                ansiState.push(matchingData);
                matchingData = null;
                matchingText = '';

                //
                // Convert matched formatting data into user-friendly state object.
                //
                // TODO: DRY.
                //
                ansiState.forEach(function (ansiCode) {
                    if (ansiparse.foregroundColors[ansiCode]) {
                        state.foreground = ansiparse.foregroundColors[ansiCode];
                    }
                    else if (ansiparse.backgroundColors[ansiCode]) {
                        state.background = ansiparse.backgroundColors[ansiCode];
                    }
                    else if (ansiCode == 39) {
                        delete state.foreground;
                    }
                    else if (ansiCode == 49) {
                        delete state.background;
                    }
                    else if (ansiparse.styles[ansiCode]) {
                        state[ansiparse.styles[ansiCode]] = true;
                    }
                    else if (ansiCode == 22) {
                        state.bold = false;
                    }
                    else if (ansiCode == 23) {
                        state.italic = false;
                    }
                    else if (ansiCode == 24) {
                        state.underline = false;
                    }
                });
                ansiState = [];
            }
            else {
                matchingData += str[i];
            }
            continue;
        }

        if (str[i] == '\033') {
            matchingControl = str[i];
        }
        else if (str[i] == '\u0008') {
            eraseChar();
        }
        else {
            matchingText += str[i];
        }
    }

    if (matchingText) {
        state.text = matchingText + (matchingControl ? matchingControl : '');
        result.push(state);
    }
    return result;
}

ansiparse.foregroundColors = {
    '30': 'black',
    '31': 'red',
    '32': 'green',
    '33': 'yellow',
    '34': 'blue',
    '35': 'magenta',
    '36': 'cyan',
    '37': 'white',
    '90': 'grey'
};

ansiparse.backgroundColors = {
    '40': 'black',
    '41': 'red',
    '42': 'green',
    '43': 'yellow',
    '44': 'blue',
    '45': 'magenta',
    '46': 'cyan',
    '47': 'white'
};

ansiparse.styles = {
    '1': 'bold',
    '3': 'italic',
    '4': 'underline'
};

String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
}

_.mixin({ 'deepFind': function (obj, keyPath, value) {
    var keys, keyLen, i = 0, key;

    keys = keyPath && keyPath.split(".");
    keyLen = keys && keys.length;

    while (i < keyLen && obj) {
        key = keys[i];
        i++;

        if (i >= keyLen && value != null) {
            obj[key] = value;
            return;
        }

        obj = obj[key];
    }

    if (i < keyLen) {
        obj = null;
    }

    return obj;
}
});

_.mixin({ 'pushAll': function (arr, arr2) {
    arr.push.apply(arr, arr2);
}});

_.mixin({ 'emptyArray': function (arr) {
    arr.length = 0;
}});

_.mixin({ 'nextPrevPageParser': function (obj) {

    var output = {},
        data = obj._resultmeta || obj;

    data.next && (output.next = _.parseInt(/\w*page=(\d+)/i.exec(data.next)[1]));

    data.previous && (output.prev = _.parseInt(/\w*page=(\d+)/i.exec(data.previous)[1]));

    return output;
}
});

_.mixin({ 'cloneArray': function (arr) {
    return arr.slice(0);
}})


_.mixin({ 'throttleStore': function (func, wait, options) {

    var _store = [];

    var throttle = _.throttle(function () {

        func(_.cloneArray(_store));

        _.emptyArray(_store);

    }, wait, options);


    return function (data) {
        _.pushAll(_store, data);
        throttle();
    };
}
});

_.mixin({ 'arrayRemoveItem': function (arr,item) {
    var i = arr.indexOf(item);
    if(i != -1) {
        arr.splice(i, 1);
    }
}});


_.mixin({'getUrls' : function(text) {
    var URL_REGEXP =/((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/,
        url,
        match,
        urls = [];

    while (match = text.match(URL_REGEXP)) {
        url = match[0];
        urls.push(url);
        text = text.replace(url, '');
    }

    return urls;
}});

_.mixin({ 'guid': function(){
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).substr(-4);
}});

_.mixin({ 'bytesToSize': function(bytes) {
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)),10);
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}});

_.mixin({ 'toArray': function(object) {

    var result = [],
        object = object || {};

    _.forEach(object, function(value, key) {
        result.push(value);
    });

    return result;

}});

_.mixin({ 'ansi': function(object) {

    return ansiparse(object);

}});