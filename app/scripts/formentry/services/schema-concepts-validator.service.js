/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026, -W083
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function () {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .factory('SchemaConceptsValidator', SchemaConceptsValidator);

    SchemaConceptsValidator.$inject = ['$log'];

    function SchemaConceptsValidator($log) {
        var definition = {

        };

        return definition;
    }
})();