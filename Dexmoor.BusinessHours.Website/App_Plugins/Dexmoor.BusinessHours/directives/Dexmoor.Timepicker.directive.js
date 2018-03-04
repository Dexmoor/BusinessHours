angular.module("umbraco").directive('dexmoorTimePicker', function () {
    return {
      restrict: 'AE',
      require: 'ngModel',
      scope: {
        ngModel: '=',
        defaultTime: '@'
  },
    link: function (scope, element) {
      var config = {
        useCurrent: false,
        format: 'hh:mm a',
        pickDate: false,
        defaultDate: scope.ngModel ? scope.ngModel : scope.defaultTime
    };
      element.datetimepicker(config);
      element.on("dp.hide",
        function (event) {
          scope.ngModel = event.date.format("hh:mm a");
          scope.$apply();
        });
    },
    template: '<input name="time" type="text" ng-model="ngModel" placeholder="Select time" required/>'
  }
});
