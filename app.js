var pesacheck = angular.module("PesaCheck", [
  'ui.router',
  'ui.bootstrap'
]);

pesacheck.config(function($stateProvider, $locationProvider){
  $stateProvider
    .state("home", {
      templateUrl: "tpls/home.html",
      url: "/"
    })

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
});
