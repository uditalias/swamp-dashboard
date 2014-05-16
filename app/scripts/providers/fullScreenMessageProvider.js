'use strict';

angular.module('swamp.services').provider('fullScreenMessage', function() {

    var _currentMessage = null;

    var fullScreenMessageProvider = {};

    fullScreenMessageProvider._defaultOptions = {};

    fullScreenMessageProvider.$get = ['$compile', '$http', '$q', '$templateCache', '$injector', '$rootScope', '$controller',
        function($compile, $http, $q, $templateCache, $injector, $rootScope, $controller) {

            function getTemplatePromise(options) {
                return options.template ? $q.when(options.template) :
                    $http.get(options.templateUrl, {cache: $templateCache}).then(function (result) {
                        return result.data;
                    });
            }

            function getResolvePromises(resolves) {
                var promisesArr = [];
                angular.forEach(resolves, function (value, key) {
                    if (angular.isFunction(value) || angular.isArray(value)) {
                        promisesArr.push($q.when($injector.invoke(value)));
                    }
                });

                return promisesArr;
            }

            function getExtendedOptions(options) {
                options = angular.extend({}, fullScreenMessageProvider._defaultOptions, options);
                options.resolve = options.resolve || {};

                return options;
            }

            function initializeFullScreenMessage(options) {

                var options = getExtendedOptions(options);

                if (!options.template && !options.templateUrl) {
                    throw new Error('One of template or templateUrl options is required.');
                }

                var templateAndResolvePromise =
                    $q.all([getTemplatePromise(options)].concat(getResolvePromises(options.resolve)));

                templateAndResolvePromise.then(function(tplAndVars) {

                    var messageScope = (options.scope || $rootScope).$new();

                    var ctrlLocals = {};

                    if (options.controller) {
                        var resolveIter = 1;
                        ctrlLocals.$scope = messageScope;
                        angular.forEach(options.resolve, function (value, key) {
                            ctrlLocals[key] = tplAndVars[resolveIter++];
                        });

                        $controller(options.controller, ctrlLocals);
                    }

                    var el = $('<sw-full-screen-message></sw-full-screen-message>');
                    el.html(tplAndVars[0]);

                    el = $compile(el)(ctrlLocals.$scope);
                    $(document.body).append(el);
                });
            }

            return {
                close: function() {
                    $('.sw-full-screen-message').remove();
                },
                open: function(params) {
                    if(_currentMessage) {
                        this.close();
                    }

                    initializeFullScreenMessage(params);
                }
            }
        }];

    return fullScreenMessageProvider;
});