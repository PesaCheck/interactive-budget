pesacheck.controller("pesacheckStoriesCtrl", [
  "$scope",
  function($scope){
    var self = this;
    var stories = [
      {
        name: "Mr. Raila Odinga Warns on Eurobond Issues",
        createdOn: "1 days ago",
        published: false,
        id: "b16317b0-583e-4391-bb86-9a7c5314a25d"
      },
      {
        name: "Bomet's MCA talks about delays on payment for the elderly",
        createdOn: "3 days ago",
        published: true,
        id: "d9a6b3cb-271c-4c93-9591-10d275ccfb50"
      }
    ];


    angular.extend(self, {
      log: stories
    })
  }
]);
