function apartmentSalesMarketingControllerCrud($filter, item, grid, $http, $timeout, $scope, UtilityCheckFormatService, UtilityService, $uibModalInstance, API_URL, FormatService) {
    $scope.format_date = JSON.parse(getCookieJson("pms-dev-format")).format_date
    var format_date = JSON.parse(getCookieJson("pms-dev-format")).format_date;
    $scope.it = {};
    $scope.languageTemp = {
        language_id: language
    };
    $scope.company = {
        company_id: com_id
    };
    $scope.day = new Date();
    $scope.currentDayTemp = $filter('date')($scope.day, 'yyyy-MM-dd');
    $scope.currentDay = $scope.currentDayTemp.split(' ')[0];
    $scope.maintenance_type_list = [{
        values: "by_percent",
        name: "%"
    }, {
        values: "by_fixed",
        name: "$"
    }];
    first_load_popup(item);

    function get_detail(item) {
        var dataJSON = JSON.stringify({
            company: $scope.company,
            languages: $scope.languageTemp,
            apartment_sales_marketing: {
                "apartment_sales_marketing_id": item.apartment_sales_marketing_id
            },
        })
        UtilityService.getListObjectWithParam("apartment_sales_marketing", 'detail', dataJSON).then(function (response) {
            if (response.data.err === 0) {
                let apartment_sales_marketing = response.data.dt.apartment_sales_marketing;
                kiem_tra_sign_contract_date(apartment_sales_marketing);
                kiem_tra_sign_deposit_date(apartment_sales_marketing);
            }
        })
    }
    function first_load_popup(item) {
        $scope.setting_format_money = "";
        $scope.setting_format_number = "";
        $scope.getSettingFormat = FormatService.getSettingFormat("vi").then(function (response) {
            $scope.core_config_data_list = response.dt.core_config_data_list
            let setting_format_money = FormatService.filter_config_value_setting_format(response.dt.core_config_data_list, "setting/format/money");
            let setting_format = getCookieJson("pms-dev-format");
            $scope.setting_format_money = setting_format_money;
            $scope.setting_format_number = JSON.parse(setting_format).format_number;
            let trang_thai_upate = {
                "EDIT": item.apartment_sales_marketing_id > 0
            }
            if (trang_thai_upate.EDIT) {
                get_detail(item)
            } else {
                get_detail(item)
            }
        }, function (error) {
            throw new Error(error);
        });
    }

    function kiem_tra_sign_contract_date(item) {
        if (item.sign_contract_date) {
            $scope.it.sign_contract_date = !utility.check_date(item.sign_contract_date.split(" ")[0], "yyyy-MM-dd") ? UtilityCheckFormatService.change_date_to_save(item.sign_contract_date.split(" ")[0]) : item.sign_contract_date.split(" ")[0];
        }
    }

    function kiem_tra_sign_deposit_date(item) {
        if (item.sign_deposit_date) {
            $scope.it.sign_deposit_date = !utility.check_date(item.sign_deposit_date.split(" ")[0], "yyyy-MM-dd") ? UtilityCheckFormatService.change_date_to_save(item.sign_deposit_date.split(" ")[0]) : item.sign_deposit_date.split(" ")[0];
        }

    }
    var payment_method_type = {
        contract: 2,
        deposit: 1
    }
    var JSonMarketingPaymentMethod = JSON.stringify({
        sms_payment_method: {
            "payment_method_type": payment_method_type.contract
        },
        company: $scope.company,
        languages: $scope.languageTemp,
    });
    UtilityService.getListObjectWithParam("sms_payment_method", "search", JSonMarketingPaymentMethod).then(function (response) {
        if (response.data.err === 0) {
            {
                $scope.payment_method_list_contract = response.data.dt.sms_payment_method_list;
            }
        }
    })
    var JSonMarketingPaymentMethod2 = JSON.stringify({
        sms_payment_method: {
            "payment_method_type": payment_method_type.deposit
        },
        company: $scope.company,
        languages: $scope.languageTemp,
    });
    UtilityService.getListObjectWithParam("sms_payment_method", "search", JSonMarketingPaymentMethod2).then(function (response) {
        if (response.data.err === 0) {
            {
                $scope.sms_payment_method_list_deposit = response.data.dt.sms_payment_method_list;
            }
        }
    })
    if (item.apartment_sales_marketing_id !== 0) {
        $scope.it = angular.copy(item);
    } else {
        $scope.it.marketing_fee = 0;
        $scope.it.maintenance_fee_type = "by_percent"
        $scope.it.maintenance_fee_value = "2"
    }
    $scope.kiemtradate = function () {
        $timeout(function () {
            $scope.ipFromDate = $('#from_date').val();

        }, 150);
        $timeout(function () {
            $scope.ipToDate = $('#to_date').val();


        }, 150);
    };

    var so_tra_ve_binh_thuong = function (so_chua_tra_ve_binh_thuong) {
        let so_da_huy_dau_phay = Number(String(so_chua_tra_ve_binh_thuong).replace(/[,]/g, ''))
        return so_da_huy_dau_phay;
    }

    $scope.change_commission_staff_total = function (value) {
        let empty = utility.so_tra_ve_binh_thuong(value);
        if (empty < 0) {
            swal("Warning!", "Giá trị phải dương!", "warning");
            $scope.it.commission_staff_total_value = "";
        }

        $scope.it.commission_staff_value = "";
        $scope.it.commission_staff_support_value = "";
    }

    function get_trang_thai_blur(type_of_commission) {
        let trang_thai_blur = {
            "commission_staff_total_value": type_of_commission.indexOf("commission_staff_total_value") === 0 ? true : false,
            "commission_staff_value": type_of_commission.indexOf("commission_staff_value") === 0 ? true : false,
            "commission_staff_support_value": type_of_commission.indexOf("commission_staff_support_value") === 0 ? true : false,
            "commission_agent_total_value": type_of_commission.indexOf("commission_agent_total_value") === 0 ? true : false,
            "commission_agent_value": type_of_commission.indexOf("commission_agent_value") === 0 ? true : false,
            "commission_agent_support_value": type_of_commission.indexOf("commission_agent_support_value") === 0 ? true : false,
        }
        if (trang_thai_blur.commission_staff_total_value) { return 0; }
        else if (trang_thai_blur.commission_staff_value) { return 1; }
        else if (trang_thai_blur.commission_staff_support_value) { return 2; }
        else if (trang_thai_blur.commission_agent_total_value) { return 3; }
        else if (trang_thai_blur.commission_agent_value) { return 4; }
        else if (trang_thai_blur.commission_agent_support_value) { return 5; }
    }
    $scope.ngBlurDefaultZero = function (type_of_commission) {
        switch (get_trang_thai_blur(type_of_commission)) {
            case 0: { $scope.it.commission_staff_total_value = $scope.it.commission_staff_total_value ? Number($scope.it.commission_staff_total_value) : 0; break; }
            case 1: { $scope.it.commission_staff_value = $scope.it.commission_staff_value ? Number($scope.it.commission_staff_value) : 0; break; }
            case 2: { $scope.it.commission_staff_support_value = $scope.it.commission_staff_support_value ? Number($scope.it.commission_staff_support_value) : 0; break; }
            case 3: { $scope.it.commission_agent_total_value = $scope.it.commission_agent_total_value ? Number($scope.it.commission_agent_total_value) : 0; break; }
            case 4: { $scope.it.commission_agent_value = $scope.it.commission_agent_value ? Number($scope.it.commission_agent_value) : 0; break; }
            case 5: { $scope.it.commission_agent_support_value = $scope.it.commission_agent_support_value ? Number($scope.it.commission_agent_support_value) : 0; break; }
            default:
                $scope.it.commission_staff_total_value = 0;
                $scope.it.commission_staff_value = 0;
                $scope.it.commission_staff_support_value = 0;
                $scope.it.commission_staff_total_value = 0;
                $scope.it.commission_agent_total_value = 0;
                $scope.it.commission_agent_value = 0;
                $scope.it.commission_agent_support_value = 0;
        }
    }

    $scope.change_commission_staff_value = function (commission_staff_total_value) {
        let commission_staff = Number($scope.it.commission_staff_value);
        commission_staff_total_value = Number(commission_staff_total_value);
        if (commission_staff < commission_staff_total_value && commission_staff >= 0) {
            $scope.it.commission_staff_support_value = commission_staff_total_value - commission_staff;
        } else {
            swal("Warning!", "Giá trị hoa hồng của nv bán trực tiếp phải nhỏ hơn giá trị nội bộ bán hàng và lớn hơn 0!", "warning");
            $scope.it.commission_staff_value = "";
            $scope.it.commission_staff_support_value = "";
        }
    }
    $scope.change_commission_staff_support_value = function (commission_staff_total_value) {
        let commission_staff_support_value = Number($scope.it.commission_staff_support_value);
        commission_staff_total_value = Number(commission_staff_total_value);
        if (commission_staff_support_value < commission_staff_total_value && commission_staff_support_value >= 0) {
            $scope.it.commission_staff_value = commission_staff_total_value - commission_staff_support_value;
        } else {
            swal("Warning!", "Giá trị hoa hồng của nv bán trực tiếp phải nhỏ hơn giá trị nội bộ bán hàng và lớn hơn 0!", "warning");
            $scope.it.commission_staff_value = "";
            $scope.it.commission_staff_support_value = "";
        }
    }
    function check_dieu_kien_gia_tri_hoa_hong_san(commission_agent, commission_agent_total_value) {
        if ((commission_agent < commission_agent_total_value) && (commission_agent >= 0)) {
            $scope.it.commission_agent_support_value = utility.toFixed(commission_agent_total_value - commission_agent, $scope.setting_format_number);
        } else {
            swal("Warning!", "Giá trị hoa hồng của sàn phải nhỏ hơn giá trị nội bộ bán hàng và lớn hơn 0!", "warning");
            $scope.it.commission_agent_support_value = "";
            $scope.it.commission_agent_value = "";
        }
    }

    function check_dieu_kien_gia_tri_hoa_hong_cua_bo_phan_ho_tro(commission_agent_support, commission_agent_support_value) {
        if (commission_agent_support < commission_agent_support_value && commission_agent_support >= 0) {
            $scope.it.commission_agent_value = utility.toFixed(commission_agent_support_value - commission_agent_support, $scope.setting_format_number);
        } else {
            swal("Warning!", "Giá trị hoa hồng của bộ phận hỗ trợ phải nhỏ hơn giá trị nội bộ bán hàng và lớn hơn 0!", "warning");
            $scope.it.commission_agent_support_value = "";
            $scope.it.commission_agent_value = "";
        }
    }
    $scope.change_commission_agent_total = function (commission_agent_total_value) {
        if (Number(commission_agent_total_value) < 0) {
            swal("Warning!", "Giá trị phải dương!", "warning");
            $scope.it.commission_agent_total_value = "";
        }
        $scope.it.commission_agent_support_value = "";
        $scope.it.commission_agent_value = "";
    }
    $scope.change_commission_agent_value = function (commission_agent_total_value) {
        commission_agent_total_value = Number(commission_agent_total_value);
        let commission_agent = Number($scope.it.commission_agent_value);
        let trang_thai_nhap = {
            "TU_0_DEN_1": commission_agent <= 1 && commission_agent >= 0,
            "LON_HON_1": commission_agent > 1
        }
        if (trang_thai_nhap.TU_0_DEN_1) {
            check_dieu_kien_gia_tri_hoa_hong_san(commission_agent, commission_agent_total_value)
        } else if (trang_thai_nhap.LON_HON_1) {
            check_dieu_kien_gia_tri_hoa_hong_san(commission_agent, commission_agent_total_value)
        }
    }
    $scope.change_commission_agent_support_value = function (commission_agent_support_value) {
        commission_agent_support_value = Number(commission_agent_support_value);
        let commission_agent_support = Number($scope.it.commission_agent_support_value);
        let trang_thai_nhap = {
            "TU_0_DEN_1": commission_agent_support <= 1 && commission_agent_support >= 0,
            "LON_HON_1": commission_agent_support > 1
        }
        if (trang_thai_nhap.TU_0_DEN_1) {
            check_dieu_kien_gia_tri_hoa_hong_cua_bo_phan_ho_tro(commission_agent_support, commission_agent_support_value)
        } else if (trang_thai_nhap.LON_HON_1) {
            check_dieu_kien_gia_tri_hoa_hong_cua_bo_phan_ho_tro(commission_agent_support, commission_agent_support_value)
        }
    }

    $scope.change_maintenance_fee_value = function () {
        $scope.it.maintenance_fee_value = UtilityCheckFormatService.change_number($scope.it.maintenance_fee_value)
    }
    $scope.changeCost = function (fee) {

        $scope.it.expected_cost = UtilityCheckFormatService.change_number(fee);
    }
    $scope.changemarketingfee = function (fee) {

        $scope.it.marketing_fee = UtilityCheckFormatService.change_number(fee);
    }
    $scope.changeTotalAmount = function (fee) {

        $scope.it.total_amount = UtilityCheckFormatService.change_number(fee);
    }
    $scope.changeQuantityUnit = function (fee) {

        $scope.it.quantity_unit = UtilityCheckFormatService.change_number(fee);
    }
    let apartment_sales_marketing = {
        checkUpdateObject: function (request_url_dt) {
            let it = request_url_dt;
            return {
                apartment_sales_marketing_id: it.apartment_sales_marketing_id ? (utility.isNumber(it.apartment_sales_marketing_id) ? it.apartment_sales_marketing_id : Number(it.apartment_sales_marketing_id)) : 0,
                subject: it.subject ? it.subject : "",
                content: it.content ? it.content : "",
                from_date: it.from_date ? it.from_date : "",
                to_date: it.to_date ? it.to_date : "",
                created_by_id: it.created_by_id ? it.created_by_id : 0,
                created_by_name: it.created_by_name ? it.created_by_name : "",
                marketing_fee: it.marketing_fee ? (utility.isNumber(it.marketing_fee) ? it.marketing_fee : Number(it.marketing_fee)) : 0,
                expected_cost: it.expected_cost ? (utility.isNumber(it.marketing_fee) ? it.marketing_fee : Number(it.marketing_fee)) : 0,
                maintenance_fee_type: it.maintenance_fee_type ? it.maintenance_fee_type : "%",
                maintenance_fee_value: it.maintenance_fee_value ? (utility.isNumber(it.maintenance_fee_value) ? it.maintenance_fee_value : Number(it.maintenance_fee_value)) : 0,
                remark: it.remark ? it.remark : "",
                quantity_unit: it.quantity_unit ? (utility.isNumber(it.quantity_unit) ? it.quantity_unit : Number(it.quantity_unit)) : 0,
                total_amount: it.total_amount ? (utility.isNumber(it.total_amount) ? it.total_amount : Number(it.total_amount)) : 0,
                payment_method_deposit: it.payment_method_deposit ? it.payment_method_deposit : "",
                payment_method_contract: it.payment_method_contract ? it.payment_method_contract : "",
                // commission_method:it.commission_method?it.commission_method:"",
                commission_staff_total_value: it.commission_staff_total_value ? (utility.isNumber(it.commission_staff_total_value) ? it.commission_staff_total_value : Number(it.commission_staff_total_value)) : 0,
                commission_staff_value: it.commission_staff_value ? (utility.isNumber(it.commission_staff_value) ? it.commission_staff_value : Number(it.commission_staff_value)) : 0,
                commission_staff_support_value: it.commission_staff_support_value ? (utility.isNumber(it.commission_staff_support_value) ? it.commission_staff_support_value : Number(it.commission_staff_support_value)) : 0,
                commission_agent_total_value: it.commission_agent_total_value ? (utility.isNumber(it.commission_agent_total_value) ? it.commission_agent_total_value : Number(it.commission_agent_total_value)) : 0,
                commission_agent_value: it.commission_agent_value ? (utility.isNumber(it.commission_agent_value) ? it.commission_agent_value : Number(it.commission_agent_value)) : 0,
                commission_agent_support_value: it.commission_agent_support_value ? (utility.isNumber(it.commission_agent_support_value) ? it.commission_agent_support_value : Number(it.commission_agent_support_value)) : 0,
                is_event: it.is_event ? (utility.isNumber(it.is_event) ? it.is_event : Number(it.is_event)) : 0,
                booking_code_prefix: it.booking_code_prefix ? it.booking_code_prefix : "",
                sign_deposit_date: it.sign_deposit_date ? it.sign_deposit_date : "",
                sign_contract_date: it.sign_contract_date ? it.sign_contract_date : "",
            }
        },
        checkAddObject: function (request_url_dt) {
            let it = request_url_dt;
            return {
                apartment_sales_marketing_id: it.apartment_sales_marketing_id ? (utility.isNumber(it.apartment_sales_marketing_id) ? it.apartment_sales_marketing_id : Number(it.apartment_sales_marketing_id)) : 0,
                subject: it.subject ? it.subject : "",
                content: it.content ? it.content : "",
                from_date: it.from_date ? it.from_date : "",
                to_date: it.to_date ? it.to_date : "",
                created_by_id: it.created_by_id ? it.created_by_id : 0,
                created_by_name: it.created_by_name ? it.created_by_name : "",
                marketing_fee: it.marketing_fee ? (utility.isNumber(it.marketing_fee) ? it.marketing_fee : Number(it.marketing_fee)) : 0,
                expected_cost: it.expected_cost ? (utility.isNumber(it.marketing_fee) ? it.marketing_fee : Number(it.marketing_fee)) : 0,
                maintenance_fee_type: it.maintenance_fee_type ? it.maintenance_fee_type : "%",
                maintenance_fee_value: it.maintenance_fee_value ? (utility.isNumber(it.maintenance_fee_value) ? it.maintenance_fee_value : Number(it.maintenance_fee_value)) : 0,
                remark: it.remark ? it.remark : "",
                quantity_unit: it.quantity_unit ? (utility.isNumber(it.quantity_unit) ? it.quantity_unit : Number(it.quantity_unit)) : 0,
                total_amount: it.total_amount ? (utility.isNumber(it.total_amount) ? it.total_amount : Number(it.total_amount)) : 0,
                payment_method_deposit: it.payment_method_deposit ? it.payment_method_deposit : "",
                payment_method_contract: it.payment_method_contract ? it.payment_method_contract : "",
                // commission_method:it.commission_method?it.commission_method:"",
                commission_staff_total_value: it.commission_staff_total_value ? (utility.isNumber(it.commission_staff_total_value) ? it.commission_staff_total_value : Number(it.commission_staff_total_value)) : 0,
                commission_staff_value: it.commission_staff_value ? (utility.isNumber(it.commission_staff_value) ? it.commission_staff_value : Number(it.commission_staff_value)) : 0,
                commission_staff_support_value: it.commission_staff_support_value ? (utility.isNumber(it.commission_staff_support_value) ? it.commission_staff_support_value : Number(it.commission_staff_support_value)) : 0,
                commission_agent_total_value: it.commission_agent_total_value ? (utility.isNumber(it.commission_agent_total_value) ? it.commission_agent_total_value : Number(it.commission_agent_total_value)) : 0,
                commission_agent_value: it.commission_agent_value ? (utility.isNumber(it.commission_agent_value) ? it.commission_agent_value : Number(it.commission_agent_value)) : 0,
                commission_agent_support_value: it.commission_agent_support_value ? (utility.isNumber(it.commission_agent_support_value) ? it.commission_agent_support_value : Number(it.commission_agent_support_value)) : 0,
                is_event: it.is_event ? (utility.isNumber(it.is_event) ? it.is_event : Number(it.is_event)) : 0,
                booking_code_prefix: it.booking_code_prefix ? it.booking_code_prefix : "",
                sign_deposit_date: it.sign_deposit_date ? it.sign_deposit_date : "",
                sign_contract_date: it.sign_contract_date ? it.sign_contract_date : "",
            }
        },
        addObject: function (combinationObject) {
            try {
                $scope.object = combinationObject();
                if (utility.checkValueMediumLevel($scope.object.apartment_sales_marketing_id)) {
                    $scope.object = apartment_sales_marketing.checkAddObject($scope.object)
                    let request_url = {
                        table: "apartment_sales_marketing",
                        cm: "add",
                        dt: JSON.stringify({
                            apartment_sales_marketing: $scope.object,
                            company: {
                                company_id: com_id
                            }
                        })
                    }
                    UtilityService.addObject(request_url.table, request_url.dt).then(function (response) {
                        if (response.data.err === 0) {
                            $uibModalInstance.close();
                            swal({ title: $filter("translate")("SUCCESS"), text: $filter("translate")("ADD_SUCCESS"), timer: 2000, type: "success" });
                        } else {
                            swal({ title: $filter("translate")("ERROR"), text: $filter("translate")("ADD_ERROR"), timer: 2000, type: "error" });
                        }
                    });
                } else {
                    return;
                }
            } catch (error) {
                console.error(error.message)
                swal($filter("translate")("error"), error.message, "error")
            }
        },
        updateObject: function (combinationObject) {
            try {
                $scope.object = combinationObject();
                if (utility.checkValueMediumLevel($scope.object.apartment_sales_marketing_id)) {
                    $scope.object = apartment_sales_marketing.checkAddObject($scope.object)
                    let request_url = {
                        table: "apartment_sales_marketing",
                        cm: "update",
                        dt: JSON.stringify({
                            apartment_sales_marketing: $scope.object,
                            company: {
                                company_id: com_id
                            },
                            languages: $scope.languageTemp
                        })
                    }
                    UtilityService.updateObject(request_url.table, request_url.dt).then(function (response) {
                        if (response.data.err === 0) {
                            $uibModalInstance.close();
                            swal({ title: $filter("translate")("SUCCESS"), text: $filter("translate")("UPDATE_SUCCESS"), timer: 2000, type: "success" });
                        } else {
                            swal({ title: $filter("translate")("ERROR"), text: $filter("translate")("UPDATE_ERROR"), timer: 2000, type: "error" });
                        }
                    });
                } else {
                    return;
                }
            } catch (error) {
                console.error(error.message)
                swal($filter("translate")("error"), error.message, "error")
            }
        },
        format_object_crud: function () {
            $scope.ipFromDate = $('#from_date').val();
            $scope.ipToDate = $('#to_date').val();
            if ($scope.it.maintenance_fee_type === 'by_percent') {
                if (parseInt(UtilityCheckFormatService.change_number_to_save($scope.it.maintenance_fee_value)) > 100) {
                    swal("Warning!", "Value must be smaller than 100", "warning");
                    return;
                }
            }
            if ($scope.ipFromDate !== undefined && $scope.ipFromDate !== "" && $scope.ipFromDate !== null) {
                $scope.ipFromDateTemp = $scope.ipFromDate.split("-")
                if (UtilityCheckFormatService.check_date($scope.ipFromDateTemp) === false) {
                    swal("Warning!", $filter("translate")("format_from_date"), "warning");
                    return;
                } else {
                    $scope.from_date = UtilityCheckFormatService.change_date_to_save($scope.ipFromDate, format_date)
                    // console.log($scope.from_date)
                }
            }
            if ($scope.ipToDate !== undefined && $scope.ipToDate !== "" && $scope.ipToDate !== null) {
                $scope.ipToDateTemp = $scope.ipToDate.split("-")
                if (UtilityCheckFormatService.check_date($scope.ipToDateTemp) === false) {
                    swal("Warning!", $filter("translate")("format_to_date"), "warning");
                    return;
                } else {
                    $scope.to_date = UtilityCheckFormatService.change_date_to_save($scope.ipToDate, format_date)
                }
            }
            if ($scope.ipFromDate !== undefined && $scope.ipToDate !== undefined) {
                if (UtilityCheckFormatService.check_date_from_to($scope.ipFromDate, $scope.ipToDate, format_date) === false) {
                    swal("Warning!", $filter("translate")("from_to_date"), "warning");
                    return;
                }
            }
            $scope.expectedCostTemp = UtilityCheckFormatService.change_number_to_save($scope.it.expected_cost);
            $scope.marketingFeeTemp = UtilityCheckFormatService.change_number_to_save($scope.it.marketing_fee);
        },
        handlerFailedMessage: function (variable_string_error, value_undefined_error) {
            console.error($filter("translate")("Save_Error") + " " + $filter("translate")(variable_string_error) + ": ", value_undefined_error)
            swal({ title: $filter("translate")("ERROR"), text: $filter("translate")("c_red") + " " + $filter("translate")(variable_string_error) + ": " + value_undefined_error, timer: 2000, type: "error" });
            return { apartment_sales_marketing_id: undefined };
        },
        combinationObject: function () {
            let handlerFailedMessage = apartment_sales_marketing.handlerFailedMessage;
            if (!$scope.it.subject) { return handlerFailedMessage("MARKETING_NAME_REPORT", $scope.it.subject) }
            else if (!$scope.it.from_date) { return handlerFailedMessage("FROM_DATE1", $scope.it.from_date) }
            else if (!$scope.it.to_date) { return handlerFailedMessage("TO_DATE1", $scope.it.to_date) }
            else if (!$scope.it.maintenance_fee_type) { return handlerFailedMessage("MAINTENANCE_FEE", $scope.it.maintenance_fee_type) }
            else if (!$scope.it.maintenance_fee_value) { return handlerFailedMessage("VALUE", $scope.it.maintenance_fee_value) }
            else if (!$scope.it.payment_method_deposit) { return handlerFailedMessage("PAYMENT_METHOD_TYPEL1", $scope.it.payment_method_deposit) }
            else if (!$scope.it.payment_method_contract) { return handlerFailedMessage("PAYMENT_METHOD_TYPEL2", $scope.it.payment_method_contract) }
            else if (!$scope.it.commission_staff_total_value) { return handlerFailedMessage("COMMISSION_POLICY", $scope.it.commission_staff_total_value) }
            else if (!$scope.it.commission_staff_value) { return handlerFailedMessage("COMMISSION_POLICY", $scope.it.commission_staff_value) }
            else if (!$scope.it.commission_staff_support_value) { return handlerFailedMessage("COMMISSION_POLICY", $scope.it.commission_staff_support_value) }
            else if (!$scope.it.commission_agent_total_value) { return handlerFailedMessage("COMMISSION_POLICY", $scope.it.commission_agent_total_value) }
            else if (!$scope.it.commission_agent_value) { return handlerFailedMessage("COMMISSION_POLICY", $scope.it.commission_agent_value) }
            else if (!$scope.it.commission_agent_support_value) { return handlerFailedMessage("COMMISSION_POLICY", $scope.it.commission_agent_support_value) }
            else {
                console.log($filter("translate")("Save_Success"));
                return {
                    apartment_sales_marketing_id: $scope.it.apartment_sales_marketing_id,
                    subject: $scope.it.subject,
                    content: $scope.it.content,
                    from_date: $scope.from_date,
                    to_date: $scope.to_date,
                    created_by_id: u_id,
                    created_by_name: u_name,
                    marketing_fee: $scope.marketingFeeTemp,
                    expected_cost: $scope.expectedCostTemp,
                    maintenance_fee_type: $scope.it.maintenance_fee_type,
                    maintenance_fee_value: parseInt(UtilityCheckFormatService.change_number_to_save($scope.it.maintenance_fee_value)),
                    remark: $scope.it.remark,
                    quantity_unit: parseInt(UtilityCheckFormatService.change_number_to_save($scope.it.quantity_unit)),
                    total_amount: parseInt(UtilityCheckFormatService.change_number_to_save($scope.it.total_amount)),
                    payment_method_deposit: $scope.it.payment_method_deposit,
                    payment_method_contract: $scope.it.payment_method_contract,
                    // commission_method:$scope.it.commission_method,
                    commission_staff_total_value: $scope.it.commission_staff_total_value,
                    commission_staff_value: $scope.it.commission_staff_value,
                    commission_staff_support_value: $scope.it.commission_staff_support_value,
                    commission_agent_total_value: $scope.it.commission_agent_total_value,
                    commission_agent_value: $scope.it.commission_agent_value,
                    commission_agent_support_value: $scope.it.commission_agent_support_value,
                    is_event: $scope.it.is_event,
                    booking_code_prefix: $scope.it.booking_code_prefix,
                    sign_deposit_date: !utility.check_date($scope.it.sign_deposit_date, "yyyy-MM-dd") ? UtilityCheckFormatService.change_date_to_save($scope.it.sign_deposit_date) : $scope.it.sign_deposit_date,
                    sign_contract_date: !utility.check_date($scope.it.sign_contract_date, "yyyy-MM-dd") ? UtilityCheckFormatService.change_date_to_save($scope.it.sign_contract_date) : $scope.it.sign_contract_date,
                }
            }
        }
    }
    $scope.ok = function () {
        apartment_sales_marketing.format_object_crud();
        let status_object_crud = {
            "ADD": item.apartment_sales_marketing_id === 0 ? true : false,
            "UPDATE": item.apartment_sales_marketing_id !== 0 ? true : false,
        }
        let combinationObject = apartment_sales_marketing.combinationObject;
        if (status_object_crud.ADD) {
            apartment_sales_marketing.addObject(combinationObject);
        } else {
            apartment_sales_marketing.updateObject(combinationObject);
        }
    }
    $scope.close = function () {
        $uibModalInstance.close();
    };
}