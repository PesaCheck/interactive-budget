pesacheck.controller("embeddedCtrl", [
  "$stateParams",
  function($stateParams){
    var self = this;

    angular.extend(self, {
      id: $stateParams.id
    });
  }
]);

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
    console.log(id)
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
      },
      addFinding: function(data){
        if(typeof(data) == 'object'){
          self.data.findings.push(data);
        }
      },
      addExplanation: function(data){
        if(typeof(data) == 'object'){
          self.data.explanations.push(data);
        }
      }
    });

    if(self.data.explanations == undefined){
      self.data.explanations = [];
    }

    if(self.data.findings == undefined){
      self.data.findings = [];
    }
  }
])

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
                duration: 1000,
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

pesacheck.directive("pesacheckMeter", [
  "$interval",
  function($interval){
    return {
      restrict: "E",
      replace: false,
      templateUrl: "./tpls/meter.html",
      link: function(scope, element, attrs, controller, transcludeFn){
        var meter_needle =  document.querySelector(".pointer-false");
        /*meter_needle.style.transform = "rotate(" +
        (300 + ((20 * 180) / 100)) + "deg)";*/
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
  "$timeout","$animate","$stateParams", "$Story",
  function($timeout, $animate, $stateParams, $Story){
    return {
      restrict: "A",
      replace: false,
      link: function(scope, element, attrs, controller, transcludeFn){
        scope.layout= "loading-layout.html";

        var story;
        scope.$watch(
          function(){
            return attrs['story']
          },
          function(newVal, oldVal){
            story = $Story.get(newVal);

            story.$loaded(
              function(data) {
                // slide 1
                slides[0].data.imageUri = data.headlineImage;
                slides[0].data.headline = data.headline;
                slides[0].timeout = data.introDuration;
                // slide 2
                slides[1].timeout = data.explanationDuration;
                slides[1].data.stats = data.explanations;
                slides[1].data.title = data.explanationTitle;

                // Slide 3
                slides[2].data.question = data.meterQuestion;
                slides[2].timeout = data.meterDuration;
                // slide 4
                slides[3].timeout = data.findingsDuration;
                slides[3].data.stats = data.findings;
                slides[3].data.title = data.FindingsTitle;
                // Slide 5
                slides[4].data.question = data.meterQuestion;
                slides[4].data.verdict = translateVerdict(data.meterVerdict);

                angular.forEach(data.findings, function(value, key){
                  console.log(key)
                  console.log(value)

                })

                changeContext();
                changeSlide();
              },
              function(error) {
                console.error("Error:", error);
              }
            );
          }
        );
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
              title: "",
              stats: [
                /*{
                  heading: "Eurobond's Net Proceeds",
                  description: "Funds to be deposited in the Consolidated Fund",
                  figure: "173.9",
                  figureMeta: "Billion Kenya Shillings"
                },*/
                /*{
                  heading: "Eurobond issue",
                  description: "Funds that were deposited in the Consolidated Fund",
                  figure: "39.5",
                  figureMeta: "Billion Kenya Shillings"
                },
                {
                  heading: "Tap Sales",
                  description: "proceeds that were deposited in the Consolidated Fund",
                  figure: "81.5",
                  figureMeta: "Billion Kenya Shillings"
                }*/
              ]
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
            data: {
              title: "PesaCheck's findings",
              stats: [
                {
                  heading: "Proceeds deposited in Sep and Dec 2014",
                  description: "Amount transferred by the Government into a Sovereign Bond account at Central Bank",
                  figure: "88.46",
                  figureMeta: "Billion Kenya Shillings"
                }
                /*{
                  heading: "Athletes",
                  description: "Participants in the olympics 2016",
                  figure: "80",
                  figureMeta: "Billion Kenya Shillings"
                }*/
              ]
            },
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

        function translateVerdict(verdict){
          if(verdict == 'false'){
            return 0;
          }else if(verdict == 'partlytrue'){
            return 1;
          }else if(verdict == 'plausible'){
            return 2;
          }else if(verdict == 'true'){
            return 3;
          }
        }

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
             changeContext();
             if (count < slides.length) {
                changeSlide();
             }
          }, slides[count].timeout * 1000);
        }



        $animate.on('enter', element,
           function callback(el, phase) {
             $(element).addClass('animated fadeIn');
           }
        );

        $animate.on('leave', element,
           function callback(el, phase) {
             $(el).addClass('animated fadeOutLeft');
             // cool we detected an enter animation within the container
           }
        );
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
