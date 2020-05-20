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

function _false(error_object_name) {
    swal($filter("translate")("Save_Error"), $filter("translate")(error_object_name), "warning"); return false;
}
$scope.validate_dt_owners_update = function (owner) {
    /* Gioi thieu */
    /* loai kiem tra so luong tieu chi dua theo field required bat buoc cua cau detail */
    /* ========================================================================================= */

    var typeofOnwerType = typeof (owner.owner_type);
    var owner_type = typeofOnwerType === "string" ? Number(owner.owner_type) : owner.owner_type;

    if (!utility.checkValueMediumLevel(owner)) { return _false('owner') }
    else if (!utility.checkValueMediumLevel(owner.owner_id)) { return _false('owner_id') }
    else if (!utility.isNull(owner.owner_name)) { return _false('owner_name') }
    else if (!utility.isNull(owner.phone)) { return _false('phone') }
    else if (!utility.checkValueMediumLevel(owner.address)) { return _false('address') }
    else if (!utility.checkValueMediumLevel(owner.address_contact)) { return _false('address_contact') }
    else if (!utility.checkValueMediumLevel(owner.email)) { return _false('email') }
    else if (!utility.checkValueMediumLevel(owner.birthday)) { return _false('birthday') }
    else if (!utility.isNull(owner.country_id)) { return _false('country_id') }
    else if (!utility.checkValueMediumLevel(owner.city)) { return _false('city') }
    else if (!utility.checkValueMediumLevel(owner.sex)) { return _false('sex') }
    else if (!utility.checkValueMediumLevel(owner.status)) { return _false('status') }
    else if (!utility.checkValueMediumLevel(owner.created_date)) { return _false('created_date') }
    else if (!utility.checkValueMediumLevel(owner.code)) { return _false('code') }
    else if (!utility.checkValueMediumLevel(owner.identity_type)) { return _false('identity_type') }
    else if (!utility.checkValueMediumLevel(owner.identity_number)) { return _false('identity_number') }
    else if (!utility.checkValueMediumLevel(owner.identity_image_path)) { return _false('identity_image_path') }
    else if (!utility.checkValueMediumLevel(owner.identify_created)) { return _false('identify_created') }
    else if (!utility.checkValueMediumLevel(owner.identify_place)) { return _false('identify_place') }
    else if (!utility.checkValueMediumLevel(owner.is_default)) { return _false('is_default') }
    /* buoc 1 */
    /* field required bat buoc thi check theo 4 tieu chi */
    /* ========================================================================================= */
    else if (owner_type === 2 ? !utility.isNull(owner.company_name) : !utility.checkValueMediumLevel(owner.company_name)) { return _false('company_name') }
    else if (owner_type === 2 ? !utility.isNull(owner.company_address) : !utility.checkValueMediumLevel(owner.company_address)) { return _false('company_address') }
    else if (owner_type === 2 ? !utility.isNull(owner.company_phone) : !utility.checkValueMediumLevel(owner.company_phone)) { return _false('company_phone') }
    /* buoc 2 */
    /* field required khong bat buoc thi check theo 3 tieu chi */
    /* ========================================================================================= */
    else if (!utility.checkValueMediumLevel(owner.company_vat_address)) { return _false('company_vat_address') }
    else if (!utility.checkValueMediumLevel(owner.company_zip_code)) { return _false('company_zip_code') }
    else if (!utility.checkValueMediumLevel(owner.company_tax_code)) { return _false('company_tax_code') }
    else if (!utility.checkValueMediumLevel(owner.company_area_code)) { return _false('company_area_code') }
    else if (!utility.checkValueMediumLevel(owner.company_cell_phone)) { return _false('company_cell_phone') }
    else if (!utility.checkValueMediumLevel(owner.company_fax)) { return _false('company_fax') }
    else if (!utility.checkValueMediumLevel(owner.company_website)) { return _false('company_website') }
    else if (!utility.checkValueMediumLevel(owner.owner_type)) { return _false('owner_type') }
    else { return true; }
};