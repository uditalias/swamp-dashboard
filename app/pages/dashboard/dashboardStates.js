'use strict';

app.config([
    '$stateProvider',
    function ($stateProvider) {

        $stateProvider.state('dashboard', {
            url: '/dashboard/',
            templateUrl: 'pages/dashboard/dashboardView.html',
            controller: 'dashboardController'
        });

    }]);
