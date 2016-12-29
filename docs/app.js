var pesacheck = angular.module("PesaCheck", [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'angular-uuid',
  'firebase'
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
      url: "/embed/:id",
      controller: "embeddedCtrl",
      controllerAs: 'Embedded'
    })

    .state("stories", {
      parent: "admin",
      templateUrl: "tpls/stories.html",
      url: "/stories",
      controller: "pesacheckStoriesCtrl",
      controllerAs: 'Stories'
    })

    .state("edit-story", {
      parent: "admin",
      templateUrl: "tpls/edit-story.html",
      url: "/story/edit/:id",
      controller: "editStoryCtrl",
      controllerAs: 'Story'
    })

  // use the HTML5 History API
  // $locationProvider.html5Mode(true);
});


// define constants
pesacheck.constant('_',window._);

pesacheck.run(function($state){
  $state.transitionTo('stories');
});
