// declare a module
var greetModule = angular.module('greetModule', []);
greetModule.controller("greetController", greetController)
greetModule.filter("greetFilter", greetFilter)
greetModule.component('myCtrlFilterComponent', {
    templateUrl: 'greet/filter.template.html',
    controller: greetController
})