'use strict';

app.config([
    '$stateProvider',
    function ($stateProvider) {

        $stateProvider.state('root', {
            url: '/',
            templateUrl: 'pages/root/rootView.html',
            controller: 'rootController'
        });

    }]);