pesacheck.controller("pesacheckStoriesCtrl", [
  "$scope","$uibModal",
  function($scope, $uibModal){
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


    function createStory(size, position){
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'createStory.html',
        controller: 'createStoryCtrl',
        controllerAs: '$ctrl',
        size: 'lg',
        resolve: {

        }
      });

      modalInstance.result.then(function (createdStory) {
        self.story = createdStory;
        console.log(createdStory)
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    }


    angular.extend(self, {
      log: stories,
      newStory: createStory
    })
  }
]);

pesacheck.controller("createStoryCtrl", [
  "$uibModalInstance","_","uuid",
  function($uibModalInstance, _, uuid){
    var $ctrl = this;

    angular.extend($ctrl, {
      story: {
        id: uuid.v4(),
        name: "",
        tags: [],
        createdOn: new Date(),
        published: false
      },
      ok: function () {
        $uibModalInstance.close($ctrl.story);
      },
      cancel: function () {
        $uibModalInstance.dismiss('cancel');
      },
      selectTag: function(tag){
        if(_.contains($ctrl.story.tags, tag)){
          $ctrl.story.tags = _.without($ctrl.story.tags, tag);
        }else{
          $ctrl.story.tags.push(tag);
        }
      }

    });

    function createStory(){

    }
  }
]);
