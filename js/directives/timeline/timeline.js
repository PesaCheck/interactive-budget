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
