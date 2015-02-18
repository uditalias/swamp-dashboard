'use strict';

angular.module('swamp.controllers').controller('footerController', ['$scope', '$rootScope', 'EVENTS', 'swampManager', 'swampServicesManager', '$timeout', 'modalService', 'MODAL_TYPE',
  function ($scope, $rootScope, EVENTS, swampManager, swampServicesManager, $timeout, modalService, MODAL_TYPE) {

    $scope.handler = {
      collapsed: true,
      initializing: true,
      title: '',
      maximized: false,
      panelContentHeight: 300,
      swampVersion: window.swampVersion
    };

    $scope.tabsContent = [];
    $scope.enabledTabsContent = [];

    var tailAllLogsState = false;

    $scope.setActive = function (id) {

      _.forEach($scope.tabsContent, function (tab) {

        tab.active = id == tab.id;

        if (tab.active) {

          $scope.handler.title = tab.name;

        }
      });
    }

    $scope.toggleView = function () {
      if ($scope.handler.maximized) {

        $(window).off('resize', _setPanelMaxHeight);

        $scope.handler.panelContentHeight = 300;

      } else {

        _setPanelMaxHeight();

        $(window).on('resize', _setPanelMaxHeight);

      }

      $scope.handler.maximized = !$scope.handler.maximized;
    }

    $scope.openLogsWindow = function () {

      var payload = {
        tabsContent: $scope.tabsContent,
        enabledTabsContent: $scope.enabledTabsContent
      }

      modalService.open(MODAL_TYPE.LOGS_SELECTOR, payload).result.then(_onLogsSelected);

    }

    $scope.closeTabPanel = function ($event, tabId) {

      $event.stopPropagation();
      $event.preventDefault();

      var removedTab = _.remove($scope.enabledTabsContent, {id: tabId});

      removedTab[0].onClose && removedTab[0].onClose(removedTab[0]);

      if ($scope.enabledTabsContent.length == 0) {

        $scope.handler.panelContentHeight = 300;
        $scope.handler.maximized = false;
        $scope.handler.title = '';

      } else {

        if (removedTab[0].active) {

          var activeTabId = $scope.enabledTabsContent[0].id;

          $scope.setActive(activeTabId);

          $timeout(function () {

            $rootScope.$broadcast(EVENTS.VERTICAL_SCROLL_INTO_VIEW, '#tab_item_' + activeTabId);

          }, 10);

        }

      }

      $rootScope.$emit(EVENTS.VERTICAL_SCROLL_RECALCULATE_DIMENSIONS);
    };

    function _onLogsSelected(logs, aggregate) {

      if (!logs) {
        return;
      }

      _.forEach($scope.tabsContent, function (tab) {

        if (logs[tab.id]) {

          if (!_.find($scope.enabledTabsContent, {id: tab.id})) {

            $scope.enabledTabsContent.push(tab);

            tab.onOpen && tab.onOpen(tab);

          }

        } else {

          if (!aggregate) {

            _.remove($scope.enabledTabsContent, {id: tab.id});

            tab.onClose && tab.onClose(tab);

          }

        }

      });

      if ($scope.enabledTabsContent.length > 0) {
        $scope.setActive($scope.enabledTabsContent[0].id);

        $rootScope.$emit(EVENTS.VERTICAL_SCROLL_RECALCULATE_DIMENSIONS);
      }

    }

    function _setPanelMaxHeight() {
      $scope.handler.panelContentHeight = _getPanelMaxHeight();
    }

    function _getPanelMaxHeight() {
      return $(window).innerHeight() - 64;
    }

    function _setTitle() {

      var tab = _.where($scope.enabledTabsContent, {active: true});

      $scope.handler.title = tab.length ? tab[0].name : '';

    }

    function _onOpenFooterPanelRequest(event, panelId) {

      if (!_.find($scope.enabledTabsContent, {id: panelId})) {
        var tabs = {};
        tabs[panelId] = true;
        _onLogsSelected(tabs, true);
      }

      $scope.setActive(panelId);

      $scope.handler.collapsed = false;

      $timeout(function () {

        $rootScope.$broadcast(EVENTS.VERTICAL_SCROLL_INTO_VIEW, '#tab_item_' + panelId);

      }, 10);

      $rootScope.$emit(EVENTS.VERTICAL_SCROLL_RECALCULATE_DIMENSIONS);

    }

    function _initializeSwampTabs() {

      $scope.tabsContent.push({
        id: swampManager.outLogData.id,
        active: false,
        tailed: tailAllLogsState,
        parseAsHtml: false,
        paused: false,
        query: '',
        inQueryMode: false,
        itemcls: 'color-green',
        name: 'Swamp out log',
        content: swampManager.outLogData
      });

      $scope.tabsContent.push({
        id: swampManager.errorLogData.id,
        active: false,
        tailed: tailAllLogsState,
        parseAsHtml: false,
        paused: false,
        query: '',
        inQueryMode: false,
        itemcls: 'color-red',
        name: 'Swamp error log',
        content: swampManager.errorLogData
      });

      $scope.handler.initializing = false;
    }

    function _initializeSwampServicesTabs() {
      _.forEach(swampServicesManager.getAll(), function (service) {

        $scope.tabsContent.push({
          id: service.outLogData.id,
          serviceId: service.id,
          service: service,
          active: false,
          tailed: tailAllLogsState,
          parseAsHtml: false,
          paused: false,
          query: '',
          inQueryMode: false,
          itemcls: 'color-warm-grey',
          name: service.name + ' out log',
          content: service.outLogData,
          onOpen: _onOpenOutLogTab,
          onClose: _onCloseOutLogTab,
          onStart: _onStartClick,
          onStop: _onStopClick,
          onRestart: _onRestartClick
        });

        $scope.tabsContent.push({
          id: service.errorLogData.id,
          serviceId: service.id,
          service: service,
          active: false,
          tailed: tailAllLogsState,
          parseAsHtml: false,
          paused: false,
          query: '',
          inQueryMode: false,
          itemcls: 'color-red',
          name: service.name + ' error log',
          content: service.errorLogData,
          onOpen: _onOpenErrorLogTab,
          onClose: _onCloseErrorLogTab,
          onStart: _onStartClick,
          onStop: _onStopClick,
          onRestart: _onRestartClick
        });

      });

      $scope.handler.initializing = false;
    }

    function _onStartClick(service) {
      $scope.serviceActions.start(service);
    }

    function _onStopClick(service) {
      $scope.serviceActions.stop(service);
    }

    function _onRestartClick(service) {
      $scope.serviceActions.restart(service);
    }

    function _onOpenOutLogTab(tab) {
      if(tab.serviceId) {
        swampServicesManager.subscribeServiceOutLog(tab.serviceId);
      }
    }

    function _onCloseOutLogTab(tab) {
      if(tab.serviceId) {
        swampServicesManager.unsubscribeServiceOutLog(tab.serviceId);
      }
    }

    function _onOpenErrorLogTab(tab) {
      if(tab.serviceId) {
        swampServicesManager.subscribeServiceErrorLog(tab.serviceId);
      }
    }

    function _onCloseErrorLogTab(tab) {
      if(tab.serviceId) {
        swampServicesManager.unsubscribeServiceErrorLog(tab.serviceId);
      }
    }

    function _onTailLogsStateChange(event, state) {

      tailAllLogsState = state;

      _.forEach($scope.tabsContent, function (tabContent) {

        tabContent.tailed = state;

      });
    }

    function _onClearAllLogs(event) {

      _.forEach($scope.tabsContent, function (tabContent) {

        tabContent.content.clear();

      });

    }

    $scope.$watch(function () {
      return $scope.handler.collapsed;
    }, function (newVal) {
      if (newVal) {
        $scope.handler.title = '';
      } else {
        _setTitle();
      }
      $rootScope.$broadcast(EVENTS.FOOTER_PANEL_STATE_CHANGE, newVal);
    });

    $rootScope.$on(EVENTS.OPEN_FOOTER_PANEL, _onOpenFooterPanelRequest);
    $rootScope.$on(EVENTS.SWAMP_MANAGER_INITIALIZED, _initializeSwampTabs);
    $rootScope.$on(EVENTS.SWAMP_SERVICES_MANAGER_INITIALIZED, _initializeSwampServicesTabs);
    $rootScope.$on(EVENTS.TAIL_LOGS_STATE_CHANGE, _onTailLogsStateChange);
    $rootScope.$on(EVENTS.CLEAR_ALL_LOGS, _onClearAllLogs);


  }]);
