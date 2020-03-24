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

/* cach kiem tra nhap khi luu nhieu doi tuong */
let request_url_add = {
    table: "apartment_sales_contract",
    cm: "add",
    dt: {
        "company": { "company_id": com_id },
        "apartment_sales_deposit": {
            "apartment_sales_deposit_id": $scope.deposit.apartment_sales_deposit_id,
            "deposit_total": utility.so_tra_ve_binh_thuong($scope.deposit.owner_deposit_total)
        },
        "apartment_sales_contract": {
            apartment_sales_marketing_id: $scope.contract1.apartment_sales_marketing_id,
            article3_acreage: $scope.deposit.acreage, //Van
            article3_amount: utility.so_tra_ve_binh_thuong($scope.deposit.price_per_m2), //Van
            article3_construction_cost: utility.so_tra_ve_binh_thuong($scope.deposit.construction_cost),//Van
            article3_cost_of_land_use_rights: utility.so_tra_ve_binh_thuong($scope.deposit.cost_of_land_use_rights), //Van
            article3_discount_amount: utility.so_tra_ve_binh_thuong($scope.contract1.article3_discount_amount), //Van
        },
        "apartment_sales_commission_list": $scope.commission_list1,
        "apartment_sales_payment_period_list": $scope.payment_timeline1
    }
}
function kiemtranhaptruockhisave_contract(request_url_add) {
    let apartment_sales_deposit = request_url_add.dt.apartment_sales_deposit;
    let apartment_sales_contract = request_url_add.dt.apartment_sales_contract;
    if (!apartment_sales_deposit.apartment_sales_deposit_id) {
        console.error("$scope.deposit.apartment_sales_deposit_id", $scope.deposit.apartment_sales_deposit_id);
        return false;
        /* bo qua kiem tra vi no khong phai c-red hoac phu dinh kiem tra*/
        // } else if (!apartment_sales_contract.input_by_name) {
        //     console.error("$scope.deposit.apartment_sales_deposit_id", $scope.deposit.apartment_sales_deposit_id);
        //     return false;
    } else if ($scope.roomsDetail.room_model === 1 && !apartment_sales_contract.article3_amount) {
        console.error("$scope.deposit.apartment_sales_deposit_id", $scope.deposit.apartment_sales_deposit_id);
        return false;
        /* phu dinh kiem tra */
    } else if (apartment_sales_contract.owner_nationality_id === null || apartment_sales_contract.owner_nationality_id === undefined) {
        console.error("$scope.deposit.owner_nationality_id", $scope.deposit.owner_nationality_id);
        return false;
    } else {
        return true;
    }
}
=== null || === undefined

function kiemtranhaptruockhiluu_apartment_sales_bank_interest(apartment_sales_bank_interest) {
    if (!apartment_sales_bank_interest.room_id) {
        console.error("apartment_sales_bank_interest.room_id", period_object.room_id);
        return false;
    } else if (apartment_sales_contract.apartment_sales_contract_id) {
        console.error("apartment_sales_bank_interest.apartment_sales_contract_id", period_object.apartment_sales_contract_id);
        return false; 
    } else {
        return true;
    }
}
$scope.validate = function (keypad_action) {
    if (!utility.checkValue(keypad_action.device_id)) { swal($filter("translate")("Save_Error"), $filter("translate")("device_id"), "warning"); return false; }
    else if (!utility.checkValue(keypad_action.device_area_id)) { swal($filter("translate")("Save_Error"), $filter("translate")("device_area_id"), "warning"); return false; }
    else if (!utility.checkValue(keypad_action.device_type)) { swal($filter("translate")("Save_Error"), $filter("translate")("device_type"), "warning"); return false; }
    else if (!utility.checkValue(keypad_action.action)) { swal($filter("translate")("Save_Error"), $filter("translate")("action"), "warning"); return false; }
    else { return true; }
}