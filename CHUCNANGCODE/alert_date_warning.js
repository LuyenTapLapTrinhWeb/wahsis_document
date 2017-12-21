$scope.ok = () => {
    if (alertDateWarning($scope.it.start_date, $scope.it.end_date)) { 

    }
}
function alertDateWarning(from_date, to_date) { if (from_date !== undefined && from_date !== "" && to_date !== undefined && to_date !== "") { if (UtilityCheckFormatService.check_date_from_to(UtilityCheckFormatService.getdefaultFormat(to_date, $scope.format_date), from_date) === false) { swal($filter("translate")("WARNING"), $filter("translate")("check_from_to"), "warning"); return false; } if (UtilityCheckFormatService.check_date_from_to(UtilityCheckFormatService.getdefaultFormat(from_date, $scope.format_date), to_date) === false) { swal($filter("translate")("WARNING"), $filter("translate")("format_to_date"), "warning"); return false; } if (UtilityCheckFormatService.check_date_from_to(from_date, to_date) === false) { swal($filter("translate")("WARNING"), $filter("translate")("check_from_to"), "warning"); return false; } return true; } else { return true; } }