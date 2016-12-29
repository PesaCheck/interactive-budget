pesacheck.controller("pesacheckStoriesCtrl", [
  "$scope","$uibModal","$state","$Story",
  function($scope, $uibModal, $state, $Story){
    var self = this;


    $scope.stories = $Story.fetchAll();
    // this waits for the data to load and then logs the output. Therefore,
    // data from the server will now appear in the logged output. Use this with care!
    $scope.stories.$loaded()
      .then(function() {
        console.log($scope.stories);
      })
      .catch(function(err) {
        console.error(err);
      });


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
        $state.transitionTo("edit-story", {id: createdStory});
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    }

    function previewStory(id){
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'previewStory.html',
        controller: 'previewStoryCtrl',
        controllerAs: '$ctrl',
        size: 'lg',
        resolve: {
          id: function () {
            return id;
          }
        }
      });

      modalInstance.result.then(function () {

      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    }


    angular.extend(self, {
      newStory: createStory,
      preview: previewStory
    })
  }
]);

pesacheck.controller("createStoryCtrl", [
  "$uibModalInstance","_","uuid","$Story",
  function($uibModalInstance, _, uuid, $Story){
    var self = this;

    angular.extend(self, {
      story: {
        name: "",
        tags: [],
        createdOn: firebase.database.ServerValue.TIMESTAMP,
        published: false
      },
      ok: function () {
        $Story.save(self.story).then(
          function(ref){
            var id = ref.key;
            console.log("added new story with id " + id);
            $uibModalInstance.close(id);
          }
        );

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
  }
]);


pesacheck.controller("previewStoryCtrl", [
  "$uibModalInstance","id",
  function($uibModalInstance, id){
    var self = this;

    angular.extend(self, {
      id: id,
      ok: function () {
        $uibModalInstance.dismiss('ok');
      },
      cancel: function () {
        $uibModalInstance.dismiss('cancel');
      }

    });
  }
]);


pesacheck.controller("editStoryCtrl", [
  "$stateParams", "$Story",
  function($stateParams, $Story){
    var self = this;

    angular.extend(self,{
      data: $Story.get($stateParams.id),
      update: function(){
        self.data.$save().then(
          function(ref){
            console.log(ref.key === self.data.$id);
            console.log(self.data)
            alert("Story updated successfully")
          }
        )
      }
    });

    console.log(self.data)
  }
])
