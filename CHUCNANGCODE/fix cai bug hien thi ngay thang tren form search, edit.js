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
// =====================================================================================
$scope.search = function () {
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

/** EDIT*/


/**FIX CAI BUG GIAO DIEN HIEN THI DU LIEU */

$scope.kieu_ngay_gio = function (value) {
    if (
        value !== "" &&
        value !== null &&
        value !== undefined &&
        value.split(" ")[0] !== "1900-01-01"
    ) {
        var v1 = value.split(" ")[0];
        v1 = UtilityCheckFormatService.getdefaultFormat(v1, format_date);
        return v1;
    } else {
        return "";
    }
};

if (item.employees_dependent_id === 0) {


} else {
    if (item.non_tax !== null && item.non_tax !== undefined) {
        $scope.it.non_tax === 1 ? true : false;
    } if (item.is_emergency !== null && item.is_emergency !== undefined) {
        $scope.it.is_emergency === 1 ? true : false;
    }
    $scope.it.start_date = $scope.kieu_ngay_gio($scope.it.start_date);
    $scope.it.end_date = $scope.kieu_ngay_gio($scope.it.start_date);
    $scope.it.date_of_birth = $scope.kieu_ngay_gio($scope.it.date_of_birth);
}