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
