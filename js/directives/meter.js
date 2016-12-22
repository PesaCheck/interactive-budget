pesacheck.directive("pesacheckMeter", [
  function(){
    return {
      restrict: "E",
      replace: false,
      templateUrl: "./tpls/meter.html",
      link: function(scope, element, attrs, controller, transcludeFn){
        console.log($(element));
      }
    }
  }
]);
