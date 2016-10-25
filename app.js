var pesacheck = angular.module("PesaCheck", [
  'ui.router'
]);

pesacheck.config(function($stateProvider){
  $stateProvider
    .state("home", {
      templateUrl: "tpls/home.html",
      url: "/"
    })
});
