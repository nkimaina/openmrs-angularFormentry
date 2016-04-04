/*
jshint -W106, -W098, -W109, -W003, -W068, -W004, -W033, -W030, -W117, -W116, -W069, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function() {

  'use strict';

  var mod =
    angular
    .module('openmrs.angularFormentry');

  mod.run(function(formlyConfig) {
    // Configure custom types
    formlyConfig.setType({
      name: 'kendo-date-picker',
      // extends:"select",
      wrapper: ['bootstrapLabel', 'bootstrapHasError', 'validation'],
      template: '<div> ' +
        '<input style="width: 100%" kendo-date-picker k-options="datePickerConfig" '+
        'ng-model="$scope.selectModel" /> ' +
        '</div> ',

      controller: function($scope, $log, $timeout) {
        var x = $scope.model[$scope.options.key.split('.')[0]];
        console.log('test kendo model value', x);
        if(!_.isUndefined(x.value)) {
          //format the date
          x.value = kendo.toString(x.value, "yyyy-MM-dd HH:mm:ss+0300");
        }
        $scope.datePickerConfig = {
          format : "dd-MM-yyyy",
          parseFormats: ["yyyy-MM-ddTHH:mm:ss+0300", "yyyy-MM-dd HH:mm:ss+0300", "yyyy-MM-ddTHH:mm:ss.000Z", "yyyy-MM-ddTHH:mm:ss", "dd-MM-yyyy", "yyyy-MM-dd", "dd/MM/yyyy", "yyyy/MM/dd"],
          change : function() {
            var datePickerVal = this.value();
            x.value = $scope.options.value(kendo.toString(datePickerVal, "yyyy-MM-dd HH:mm:ss+0300"));
            console.log('test kendo', datePickerVal)
            $scope.$digest();
          }
        };


        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };
      }
    });

    formlyConfig.setType({
      name: 'kendo-select-multiple',
      // extends:"select",
      wrapper: ['bootstrapLabel', 'bootstrapHasError', 'validation'],
      template: '<div> ' +
        '<select multiple="multiple"  kendo-multi-select k-options="selectOptions" ' +
        'ng-model="$scope.model[$scope.options.key]" ></select> ' +
        '</div> ',

      controller: function($scope, $log, $timeout) {
        var x = $scope.model[$scope.options.key.split('.')[0]]
          //can be used when using getterSetter provided by model options
        $scope.selectModel = function(val) {
          if (angular.isDefined(val)) {
            x.value = val;
          } else {
            return x.value;
          }
        }; //$scope.model[$scope.options.key];


        $scope.selectOptions = {
          dataTextField: 'name',
          dataValueField: 'value',
          valuePrimitive: true,
          dataSource: $scope.to.options
        };
      }
    });

    formlyConfig.setType({
      name: 'kendo-select',
      // extends:"select",
      wrapper: ['bootstrapLabel', 'bootstrapHasError', 'validation'],
      template: '<div class="input-group"> ' +
        '<select kendo-drop-down-list k-options="selectOptions"' +
        'ng-model="$scope.model[$scope.options.key]" style="width: 100%;"></select>' +
        '<div class="input-group-addon" ng-click="clearValue()">' +
        '<span class="glyphicon glyphicon-remove"></span>' +
        '</div>' +
        '</div> ',

      controller: function($scope, $log, $timeout) {
        var x = $scope.model[$scope.options.key.split('.')[0]]
          //can be used when using getterSetter provided by model options
        $scope.selectModel = function(val) {
          if (angular.isDefined(val)) {
            x.value = val;
          } else {
            return x.value;
          }
        }; //$scope.model[$scope.options.key];

        $scope.clearValue = function() {
          x.value = null;
        };
        $scope.to.options.unshift({name:'',value:''});
        $scope.selectOptions = {
          dataTextField: 'name',
          dataValueField: 'value',
          valuePrimitive: true,
          dataSource: $scope.to.options
        };
      }
    });

  })



})();
