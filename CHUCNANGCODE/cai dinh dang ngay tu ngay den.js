// FIX hiển thị từ ngày đến ngày trong decentralization trước  $scope.$watch  trên form search
$("#from_date").datepicker({
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
$("#to_date").datepicker({
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
var date = new Date();
//ngay dau thang truoc
var fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
//ngay dau thang sau
var toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
console.log(fromDate, toDate);
$scope.from_date = UtilityCheckFormatService.change_date_to_save($filter("date")(fromDate, "yyyy-MM-dd"));
$scope.to_date = UtilityCheckFormatService.change_date_to_save($filter("date")(toDate, "yyyy-MM-dd"));
console.log($scope.from_date, $scope.to_date);

// hàm định dạng ngày trên form search list
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

/*<td class="text-center">{{kieu_ngay_gio(date_time)}}</td> */

// hàm định dạng ngày form edit
if (item.resident_incident_id !== 0) {
  $scope.it.date_time = $filter("date")(new Date(item.date_time), "dd-MM-yyyy");
}

let effective_date = utility.kieu_ngay_gio(utility.getString(contract_detail.effective_date), "yyyy-MM-dd");
apartment_sales_contract.effective_date = UtilityCheckFormatService.kieu_ngay_gio(effective_date);

/* ngay co dau gach cheo trong hop dong */
function ngay_tra_ve_binh_thuong(identify_created) {
  let ngay_chua_tra_ve_binh_thuong = identify_created;
  let ngay_tra_ve_binh_thuong = identify_created;
  if (ngay_chua_tra_ve_binh_thuong) {
    ngay_chua_tra_ve_binh_thuong = ngay_chua_tra_ve_binh_thuong.split("/");
    ngay_tra_ve_binh_thuong = ngay_chua_tra_ve_binh_thuong.join("-");
    ngay_tra_ve_binh_thuong = utility.kieu_ngay_gio(utility.getString(ngay_tra_ve_binh_thuong), "yyyy-MM-dd");
    return ngay_tra_ve_binh_thuong
  }
}