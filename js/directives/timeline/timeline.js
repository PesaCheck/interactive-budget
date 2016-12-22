pesacheck.directive("pesacheckTimeline", [
  function(){
    return {
      restrict: "E",
      replace: false,
      link: function(scope, element, attrs, controller, transcludeFn){
        var slides = [
          {
            name: "slide1",
            tag: "intro",
            position: 1,
            layout: "image-headline",
            data: {
              imageUri: "",
              headline: ""
            }
          },
          {
            name: "slide2",
            tag: "claim",
            position: 2,
            layout: "numbers",
            data: {

            }
          },
          {
            name: "slide3",
            tag: "question",
            position: 3,
            layout: "dancing-meter",
            data: "Is the question realy needed?"
          },
          {
            name: "slide4",
            tag: "facts",
            position: 4,
            layout: "numbers",
            data: {}
          },
          {
            name: "slide5",
            tag: "verdict",
            position: 5,
            layout: "verdict",
            data: {
              question: "Is the question realy needed?",
              verdict: 0;
            }
          }
        ]
      }
    }
  }
]);
