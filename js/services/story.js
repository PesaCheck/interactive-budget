pesacheck.factory("$Story", [
  "$firebaseObject","$firebaseArray",
  function($firebaseObject, $firebaseArray){
    var self = this;
    var stories = []
    angular.extend(self, {
      save: function(story){
        if(typeof(story) != "object"){
          console.log("illegal save. cancelled request")
          return
        }
        return self.fetchAll().$add(story)
      },
      fetchAll: function(){
        if(stories.length < 1){
          var ref = firebase.database().ref();
          stories = $firebaseArray(ref.child('pesacheck').child('stories'));
        }
        return stories;
      },
      get: function(id){
        if(id == null){ return null;}
        var ref = firebase.database().ref().child('pesacheck').child('stories').child(id);

        return $firebaseObject(ref);
      }
    });

    return self;
  }
])
