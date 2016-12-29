pesacheck.controller("embeddedCtrl", [
  "$stateParams",
  function($stateParams){
    var self = this;

    angular.extend(self, {
      id: $stateParams.id
    });
  }
]);
