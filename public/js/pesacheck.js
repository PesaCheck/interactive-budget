
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


pesacheck.directive("pesacheckCounter", [
  function(){
    return {
      restrict: "A",
      replace: false,
      link: function(scope, element, attrs, controller, transcludeFn){
        console.log(element)
        $(element).each(function () {
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            }, {
                duration: 2000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
      }
    }
  }
]);

pesacheck.directive("pesacheckSlideLoader", [
  "$timeout",
  function($timeout){
    return {
      restrict: "A",
      replace: false,
      link: function(scope, element, attrs, controller, transcludeFn){

        var width = $(element).width();
        var loadingWidth = null;
        var timeout = null;
        var slice = null;
        scope.loadingScale = "";

        scope.$watch(
          function(){
            return attrs['slide']
          },
          function(newVal, oldVal){
            computeVars(attrs['timeout'])
            computeLoading()
          }
        );

        function computeVars(timeout){
          timeout = timeout * 10;
          slice =  width / timeout
          loadingWidth = slice;
          scope.loadingScale = loadingWidth + 'px';
          scope.loadingScale = "";
        }

        function computeLoading(){
          $timeout(function () {
            loadingWidth = loadingWidth + slice ;
            scope.loadingScale = loadingWidth + 'px';
             if (loadingWidth < width) {
                computeLoading();
             }
          }, 100);
        }
      }
    }
  }
]);

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

pesacheck.directive("pesacheckTimeline", [
  "$timeout",
  function($timeout){
    return {
      restrict: "A",
      replace: false,
      link: function(scope, element, attrs, controller, transcludeFn){
        var slides = [
          {
            name: "slide1",
            tag: "intro",
            position: 1,
            layout: "image-headline",
            data: {
              imageUri: "http://www.kenya-today.com/wp-content/uploads/2015/10/179.jpg",
              headline: "the Former Prime Minister accuses the government of failing to account for some funds received from the Eurobond issued in June 2014."
            },
            timeout: 5
          },
          {
            name: "slide2",
            tag: "claim",
            position: 2,
            layout: "numbers",
            data: {

            },
            timeout: 5
          },
          {
            name: "slide3",
            tag: "question",
            position: 3,
            layout: "pesacheck-meter",
            data: {
              question: "is Mr. Raila Odinga justified in warning investors off a potential second Eurobond Issue?"
            },
            timeout: 5
          },
          {
            name: "slide4",
            tag: "facts",
            position: 4,
            layout: "numbers",
            data: {},
            timeout: 5
          },
          {
            name: "slide5",
            tag: "verdict",
            position: 5,
            layout: "pesacheck-meter",
            data: {
              question: "is Mr. Raila Odinga justified in warning investors off a potential second Eurobond Issue?",
              verdict: 0
            },
            timeout: 5
          }
        ];

        var count = 0;

        function changeContext () {
          scope.layout= slides[count].layout + "-layout.html";
          scope.data = slides[count].data;
          scope.tag = slides[count].tag;
          scope.timeout = slides[count].timeout;
          scope.position = slides[count].position;
          count++;
        }

        function changeSlide () {
          $timeout(function () {
             changeContext()
             console.log(scope.layout)
             if (count < slides.length) {
                changeSlide();
             }
          }, slides[count].timeout * 1000);
        }

        changeContext();
        changeSlide();
    }
  }
}]);

pesacheck.directive("bgImage", [
  function(){
    return {
      restrict: "A",
      replace: false,
      link: function(scope, element, attrs, controller, transcludeFn){

        var url = attrs.bgImage;
        console.log(url)
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
      }
    }
  }
]);
