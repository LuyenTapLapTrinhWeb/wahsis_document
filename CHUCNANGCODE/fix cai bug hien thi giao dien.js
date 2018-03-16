/*Fix cai bug hien thi giao dien */
if (item.resident_incident_id !== 0) {
    $scope.it.date_time = utility.kieu_ngay_gio($scope.it.date_time, format_date)
    $scope.it.date_time = $filter("date")($scope.it.date_time, "dd-MM-yyyy");
}