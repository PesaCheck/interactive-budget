pesacheck.directive("pesacheckCharts", [
  function(){
    return {
      restrict: "E",
      replace: true,
      templateUrl: "./tpls/pesacheck-charts.html",
      controller: "pesacheckChartsCtrl",
      link: function(scope, element, attrs, controller, transcludeFn){
        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart() {

          // Create the data table.
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Topping');
          data.addColumn('number', 'Slices');
          data.addRows([
            ['Mushrooms', 3],
            ['Onions', 1],
            ['Olives', 1],
            ['Zucchini', 1],
            ['Pepperoni', 2]
          ]);

          // Set chart options
          var options = {'title':'How Much Pizza I Ate Last Night',
                         'width':400,
                         'height':300};

          // Instantiate and draw our chart, passing in some options.
          var chart = new google.visualization.PieChart(document.getElementById('myChart'));
          chart.draw(data, options);
        }
        // console.log(attrs.type)
        // scope.height = attrs.height;
        // scope.width = attrs.width;

        // if(attrs.type == undefined){
        //   return;
        // } else if(attrs.type == 'bubbleChart'){
        //   var myBubbleChart = new Chart(element, controller.bubbleChartCfg);
        // } else if(attrs.type == 'barChart'){
        //   var myBubbleChart = new Chart(element, controller.barChartCfg);
        // }
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
