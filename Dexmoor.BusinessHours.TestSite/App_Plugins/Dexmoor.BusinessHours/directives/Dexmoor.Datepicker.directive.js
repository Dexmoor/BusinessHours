angular.module("umbraco").directive('dexmoorDatePicker', function() {
  return {
    restrict: 'AE',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    link: function(scope, element, attributes) {
        var modelName = attributes["dexmoorDatePicker"];
      var config = {
        useCurrent: false,
        format: "YYYY-MM-DD",
        defaultDate: new Date()
      };
      element.datetimepicker(config);
      element.on("dp.hide",
        function(event) {
          scope.ngModel = event.date.format("YYYY-MM-DD");
          scope.$apply();
        });
    },
    template: '<input name="date" type="text" ng-model="ngModel" placeholder="Select date" required/>'
  }
});
