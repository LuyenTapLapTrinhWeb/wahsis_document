var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope) {
    $scope.response = {
        "err": 0,
        "msg": "No error",
        "dt": {
            "apartment_sales_receipt_payment_list": [
                {
                    "payment_period_id": 15,
                    "amount": 5.76E9,
                    "payment_date": "2019-02-14 00:00:00.0",
                    "number_date": -41,
                    "payment_period": 1
                },
                {
                    "payment_period_id": 16,
                    "amount": 8.4E8,
                    "payment_date": "2019-03-16 00:00:00.0",
                    "number_date": -11,
                    "payment_period": 2
                },
                {
                    "payment_period_id": 17,
                    "amount": 8.4E8,
                    "payment_date": "2019-04-15 00:00:00.0",
                    "number_date": 19,
                    "payment_period": 3
                },
                {
                    "payment_period_id": 18,
                    "amount": 8.4E8,
                    "payment_date": "2019-05-15 00:00:00.0",
                    "number_date": 49,
                    "payment_period": 4
                },
                {
                    "payment_period_id": 19,
                    "amount": 3.12E9,
                    "payment_date": "2020-05-14 00:00:00.0",
                    "number_date": 414,
                    "payment_period": 5
                },
                {
                    "payment_period_id": 20,
                    "amount": 6.0E8,
                    "payment_date": "2021-05-14 00:00:00.0",
                    "number_date": 779,
                    "payment_period": 6
                }
            ],
            "interest_list": [
                {
                    "payment_period_id": 15,
                    "interest": 5.76E9,
                    "interest_period": 1
                },
                {
                    "payment_period_id": 16,
                    "interest": 0.0,
                    "interest_period": 2
                },
                {
                    "payment_period_id": 17,
                    "interest": -5.76E9,
                    "interest_period": 3
                },
                {
                    "payment_period_id": 18,
                    "interest": -1.152E10,
                    "interest_period": 4
                },
                {
                    "payment_period_id": 19,
                    "interest": -1.728E10,
                    "interest_period": 5
                },
                {
                    "payment_period_id": 20,
                    "interest": -2.304E10,
                    "interest_period": 6
                }
            ]
        }
    }
    $scope.apartment_sales_receipt_payment_list = $scope.response.dt.apartment_sales_receipt_payment_list;
    $scope.interest_list = $scope.response.dt.interest_list;
    var arr12 = $scope.response.dt.apartment_sales_receipt_payment_list;
    var arr22 = $scope.response.dt.interest_list;
    /* example: let arr1 = [
         { id: "abdc4051", date: "2017-01-24" },
         { id: "abdc4052", date: "2017-01-22" }
     ];
     let arr2 = [
         { id: "abdc4051", name: "ab" },
         { id: "abdc4052", name: "abc" }
     ];
      */
    function ghepMangES6(arr12, arr22) {
        var arr3 = [];
        arr12.forEach(function (itm, i) {
            arr3.push(Object.assign({}, itm, arr22[i]));
        });
        return arr3;
    }
    $scope.children_array = ghepMang($scope.apartment_sales_receipt_payment_list, $scope.interest_list)
    /* =============================== */
    /* =============================== */
    /* =============================== */
    /* =============================== */
    /* GHEP  2 mang theo tung thuoc tinh duoc chon*/
    /* =============================== */
    /* =============================== */
    /* =============================== */
    function combineArray(sms_payment_method_detail_list, apartment_sales_payment_period_list) {
        let apartment_sales_payment_period_list_combine = [];
        for (var i = 0; i < sms_payment_method_detail_list.length; i++) {
            let sms_payment = sms_payment_method_detail_list[i];
            let timeline = apartment_sales_payment_period_list[i];
            let combine = {
                "apartment_sales_payment_period_id": timeline.apartment_sales_payment_period_id ? timeline.apartment_sales_payment_period_id : 0,
                "payment_date": timeline.payment_date ? timeline.payment_date : "",
                "payment_amount": timeline.payment_amount ? timeline.payment_amount : 327023895,
                "room_id": timeline.room_id ? timeline.room_id : 10018,
                "voucher_code": timeline.voucher_code ? timeline.voucher_code : "PC.1.00000996.001",
                "apartment_sales_contract_id": timeline.apartment_sales_contract_id ? timeline.apartment_sales_contract_id : 0,
                "bank_interest_income": timeline.bank_interest_income ? timeline.bank_interest_income : "1",
                "is_paid": timeline.is_paid ? timeline.is_paid : 1,
                "debt_collector_id": timeline.debt_collector_id ? timeline.debt_collector_id : "1",
                "payment_type": timeline.payment_type ? timeline.payment_type : "1",
                "payment_value": timeline.payment_value ? timeline.payment_value : 11,
                "debt_type": timeline.debt_type ? timeline.debt_type : "1",
                "remark": timeline.remark ? timeline.remark : "ac",
                "apartment_sales_deposit_id": timeline.apartment_sales_deposit_id ? timeline.apartment_sales_deposit_id : 593,
                account_holder: sms_payment.account_holder ? sms_payment.account_holder : "H",
                account_number: sms_payment.account_number ? sms_payment.account_number : "1234",
                bank_address: sms_payment.bank_address ? sms_payment.bank_address : "TP.HCM",
                bank_name: sms_payment.bank_name ? sms_payment.bank_name : "BIDV",
                description: sms_payment.description ? sms_payment.description : "",
                payment_cycle: sms_payment.payment_cycle ? sms_payment.payment_cycle : 0,
                payment_cycle_unit: sms_payment.payment_cycle_unit ? sms_payment.payment_cycle_unit : 1,
                payment_method_id: sms_payment.payment_method_id ? sms_payment.payment_method_id : "PTtT7",
                payment_number: sms_payment.payment_number ? sms_payment.payment_number : 1,
                payment_type: sms_payment.payment_type ? sms_payment.payment_type : "by_percent",
                payment_value: sms_payment.payment_value ? sms_payment.payment_value : 20,
                sms_payment_method_detail_id: sms_payment.sms_payment_method_detail_id ? sms_payment.sms_payment_method_detail_id : 10115,
            }
            apartment_sales_payment_period_list_combine.push(combine);
        }
        return apartment_sales_payment_period_list_combine
    }
    function load_payment_period(response_payment_detail, payment_method_id, trang_thai_su_thay_doi_han_thanh_toan, trang_thai_format_payment) {
        if (payment_method_id) {
            let request_url = {
                table: "sms_payment_method",
                cm: "detail",
                dt: JSON.stringify({
                    "sms_payment_method": { "payment_method_id": payment_method_id },
                    company: $scope.companyTemp,
                    languages: $scope.languageTemp,
                })
            }
            UtilityService.getListObjectWithParam(request_url.table, request_url.cm, request_url.dt).then(function (response_payment_sms) {
                if (response_payment_sms.data.err === 0) {
                    if (trang_thai_su_thay_doi_han_thanh_toan.CHANGED_HAN_THANH_TOAN) {
                        let sms_payment_method_detail_list = response_payment_sms.data.dt.sms_payment_method.sms_payment_method_detail_list;
                        let apartment_sales_payment_period_list = response_payment_detail.dt.apartment_sales_payment_period_list;
                        /* ========================================================================== */
                        /* ========================================================================== */
                        /* ========================================================================== */
                        /* ========================================================================== */
                        let apartment_sales_payment_period_list_combine = combineArray(sms_payment_method_detail_list, apartment_sales_payment_period_list)
                        /* ========================================================================== */
                        /* ========================================================================== */
                        /* ========================================================================== */
                        /* ========================================================================== */
                        $scope.apartment_sales_payment_period_list = format_payment_period_list_service($scope.trang_thai_format_payment.change_pttt, apartment_sales_payment_period_list_combine);
                        owner_deposit_total = get_owner_deposit_total($scope.apartment_sales_payment_period_list);
                        $scope.deposit.owner_deposit_total = UtilityCheckFormatService.change_number(owner_deposit_total);
                    } else {
                        $scope.apartment_sales_payment_period_list = format_payment_period_list_service($scope.trang_thai_format_payment.load_detail, response_payment_detail.dt.apartment_sales_payment_period_list);
                    }
                    $scope.no_data = false;
                }
            })
        } else {
            $scope.apartment_sales_payment_period_list = [];
            $scope.no_data = true;
            owner_deposit_total = 0;
            $scope.deposit.owner_deposit_total = UtilityCheckFormatService.change_number(owner_deposit_total);
        }
    }
});