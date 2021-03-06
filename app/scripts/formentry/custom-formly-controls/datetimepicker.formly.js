/*
jshint -W106, -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W116, -W069, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function() {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .run(createDatetimePickerType);

    function createDatetimePickerType(formlyConfig, $filter, $log) {
        $log.info('A new type is being created!!');
        var attributes = [
            'hour-step',
            'minute-step',
            'show-meridian',
            'date-disabled',
            'enable-date',
            'current-text',
            'time-text',
            'date-text',
            'now-text',
            'today-text',
            'clear-text',
            'close-text',
            'close-on-date-selection',
        ];

        var bindings = [
            'datepicker-mode',
            'min-date',
            'max-date',
            'hour-step',
            'minute-step',
            'show-meridian'
        ];

        var ngModelAttrs = {};

        angular.forEach(attributes, function(attr) {
            ngModelAttrs[camelize(attr)] = { attribute: attr };
        });

        angular.forEach(bindings, function(binding) {
            ngModelAttrs[camelize(binding)] = { bound: binding };
        });

        formlyConfig.setType({
            name: 'datetimepicker',
            extends: 'input',
            template: '<input class="form-control" ng-model="model[options.key]" ' +
            'is-open="to.isOpen" ng-click="open($event)"  ' +
            'datetime-picker="dd-MMM-yyyy hh:mm:ss a" ' +
            'datepicker-options="to.datepickerOptions"></input>',
            wrapper: ['bootstrapLabel', 'bootstrapHasError'],
            overwriteOk: true,
            defaultOptions: {
                ngModelAttrs: ngModelAttrs,
                templateOptions: {
                    addonLeft: {
                        class: 'glyphicon glyphicon-calendar',
                        onClick: function(options, scope) {
                            if (options.templateOptions.disabled !== true) {
                                options.templateOptions.isOpen = !options.templateOptions.isOpen;
                            }
                        }
                    },
                    onFocus: function($viewValue, $modelValue, scope) {
                        scope.to.isOpen = !scope.to.isOpen;
                        $log.log('View value: ', $viewValue, 'Model value: ', $modelValue);
                    },

                    datepickerOptions: {},
                    timepickerOptions: {},
                }
            }
        });

        function camelize(string) {
            string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
                return chr ? chr.toUpperCase() : '';
            });
            // Ensure 1st char is always lowercase
            return string.replace(/^([A-Z])/, function(match, chr) {
                return chr ? chr.toLowerCase() : '';
            });
        }
    }
})();
