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
