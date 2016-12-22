pesacheck.directive("pesacheckMeter", [
  "$interval",
  function($interval){
    return {
      restrict: "E",
      replace: false,
      templateUrl: "./tpls/meter.html",
      link: function(scope, element, attrs, controller, transcludeFn){

        
      }
    }
  }
]);
