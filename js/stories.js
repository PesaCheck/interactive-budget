pesacheck.controller("pesacheckStoriesCtrl", [
  "$scope","$uibModal","$state",
  function($scope, $uibModal, $state){
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
        $state.transitionTo("edit-story");
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
    var self = this;

    angular.extend(self, {
      story: {
        id: uuid.v4(),
        name: "",
        tags: [],
        createdOn: new Date(),
        published: false
      },
      ok: function () {
        $uibModalInstance.close(self.story);
      },
      cancel: function () {
        $uibModalInstance.dismiss('cancel');
      },
      selectTag: function(tag){
        if(_.contains(self.story.tags, tag)){
          self.story.tags = _.without(self.story.tags, tag);
        }else{
          self.story.tags.push(tag);
        }
      }

    });

    function createStory(){

    }
  }
]);


pesacheck.controller("editStoryCtrl", [
  function(){
    var self = this;

    angular.extend(self,{

    });
  }
])
