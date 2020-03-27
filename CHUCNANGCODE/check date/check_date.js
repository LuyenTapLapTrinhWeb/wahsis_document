$scope.update_date = function () {
    $timeout(function () {
        $scope.it.from_date = $('#from_date').val();
        // $scope.to_date = $('#exchange_rate1').val();
        // alert($scope.it.from_date)
    }, 250);
}
