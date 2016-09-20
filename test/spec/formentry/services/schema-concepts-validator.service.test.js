/* global inject */
/* global beforeEach */
/* global describe */
/* global expect */
/* global it */
/*jshint -W026, -W030, -W106 */
(function () {
    'use strict';
    describe.only('Concept Validator Service Unit Tests', function () {
        beforeEach(function () {
            module('openmrs.angularFormentry');
        });

        var service;
        var sampleForm = {
            name: 'some form',
            uuid: 'some form uuid',
            processor: 'SomeProcessor',
            pages: [
                {
                    label: 'TB Treatment',
                    sections: [
                        {//Case: section with multiple questions
                            label: 'Tuberculosis History',
                            questions: [
                                {//Case: Question with answers
                                    id: 'onTbTreatment',
                                    label: 'Is patient on TB treatment?',
                                    questionOptions: {
                                        concept: 'a8afcc82-1350-11df-a1f1-0026b9348838',
                                        answers: [
                                            {
                                                concept: 'a899b35c-1350-11df-a1f1-0026b9348838',
                                                label: 'Yes'
                                            },
                                            {
                                                concept: 'a899b42e-1350-11df-a1f1-0026b9348838',
                                                label: 'No'
                                            }
                                        ]
                                    }
                                },
                                {//Case: question with primitive values
                                    id: 'endDateTbTreatment',
                                    label: 'TB treatment end-date',
                                    questionOptions: {
                                        concept: 'a8af7782-1350-11df-a1f1-0026b9348838',
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'TB Treatment Details',
                    sections: [ //page with several sections
                        {
                            label: 'Tuberculosis Drugs History',
                            questions: [
                                {
                                    label: 'Start date of TB treatment',
                                    questionOptions: { //case groups with multiple question
                                        concept: 'a8afcc82-1350-11df-a1f1-0026b9348838'
                                    },
                                    questions: [
                                        {
                                            id: 'startDateOfTbTreatment',
                                            label: 'Start date of TB treatment:',
                                            questionOptions: {
                                                concept: 'a8af7782-1350-11df-a1f1-0026b9348838',
                                            }
                                        },
                                        {
                                            label: 'TB tablets per day:',
                                            questionOptions: {
                                                concept: 'a8a07386-1350-11df-a1f1-0026b9348838',
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: 'Tuberculosis Drugs Further Details',
                            questions: [
                                {
                                    label: 'TB tablets per day last week:',
                                    questionOptions: {
                                        concept: 'a8a07386-1350-11df-a1f1-0026b9348838',
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        beforeEach(inject(function ($injector) {
            service = $injector.get('SchemaConceptsValidator');
        }));

        it('should inject concept validator services', function () {
            expect(service).to.exist;
        });

        it('should transfrom a schema into a flat version when flattenSchema is invoked', function () {
            var expectedTransformedVersion = [
                {
                    form: 'some form',
                    page: 'TB Treatment',
                    section: 'Tuberculosis History',
                    questionId: 'onTbTreatment',
                    label: 'Is patient on TB treatment?',
                    concept: 'a8afcc82-1350-11df-a1f1-0026b9348838',
                    answers: [
                        {
                            concept: 'a899b35c-1350-11df-a1f1-0026b9348838',
                            label: 'Yes'
                        },
                        {
                            concept: 'a899b42e-1350-11df-a1f1-0026b9348838',
                            label: 'No'
                        }
                    ]
                },
                {
                    form: 'some form',
                    page: 'TB Treatment',
                    section: 'Tuberculosis History',
                    questionId: 'endDateTbTreatment',
                    label: 'TB treatment end-date',
                    concept: 'a8af7782-1350-11df-a1f1-0026b9348838'
                },
                {
                    form: 'some form',
                    page: 'TB Treatment Details',
                    section: 'Tuberculosis Drugs History',
                    label: 'Start date of TB treatment',
                    concept: 'a8afcc82-1350-11df-a1f1-0026b9348838',
                    questions: [
                        {
                            concept: 'a8af7782-1350-11df-a1f1-0026b9348838',
                            label: 'Start date of TB treatment:',
                        },
                        {
                            concept: 'a8a07386-1350-11df-a1f1-0026b9348838',
                            label: 'TB tablets per day:',
                        }
                    ]
                },
                {
                    form: 'some form',
                    page: 'TB Treatment Details',
                    section: 'Tuberculosis Drugs History',
                    questionId: 'startDateOfTbTreatment',
                    label: 'Start date of TB treatment:',
                    groupConcept: 'a8afcc82-1350-11df-a1f1-0026b9348838',
                    concept: 'a8af7782-1350-11df-a1f1-0026b9348838'
                },
                {
                    form: 'some form',
                    page: 'TB Treatment Details',
                    section: 'Tuberculosis Drugs History',
                    label: 'TB tablets per day:',
                    groupConcept: 'a8afcc82-1350-11df-a1f1-0026b9348838',
                    concept: 'a8a07386-1350-11df-a1f1-0026b9348838'
                },
                {
                    form: 'some form',
                    page: 'TB Treatment Details',
                    section: 'Tuberculosis Drugs Further Details',
                    label: 'TB tablets per day last week:',
                    concept: 'a8a07386-1350-11df-a1f1-0026b9348838'
                }
            ];

            var transformedVersion = service.flattenSchema(sampleForm);

            expect(JSON.stringify(expectedTransformedVersion)).to.deep.equal(JSON.stringify(transformedVersion));
        });

    });

})();