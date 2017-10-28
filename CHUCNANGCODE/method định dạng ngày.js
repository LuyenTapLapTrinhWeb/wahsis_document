hàm định dạng ngày form edit
if (item.resident_incident_id !== 0){
	$scope.it.date_time = $filter('date')(new Date(item.date_time), 'dd-MM-yyyy');
}

hàm định dạng ngày trên form search
$scope.kieu_ngay_gio = function (value) {
            if (value !== "" && value !== null && value !== undefined && value.split(" ")[0] !== "1900-01-01") {
                var v1 = value.split(" ")[0];
                v1 = UtilityCheckFormatService.getdefaultFormat(v1, format_date);
                return v1
            } else {
                return ""
            }
        }
<td>{{kieu_ngay_gio(date_time)}}</td>

hàm search ngày từ ngày đến

timeout
id="bill"