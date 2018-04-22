app.directive("directive_name", function(){
    return {
        restrict: 'E',
        transclude: true,
        template: function(elem, attr){
           return '<div><h2>{{'+attr.scope+'}}</h2></div>';
        },
        replace: true
    };
})
/* Controller */

$scope.building = function(data){
    var chart = angular.element(document.createElement('directive_name'));
    chart.attr('scope', data);
    $compile(chart)($scope);
    angular.element(document.getElementById('wrapper')).append(chart);
  }