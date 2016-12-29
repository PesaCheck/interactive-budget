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
