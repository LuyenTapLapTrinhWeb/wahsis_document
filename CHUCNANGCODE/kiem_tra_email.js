$scope.check_email = function (value) {
    $scope.regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (value !== undefined && value !== null && value !== "") {
        value = value.split(",");

        for (var i = 0; i < value.length; i++) {
            if (!$scope.regex.test(value[i])) {
                return 0;
            } else {
                return 1;
            }
        }
    }
};
if ($scope.check_email($scope.employeesList.email) === 0) {
    utility.notify("Warning", $filter("translate")("email_error"), "warning");
    return;
}