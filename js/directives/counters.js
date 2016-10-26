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
