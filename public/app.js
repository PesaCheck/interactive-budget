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
    .state("story", {
      templateUrl: "tpls/story.html",
      url: "/story"
    })

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
});