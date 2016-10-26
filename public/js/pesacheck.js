
pesacheck.directive("pesacheckCharts", [
  function(){
    return {
      restrict: "E",
      replace: true,
      templateUrl: "./tpls/pesacheck-charts.html",
      controller: "pesacheckChartsCtrl",
      link: function(scope, element, attrs, controller, transcludeFn){
        var myBubbleChart = new Chart(element,{
          type: 'bubble',
          data: {
            datasets: [
              {
                label: 'Responses from #KOT',
                data: [
                  {
                    x: 20,
                    y: 10,
                    r: 55
                  },
                  {
                    x: 30,
                    y: 15,
                    r: 10
                  }
                ],
                backgroundColor:"#FF6384",
                hoverBackgroundColor: "#FF6384",
              }]
          },
          options: {
            elements: {
              points: {
                borderWidth: 1,
                borderColor: 'rgb(0, 0, 0)'
              }
            }
        }
        });
      }
    }
  }
]);



// charts controller
pesacheck.controller("pesacheckChartsCtrl",[
  "$scope",
  function($scope, $element){
    var self = this;

    angular.extend(self, {

    });
  }
])


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
    content: [
      {
        image: "./images/articles/orphans-and-disabled.jpeg",
        text: ""
      },
      {
        image: "./images/articles/water-for-schools.jpeg",
        text: ""
      }
    ],
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
      content: $PesaCheckSlider.content,
      interval: 5000
    })

    console.log("pesacheck slider ")

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
