pesacheck.directive("pesacheckSlider", [
  function(){
    return {
      restrict: "E",
      replace: false,
      templateUrl: "tpls/pesacheck-slider.html",
      controller: "PesaCheckSliderCtrl",
      controllerAs: "PCSC"
    }
  }
]);

pesacheck.factory("$PesaCheckSlider", function(){
  var Slider = {
    content: [],
    setContent: function(content){
      Slider.content = content;
    }
  }
  return Slider;
});


pesacheck.controller("PesaCheckSliderCtrl",[
  "$PesaCheckSlider","$scope",
  function($PesaCheckSlider, $scope){
    var self = this;

    angular.extend(self, {
      content: $PesaCheckSlider.content
    })

    $scope.$watch(
      function(){
        return $PesaCheckSlider.content
      },
      function(newVal, oldVal){
        if(oldVal != newVal)
          self.content = newVal;
      }
    )
  }
])
