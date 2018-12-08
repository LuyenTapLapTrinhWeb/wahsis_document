/** FIX CAI BUG KIEM TRA NHAP TRUOC KHI LUU*/
$scope.kiemtra_nhap_truockhi_luu = () => {
    var duoc_di_tiep = false;
    if (!utility.checkValue($scope.roomkey_id)) { return false; }
    else if (!utility.checkValue($scope.model_lock)) { return false; }
    else if (!utility.checkValue($scope.lock_name)) { return false; }
    else if (utility.checkArrayLength($scope.new_array_img)) { return false; }

    /* time */
    else if ($scope.kiemtra_gio($scope.item.from_time) === false) { swal($filter("translate")("Save_Error"), $filter("translate")("from_time_invalid"), "warning"); return false; }
    else if ($scope.kiemtra_gio($scope.item.to_time) === false) { swal($filter("translate")("Save_Error"), $filter("translate")("to_time_invalid"), "warning"); return false; }
    else if ($scope.sosanh_gio($scope.item.from_time, $scope.item.to_time) === -1) { swal($filter("translate")("Save_Error"), $filter("translate")("from_to_time_invalid"), "warning"); return false; }

    else { return true; }
    if (duoc_di_tiep) {
        return true;
    } else {
        return false;
    }
}
swal($filter("translate")("Save_Error"), $filter("translate")("c_red"), "warning");
swal({ title: translation.notice, text: translation.no_data, timer: 2000, type: "error" });
swal({ title: translation.warning, text: translation.save_error, timer: 2000, type: "warning" });