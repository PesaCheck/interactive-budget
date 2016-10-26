pesacheck.directive("pesacheckCharts", [
  function(){
    return {
      restrict: "E",
      replace: true,
      templateUrl: "./tpls/pesacheck-charts.html",
      controller: "pesacheckChartsCtrl",
      link: function(scope, element, attrs, controller, transcludeFn){
        console.log(attrs.type)
        if(attrs.type == undefined){

        } else if(attrs.type == 'bubbleChart'){
          var myBubbleChart = new Chart(element, controller.bubbleChartCfg);
        } else if(attrs.type == 'barChart'){
          var myBubbleChart = new Chart(element, controller.barChartCfg);
        }
        console.log(controller)
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
      barChartCfg: {
        type: 'bar',
        data: {
            labels: ["Gold", "Silver", "Bronze"],
            datasets: [{
                label: '',
                data: [1000000, 750000, 500000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
        }
      },
      bubbleChartCfg: {
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
      }
    });
  }
])
