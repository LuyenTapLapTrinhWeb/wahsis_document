'use strict';

angular.
module('phonecatApp').
config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider.
        when('/phones', {
            template: '<phone-list></phone-list>'
        }).
        when('/phones/:phoneId', {
            template: '<phone-detail></phone-detail>'
        }).
        when('/toys', {
            template: '<toys-list></toys-list>'
        }).
        when('/toys/:toyId', {
            template: '<toys-detail></toys-detail>'
        }).
        otherwise('/phones');
    }
]);