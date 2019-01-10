angular.module("umbraco").controller("Dexmoor.BusinessHours.controller",
    function ($scope) {


        if (!$scope.model.config.timeFormat) {
            $scope.model.config.timeFormat = 24;
        };

        if (!$scope.model.config.defaultOpen) {
            $scope.model.config.defaultOpen = "9:00";
        }

        if (!$scope.model.config.defaultClose) {
            $scope.model.config.defaultClose = "17:00";
        }

        

        $scope.daysoftheweek =
            [{ id: '764dc03a-6f77-4607-b7b6-f650200a39a5', dotw: 'Monday' },
            { id: 'b138f333-b366-4f8a-891f-ea5d04e948b5', dotw: 'Tuesday' },
            { id: '2238d1fa-4d27-4b37-a12a-173518d0d105', dotw: 'Wednesday' },
            { id: '28020ef9-698a-4926-b5c4-b0a98fa15feb', dotw: 'Thursday' },
            { id: '0f818d67-10a7-41ed-a2eb-ae5a4bbd213e', dotw: 'Friday' },
            { id: '2667efc2-6747-4a2a-a758-f934b0ec6952', dotw: 'Saturday' },
            { id: 'b3cc2ff7-ac75-47e8-a615-567f9d8f6b72', dotw: 'Sunday' },
            { id: '587e1626-489e-4db2-99f7-a5efd599a59c', dotw: 'Bank Holidays' }];

        $scope.generateGuid = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        

        $scope.newDate = {
            id: "",
            dayoftheweek: "",
            isOpen: false,
            hoursOfBusiness: []
        };

        $scope.newHoursOfBusiness = {
            id: "",
            opensAt: "",
            closesAt: "",
            byAppointmentOnly: false
        };

        var dotwLength = $scope.model.config.showBankHoliday ? 8 : 7;

        if (!$scope.model.value) {
            $scope.model.value = [];
            for (var i = 0; i < dotwLength; i++) {
                var newDate = angular.copy($scope.newDate);
                newDate.id = $scope.daysoftheweek[i].id;
                newDate.dayoftheweek = $scope.daysoftheweek[i].dotw;
                $scope.model.value.push(newDate);
            }
        }
        else {
            if ($scope.model.config.showbankholiday === "0" && $scope.model.value.length === 8) {
                $scope.model.value.pop();
            }
            else if ($scope.model.config.showbankholiday === "1" && $scope.model.value.length === 7) {
                var newDate2 = angular.copy($scope.newDate);
                newDate2.id = $scope.daysoftheweek[7].id;
                newDate2.dayoftheweek = $scope.daysoftheweek[7].dotw;
                $scope.model.value.push(newDate2);
            }
        }

        $scope.openCheck = function (date) {
            if (date.isOpen) {
                date.hoursOfBusiness = [];
                date.isOpen = false;
            } else {
                date.isOpen = true;
                $scope.addHours(date.hoursOfBusiness);
            }
        };

        $scope.appointmentOnlySwitch = function (openTime) {
            if (openTime.byAppointmentOnly) {
                openTime.byAppointmentOnly = false;
            } else {
                openTime.byAppointmentOnly = true;
            }
        };

        

        $scope.addHours = function (date) {
            if (!angular.isArray(date.hoursOfBusiness)) {
                date.hoursOfBusiness = [];
            }
            var newHoursOfBusiness = angular.copy($scope.newHoursOfBusiness);
            newHoursOfBusiness.id = $scope.generateGuid();
            date.push(newHoursOfBusiness);
        };

        $scope.deleteHours = function (index, parentIndex) {
            $scope.model.value[parentIndex].hoursOfBusiness.splice(index, 1);
        };


        

    }
);




