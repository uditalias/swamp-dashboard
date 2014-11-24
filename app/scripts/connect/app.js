$(function() {

  var $swampUrl         = $('#swamp_url'),
      $username         = $('#swamp_username'),
      $password         = $('#swamp_password'),
      $connectBtn       = $('#connect_btn'),
      $cancelBtn        = $('#cancel_btn'),
      $connectForm      = $('#connect_form'),
      $connectActions   = $('#connect_actions'),
      $connecting       = $('#connecting'),
      $error            = $('#error'),
      $tryAgain         = $('#try_again'),
      $cancel           = $('#cancel'),
      connectionId      = null,
      source            = null;


  function _onInputKeyUp(e) {
      var username = $username.val().trim();
      var password = $password.val().trim();

      _setDisableConnectButton(!username || !password);
  }

  function _setDisableConnectButton(disabled) {
      $connectBtn.attr('disabled', disabled);
  }

  function _onConnect(e) {

      $connectForm.hide();
      $connectActions.hide();
      $connecting.show();

      var username = $username.val().trim();
      var password = $password.val().trim();

      $.post('/api/auth/connect/', { username: username, password: password })
        .success(_onConnectSuccess)
        .error(_onConnectFail);

  }

  function _onCancel(e) {
      _postMessage('swamp_connect_close', { connectionId: connectionId });
  }

  function _postMessage(event, payload) {
      source && source.postMessage({ event: event, payload: payload }, '*');
  }

  function _onConnectSuccess(response) {
      _postMessage('authenticated', { connectionId: connectionId, session: response });
  }

  function _onConnectFail() {
      $connectForm.hide();
      $connectActions.hide();
      $connecting.hide();
      $error.show();
  }

  function _reset() {
      $username.val('');
      $password.val('');

      $connectForm.show();
      $connectActions.show();
      $connecting.hide();
      $error.hide();

      _setDisableConnectButton(true);

      $username.focus();
  }

  function _initialize() {

    $swampUrl.text(location.origin);

    $username.on('keyup', _onInputKeyUp);
    $password.on('keyup', _onInputKeyUp);

    $connectBtn.on('click', _onConnect);
    $cancelBtn.on('click', _onCancel);
    $cancel.on('click', _onCancel);

    $tryAgain.on('click', _reset);

    _setDisableConnectButton(true);

    window.addEventListener('message', function(e) {
        source = e.source;
        if(e.data.event == 'connect') {
            connectionId = e.data.payload.connectionId;
            _postMessage('connected', { connectionId: connectionId });
        }
    });

    window.onbeforeunload = function() {
        _postMessage('swamp_connect_close', { connectionId: connectionId });
    };

    _reset();
  }

  _initialize();

});
