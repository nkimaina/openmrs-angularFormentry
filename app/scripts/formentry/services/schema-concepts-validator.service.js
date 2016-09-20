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
            flattenSchema: flattenSchema,
            extractUniqueConcepts: extractUniqueConcepts
        };

        return definition;

        function extractUniqueConcepts(flattenedSchema) {
            var obj = {};
            return obj;
        }

        function flattenSchema(formSchema) {
            var flattenedSchema = [];
            _flattenSchema(formSchema, flattenedSchema);
            return flattenedSchema;
        }
        function _flattenSchema(node, flattened, form, pageLabel, sectionLabel, groupLabel, groupConcept) {
            if (_isNodeAform(node)) {
                _.each(node.pages, function (page) {
                    _flattenSchema(page, flattened, node.name);
                });
                return;
            }

            if (_isNodeApage(node)) {
                _.each(node.sections, function (section) {
                    _flattenSchema(section, flattened, form, node.label);
                });
                return;
            }

            if (_isNodeAsection(node)) {
                _.each(node.questions, function (question) {
                    _flattenSchema(question, flattened, form, pageLabel, node.label);
                });
                return;
            }

            if (_isNodeAgroup(node)) {
                //Node is a grouped question. Also add it to the group
                var question = _getFlattenedGroup(node, form, pageLabel,
                    sectionLabel, groupLabel, groupConcept);
                flattened.push(question);
                _.each(node.questions, function (question) {
                    _flattenSchema(question, flattened, form, pageLabel, sectionLabel,
                        node.label, node.questionOptions.concept);
                });
                return;
            }

            //Node is a question
            var question = _getFlattenedQuestion(node, form, pageLabel, sectionLabel, groupLabel, groupConcept);
            flattened.push(question);

        }

        function _getFlattenedGroup(node, form, page, section, group, groupConcept) {
            var question = {
                form: form,
                page: page,
                section: section,
                questionId: node.id,
                label: node.label,
                groupConcept: undefined,
                concept: node.questionOptions.concept,
                questions: []
            };

            _.each(node.questions, function (q) {
                question.questions.push({
                    concept: q.questionOptions.concept,
                    label: q.label
                });
            })

            if (groupConcept) {
                question.groupConcept = groupConcept;
            }
            return question;

        }

        function _getFlattenedQuestion(node, form, page, section, group, groupConcept) {
            var question = {
                form: form,
                page: page,
                section: section,
                questionId: node.id,
                label: node.label,
                groupConcept: undefined,
                concept: node.questionOptions.concept
            };

            if (groupConcept) {
                question.groupConcept = groupConcept;
            }

            if (node.questionOptions.answers) {
                question.answers = node.questionOptions.answers;
            }
            return question;

        }

        function _isNodeAform(node) {
            if (typeof node === 'object' && Array.isArray(node.pages)) return true;
            return false;
        }

        function _isNodeApage(node) {
            if (typeof node === 'object' && Array.isArray(node.sections)) return true;
            return false;
        }

        function _isNodeAsection(node) {
            if (typeof node === 'object' && Array.isArray(node.questions) && node.questionOptions === undefined)
                return true;
            return false;
        }

        function _isNodeAgroup(node) {
            if (typeof node === 'object' && Array.isArray(node.questions) && node.questionOptions)
                return true;
            return false;
        }


    }
})();