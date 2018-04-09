/**FIX CAI BUG HIEN THI NGAY THANG */
$scope.format_date = "dd-MM-yyyy"
$scope.created_date = $filter("date")(new Date(new Date().getFullYear(), 0, 1), $scope.format_date);
$scope.to_date = $filter("date")(new Date(new Date().getFullYear(), 11, 31), $scope.format_date);
$('#exchange_rate').datepicker({
    startDate: new Date(1800, 0, 1),
    endDate: new Date(2099, 11, 31),
    todayBtn: "linked",
    format: $scope.format_date.toLowerCase(),
    defaultDate: new Date(),
    keyboardNavigation: true,
    forceParse: false,
    calendarWeeks: true,
    autoclose: true
});
$('#exchange_rate1').datepicker({
    startDate: new Date(1800, 0, 1),
    endDate: new Date(2099, 11, 31),
    todayBtn: "linked",
    format: $scope.format_date.toLowerCase(),
    defaultDate: new Date(),
    keyboardNavigation: true,
    forceParse: false,
    calendarWeeks: true,
    autoclose: true
});

$scope.blur_exchange_date = function () {
    $timeout(function () {

        $scope.created_date = $('#exchange_rate').val();
        $scope.to_date = $('#exchange_rate1').val();
    }, 250);
}


// search condition
$scope.search = function () {
    // =====================================================================================
    // "created_date": "",
    if ($scope.created_date !== undefined && $scope.created_date !== "") {
        if (utility.check_date($scope.created_date) === false) {
            swal({ title: "Warning!", text: "Create date don't match format", timer: 2000, type: "warning" });
            return;
        } else {
            $scope.str_search.created_date = utility.change_date_to_save($scope.created_date)
        }
    }
    // "to_date": ""
    if ($scope.to_date !== undefined && $scope.to_date !== "") {
        if (utility.check_date($scope.to_date) === false) {
            swal({ title: "Warning!", text: "To date don't match format", timer: 2000, type: "warning" });
            return;
        } else {
            $scope.str_search.to_date = utility.change_date_to_save($scope.to_date)
        }
    }
    if ($scope.created_date !== undefined && $scope.created_date !== "" && $scope.to_date !== undefined && $scope.to_date !== "") {
        if (utility.check_date_from_to1($scope.created_date, $scope.to_date, "Create date", "To date") === false)
            return;
    }
    // ==================================================================
    if ($scope.str_search.created_date !== undefined && $scope.str_search.to_date !== undefined) {
        $scope.created_date1 = ($scope.str_search.created_date).split("-");
        $scope.to_date1 = ($scope.str_search.to_date).split("-");
        if ($scope.to_date1[0] < $scope.created_date1[0]) {
            swal("Error ", "'To Date' not smaller 'From Date' ", "error");
            return;
        }
        if ($scope.to_date1[0] === $scope.created_date1[0]) {
            if ($scope.to_date1[1] < $scope.created_date1[1]) {
                swal("Error ", "'To Date' not smaller 'From Date' ", "error");
                return;
            }
            if ($scope.to_date1[1] === $scope.created_date1[1]) {
                if ($scope.to_date1[2] < $scope.created_date1[2]) {
                    swal("Error ", "'To Date' not smaller 'From Date' ", "error");
                    return;
                }
            }
        }
    }
};
$scope.kieungay = function (data) {
    if (data === "" || data === null || data === undefined || (data !== "" && data.split(' ')[0] === "1900-01-01")) {
        return ""
    }
    data1 = data.split(' ')[0];
    data2 = data.split(' ')[1];
    return data1.split('-')[2] + "/" + data1.split('-')[1] + "/" + data1.split('-')[0]
};