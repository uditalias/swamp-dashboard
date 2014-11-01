'use strict';

app.config([
  '$stateProvider',
  function ($stateProvider) {

    $stateProvider.state('login', {
      url: '/login/',
      templateUrl: 'pages/login/login.html',
      controller: 'loginController'
    });

  }]);
