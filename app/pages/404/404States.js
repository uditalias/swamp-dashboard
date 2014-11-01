'use strict';

app.config([
  '$stateProvider',
  function ($stateProvider) {

    $stateProvider.state('404', {
      url: '/404/',
      templateUrl: 'pages/404/404.html',
      controller: '404Controller'
    });

  }]);
