/* bugfix/WPMS-1126-front-end-thanh-toan-truoc-tien-lai
- update utility.js 
- update utility.ghepMang
- update xử lý ghép mảng: 
-- ghép 2 mảng vào một danh sách, 
-- tách hai object trong vòng for, 
-- formated từng object trong vòng for,
-- push từng object trong vòng for vào mảng mới
-- return mảng mới.
 */
$scope.get_api_autocomplete_pms_customer = function (type) {
    $scope.apartment_sales_client_list = [];
    $scope.pms_filter_customer_info_list = [];
    //autocomplete  
    function get_info_by_type_apartment_sales_deposit_id(type) { if (type === "payment_period") { return utility.getNumber($scope.it.apartment_sales_deposit_id) } else { return "" }; }

    $scope.js_apartment_sales_receipt_payment = {
        "apartment_sales_contract_id": "0",
        "apartment_sales_deposit_id": get_info_by_type_apartment_sales_deposit_id(type),
        "to_date": UtilityCheckFormatService.change_date_to_save($scope.it.effective_date),
    }
    var json = JSON.stringify({
        "apartment_sales_receipt_payment": JSON.parse(JSON.stringify($scope.js_apartment_sales_receipt_payment)),
        "company": JSON.parse(JSON.stringify($scope.companyTemp))
    });
    UtilityService.getListObjectWithParam("apartment_sales_receipt_payment", "payment_phase_list", json).then(function (response_interest_receipt) {
        if (response_interest_receipt.data.err === 0) {
            function check_dieu_kien_interest_receipt_list(response_interest_receipt) {
                if (response_interest_receipt.data.dt.apartment_sales_receipt_payment_list.length > 0 && response_interest_receipt.data.dt.interest_list.length > 0) {
                    return true;
                } else {
                    return false;
                }
            }
            function get_interest_receipt_list(response_interest_receipt) {
                $scope.apartment_sales_receipt_payment_list = response_interest_receipt.data.dt.apartment_sales_receipt_payment_list
                $scope.interest_list = response_interest_receipt.data.dt.interest_list;
                let interest_receipt_list = utility.ghepMang($scope.apartment_sales_receipt_payment_list, $scope.interest_list)
                return interest_receipt_list;
            }
            function format_interest_receipt_list(interest_receipt_list) {
                let interest_receipt_list_formated = []
                for (var x in interest_receipt_list) {
                    let period_payment = interest_receipt_list[x];
                    let period_interest = interest_receipt_list[x];
                    let period_payment_new = {
                        "check_row": 0,
                        "payment_period_id": period_payment.payment_period_id,
                        "payment_period": period_payment.payment_period,
                        "tien_dot": " Đợt " + period_payment.payment_period,
                        "dot_thanh_toan": ": " + $scope.kieu_ngay(period_payment.payment_date),
                        "so_tien": ": " + UtilityCheckFormatService.change_currency(period_payment.amount),
                        "so_ngay_tre": ": " + " ",
                    }
                    let period_interest_new = {
                        "check_row": 0,
                        "payment_period_id": period_payment.payment_period_id,
                        "interest_period": period_interest.interest_period,
                        "tien_dot": " Lãi đợt " + period_interest.interest_period,
                        "dot_thanh_toan": ": " + " ",
                        "so_tien": ": " + UtilityCheckFormatService.change_currency(period_interest.interest),
                        "so_ngay_tre": ": " + utility.getNumber(period_interest.number_date),
                    }
                    if (period_payment_new.payment_period) {
                        interest_receipt_list_formated.push(get_period_formated_filter_translate(period_payment_new));
                    }
                    if (period_interest_new.interest_period) {
                        interest_receipt_list_formated.push(get_period_formated_filter_translate(period_interest_new));
                    }
                }
                return interest_receipt_list_formated;
            }
            function get_period_formated_filter_translate(period) {
                let tien_dot = $filter("translate")("DESCRIPTION") + period.tien_dot + "/";
                let dot_thanh_toan = $filter("translate")("PAYMENT_PERIOD") + period.dot_thanh_toan + "/";
                let so_tien = $filter("translate")("APFS_TOTAL_AMOUNT") + period.so_tien + "/";
                let so_ngay_tre = $filter("translate")("term_paid") + period.so_ngay_tre;
                period.payment_period_name = tien_dot + dot_thanh_toan + so_tien + so_ngay_tre;
                period.payment_period_id = period.payment_period_id;
                let period_formated_filter_translate = period;
                return period_formated_filter_translate;
            };
            if (check_dieu_kien_interest_receipt_list(response_interest_receipt)) {
                $scope.interest_receipt_list = get_interest_receipt_list(response_interest_receipt);
                $scope.interest_receipt_list_new = format_interest_receipt_list($scope.interest_receipt_list);
            } else {
                swal({ title: $filter("translate")("ERROR"), text: $filter("translate")("no_data"), timer: 2000, type: "error" });
            }
        }
    })
}