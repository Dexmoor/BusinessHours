angular.module("umbraco").directive('dexmoorTimePicker', function () {
    return {
        restrict: 'AE',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            ngTimeFormat: '@',
            defaultTime: '@'
        },
        link: function (scope, element) {

            var timeFormat = scope.ngTimeFormat == 24 ? 'HH:mm' : 'hh:mm a';

            var defaultTime = scope.defaultTime ? scope.defaultTime : '00:00';

            var config = {
                showMeridian: false,
                useCurrent: false,
                format: timeFormat,
                pickDate: false,
                defaultDate: scope.ngModel ? scope.ngModel : defaultTime
            };


            element.datetimepicker(config);
            element.on("dp.hide",
                function (event) {
                    scope.ngModel = event.date.format(timeFormat);
                    scope.$apply();
                });

        },
        template: '<input name="time" type="text" ng-model="ngModel" placeholder="Select time" required/><p>{{timeFormat}}</p>'
    };
});
