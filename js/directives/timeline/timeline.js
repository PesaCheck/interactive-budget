pesacheck.directive("pesacheckTimeline", [
  "$timeout","$animate",
  function($timeout, $animate){
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
              title: "Mr. Raila Odinga claims that the Eurobond funds were not fully deposited into the Consolidated Fund",
              stats: [
                /*{
                  heading: "Eurobond's Net Proceeds",
                  description: "Funds to be deposited in the Consolidated Fund",
                  figure: "173.9",
                  figureMeta: "Billion Kenya Shillings"
                },*/
                {
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
                }
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

        changeContext();
        changeSlide();

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
