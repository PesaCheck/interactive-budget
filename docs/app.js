var pesacheck = angular.module("PesaCheck", [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate'
]);

pesacheck.config(function($stateProvider, $locationProvider){
  $stateProvider
    .state("admin", {
      templateUrl: "tpls/admin.html",
    })
    .state("home", {
      parent: "admin",
      templateUrl: "tpls/home.html",
      url: "/home"
    })
    .state("story", {
      parent: "admin",
      templateUrl: "tpls/story.html",
      url: "/story"
    })

    .state("embedded", {
      templateUrl: "tpls/embedded.html",
      url: "/embedded"
    })

    .state("stories", {
      parent: "admin",
      templateUrl: "tpls/stories.html",
      url: "/stories",
      controller: "pesacheckStoriesCtrl",
      controllerAs: 'Stories'
    })

  // use the HTML5 History API
  // $locationProvider.html5Mode(true);
});


pesacheck.run(function($state){
  $state.transitionTo('stories');
});
