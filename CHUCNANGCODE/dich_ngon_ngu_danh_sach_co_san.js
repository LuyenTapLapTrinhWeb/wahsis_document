/**DICH NGON NGU MOT DANH SACH CO SAN */
$scope.$watch(
    function ($scope) {
        return $scope.abc = $filter('translate')('NOTE_FORMAT1')
    },
    function () {
        var agent_list = angular.copy($scope.agent_list);
        $scope.agent_list = [];
        $scope.agent_list = agent_list;
    }
);