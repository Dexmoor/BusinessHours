angular.module("umbraco").controller("Dexmoor.SpecialBusinessHours.controller",
    function ($scope) {

        if (!$scope.model.value) {
            $scope.model.value = [];
        };

        if (!$scope.model.config.timeFormat) {
            $scope.model.config.timeFormat = 12;
        };

        if (!$scope.model.config.defaultOpen) {
            $scope.model.config.defaultOpen = "9:00";
        }

        if (!$scope.model.config.defaultClose) {
            $scope.model.config.defaultClose = "17:00";
        }

        $scope.generateGuid = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        $scope.newDate = {
            id: "",
            date: "",
            isOpen: true,
            hoursOfBusiness: []
        };

        $scope.newHoursOfBusiness = {
            id: "",
            opensAt: "",
            closesAt: ""
        }

        $scope.openCheck = function (date) {
            if (date.isOpen) {
                date.hoursOfBusiness = [];
                date.isOpen = false;
            } else {
                date.isOpen = true;
                $scope.addHours(date.hoursOfBusiness);
            }
        }

        $scope.addNewDate = function () {
            var newDate = angular.copy($scope.newDate);
            newDate.id = $scope.generateGuid();
            var newHoursOfBusiness = angular.copy($scope.newHoursOfBusiness);
            newHoursOfBusiness.id = $scope.generateGuid();
            newDate.hoursOfBusiness.push(newHoursOfBusiness);
            $scope.model.value.push(newDate);
        };

        $scope.addHours = function (date) {
            if (!angular.isArray(date.hoursOfBusiness)) {
                date.hoursOfBusiness = [];
            }
            var newHoursOfBusiness = angular.copy($scope.newHoursOfBusiness);
            newHoursOfBusiness.id = $scope.generateGuid();
            date.push(newHoursOfBusiness);
        }

        $scope.deleteHours = function (index, parentIndex) {
            $scope.model.value[parentIndex].hoursOfBusiness.splice(index, 1);
        }


        $scope.deleteDate = function (index) {
            $scope.model.value.splice(index, 1);
            if (!angular.isArray($scope.model.value)) {
                $scope.model.value = [];
            }
        }


        $scope.removeOldDates = function () {
            if ($scope.model.config.removeOldDates) {
                var temp = [];
                for (var i = 0; i < $scope.model.value.length; i++) {
                    var date = Date.parse($scope.model.value[i].date);
                    var currentDate = new Date();
                    currentDate.setHours(0, 0, 0, 0);
                    if (date >= currentDate) {
                        temp.push($scope.model.value[i]);
                    }
                    else {
                        $scope.oldDatesRemovedOnSave = true;
                    }
                }
                $scope.model.value = temp;

            }
           
        }

        $scope.removeOldDates();
    }
);




