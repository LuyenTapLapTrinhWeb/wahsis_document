/** FIX CAI BUG KIEM TRA NHAP TRUOC KHI LUU*/
$scope.kiemtra_nhap_truockhi_luu = () => {
    var duoc_di_tiep = false;
    if (!utility.checkValue($scope.roomkey_id)) { swal($filter("translate")("Save_Error"), $filter("translate")("c_red"), "warning"); duoc_di_tiep = false; }
    else if (!utility.checkValue($scope.model_lock)) { swal($filter("translate")("Save_Error"), $filter("translate")("c_red"), "warning"); duoc_di_tiep = false; }
    else if (!utility.checkValue($scope.lock_name)) { swal($filter("translate")("Save_Error"), $filter("translate")("c_red"), "warning"); duoc_di_tiep = false; }
    else if (utility.checkArrayLength($scope.new_array_img)) { swal($filter("translate")("Save_Error"), $filter("translate")("c_red"), "warning"); duoc_di_tiep = false; }
    else { duoc_di_tiep = true; }
    if (duoc_di_tiep) {
        return true;
    } else {
        return false;
    }
}

swal({ title: translation.notice, text: translation.no_data, timer: 2000, type: "error" });
swal({ title: translation.warning, text: translation.save_error, timer: 2000, type: "warning" });