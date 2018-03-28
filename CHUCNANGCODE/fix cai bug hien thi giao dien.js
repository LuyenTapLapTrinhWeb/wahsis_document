/*Fix cai bug hien thi giao dien */
if (item.resident_incident_id !== 0) {
    $scope.it.date_time = utility.kieu_ngay_gio($scope.it.date_time, format_date)
    $scope.it.date_time = $filter("date")($scope.it.date_time, "dd-MM-yyyy");
}

$scope.ngChangeProviderId = () => {
    /* khi addnew default gia tri hoac manual gia tri khi bam ok*/
    if (loai === "addnew") {
        /* kiem tra prover_id === 0  thi effective date de default nguoc lai thi theo gia tri muon thay doi */
        if ($scope.it.provider_id === 0) {
            $scope.it.is_active = 1;/**0 active 1 Unactive */
            /**===================================================================================== */
            $scope.format_date = "dd-MM-yyyy";
            var effective_date = $filter("date")(new Date(new Date().getFullYear(), 0, 1), $scope.format_date);
            var to_date = $filter("date")(new Date(new Date().getFullYear(), 11, 31), $scope.format_date);
            $scope.it.effective_date = effective_date;
            $scope.it.to_date = to_date;
        }
    } else {
        if (utility.checkValue($scope.it.is_active)) {
            $scope.it.is_active = $scope.it.is_active;
        } else {
            $scope.it.is_active = item.is_active;
        }
        /* Kiem tra effective date co su thay doi*/
        if (utility.checkValue($scope.it.effective_date) && utility.checkValue($scope.it.to_date)) {
            /**fix cai bug hien thi ngay thang */
            $scope.it.effective_date = $scope.kieu_ngay_gio($scope.it.effective_date, format_date);
            $scope.it.to_date = $scope.kieu_ngay_gio($scope.it.to_date, format_date);
        }
    }
}