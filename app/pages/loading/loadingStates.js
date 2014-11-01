'use strict';

app.config([
  '$stateProvider',
  function ($stateProvider) {

    $stateProvider.state('loading', {
      url: '/',
      templateUrl: 'pages/loading/loading.html',
      controller: 'loadingController'
    });

  }]);
