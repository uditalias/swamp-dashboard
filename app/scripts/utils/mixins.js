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

_.mixin({ 'toFixed': function(number,precision){
    return (parseFloat(number.toPrecision(precision || 12)))
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