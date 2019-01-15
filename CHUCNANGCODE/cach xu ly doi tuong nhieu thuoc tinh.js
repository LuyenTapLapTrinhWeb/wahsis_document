
/* ================================================================================================== */
/* /* open popup controller.js */
/* ================================================================================================== */
/* /* khai bao thuoc tinh */
/* ================================================================================================== */
$scope.deposit = {
    "apartment_sales_deposit_id": 452,
    "room_id": 10004,
    "room_type_id": 0,
    "owner_deposit_id": 233,
    "owner_deposit_name": "Quỳnh",
    "owner_deposit_last_name": "Trương",
    "owner_deposit_phone": 846246233201,
    "owner_deposit_email": "quynh.truong@wahsis.com",
    "owner_area_code": 84,
    "owner_nationality_id": "VN",
    "identity_type": 0,
    "identity_number": 123,
    "identity_image_path": "[]",
    "identify_created": "2019-01-09 00:00:00.0",
    "identify_expired": "2019-01-09 00:00:00.0",
    "identify_place": "hcm",
    "address_contact": "quan 4",
    "tax_code": "",
    "receiver_name": 4,
    "position_name": "",
    "deposit_date": "1900-01-01 00:00:00.0",
    "deposit_date_to": "1900-01-01 00:00:00.0",
    "currency_code": "VND",
    "deposit_amount": 2175800000,
    "deposit_total": 2175800000,
    "deposit_total_text": "Hai tỷ một trăm bảy mươi lăm triệu tám trăm nghìn",
    "exchange_rate": 1,
    "owner_currency": "VND",
    "owner_deposit_amount": 2175800000,
    "owner_deposit_total": 2175800000,
    "created_by_id": 2,
    "created_by_name": "Administrator",
    "created_date": "2019-01-09 06:12:11.0",
    "status": 1,
    "apartment_sales_contract_id": 0,
    "content": "ab",
    "remark": "ab",
    "payment_type": "",
    "bank_id": "",
    "bank_name": "",
    "reason_cancel": "",
    "agent_id": 1,
    "apartment_sales_marketing_id": 1,
    "apartment_sales_marketing_name": "",
    "approve_by_id": 0,
    "image_path": "",
    "reservation_id": 41779,
    "cash_type": 0,
    "apartment_sales_client_id": 40878,
    "receipt_payment_code": "",
    "price_per_m2": 0,
    "acreage": 0,
    "total_amount": 11000000000,
    "discount_type": "by_percent",
    "discount_value": 10,
    "discount_amount": 1100000000,
    "total_amount_after_discount": 9890000000,
    "commission_type": "by_percent",
    "commission_value": 3,
    "commission_amount": 296700000,
    "number_of_days": 0,
    "cost_of_land_use_rights": 1000000000,
    "construction_cost": 10000000000,
    "promotion_id": 2,
    "promotion_amount": 10000000,
    "promotion_paid_debt": 1,
    "payment_method_id": "",
    "approve_status": 0,
    "tax": 10,
    "vat": 989000000,
    "grand_total": 10879000000,
    "discount_paid_debt": 1,
    "deposit_total_paid": 0,
    "is_complete": 0,
    "deposit_code": "",
    "agent_type_id": 0,
    "commission_staff_value": 0,
    "commission_staff_support_value": 0,
    "commission_agent_value": 0,
    "commission_agent_support_value": 0,
    "total_price": 0
};
/* Xử lý kiểm tra*/
function kiemtranhaptruockhiupdate_deposit(request_url) {
    let apartment_sales_deposit = request_url.dt.apartment_sales_deposit;
    if (apartment_sales_deposit.price_per_m2 === undefined || apartment_sales_deposit.price_per_m2 === null || apartment_sales_deposit.price_per_m2 === "") {
        console.error("$scope.deposit.price_per_m2", $scope.deposit.price_per_m2);
        return false;
    } else if (!apartment_sales_deposit.acreage) {
        console.error("$scope.deposit.acreage", $scope.roomsDetail.acreage);
        return false;
    } else if (!apartment_sales_deposit.cost_of_land_use_rights) {
        console.error("$scope.deposit.cost_of_land_use_rights", $scope.deposit.cost_of_land_use_rights);
        return false;
    } else if (!apartment_sales_deposit.construction_cost) {
        console.error("$scope.deposit.construction_cost", $scope.deposit.construction_cost);
        return false;
    } else if (!apartment_sales_deposit.apartment_sales_deposit_id) {
        console.error("$scope.deposit.apartment_sales_deposit_id", $scope.deposit.apartment_sales_deposit_id);
        return false;
    } else if (!utility.checkValue(apartment_sales_deposit.apartment_sales_contract_id)) {
        console.error("$scope.deposit.apartment_sales_contract_id", $scope.deposit.apartment_sales_contract_id);
        return false;
    } else if (!apartment_sales_deposit.apartment_sales_marketing_id) {
        console.error("$scope.deposit.apartment_sales_marketing_id", $scope.deposit.apartment_sales_marketing_id);
        return false;
    } else if (!apartment_sales_deposit.apartment_sales_client_id) {
        console.error("$scope.deposit.apartment_sales_client_id", $scope.deposit.apartment_sales_client_id);
        return false;
    } else if (!apartment_sales_deposit.reservation_id) {
        console.error("$scope.deposit.reservation_id", $scope.deposit.reservation_id);
        return false;
    } else if (!apartment_sales_deposit.status) {
        console.error("$scope.deposit.status", $scope.deposit.status);
        return false;
    } else if (!apartment_sales_deposit.room_id) {
        console.error("$scope.deposit.room_id", $scope.deposit.room_id);
        return false;
    } else if (!apartment_sales_deposit.agent_id) {
        console.error("$scope.deposit.agent_id", $scope.deposit.agent_id);
        return false;
    } else if (!apartment_sales_deposit.owner_deposit_id) {
        console.error("$scope.deposit.owner_deposit_id", $scope.deposit.owner_deposit_id);
        return false;
    } else if (!apartment_sales_deposit.payment_method_id) {
        console.error("$scope.deposit.payment_method_id", $scope.deposit.payment_method_id);
        return false;
    } else if (!apartment_sales_deposit.deposit_date) {
        console.error("$scope.deposit.deposit_date", $scope.deposit.deposit_date);
        return false;
    } else if (!apartment_sales_deposit.deposit_amount) {
        console.error("$scope.deposit.deposit_amount", $scope.deposit.deposit_amount);
        return false;
    } else if (!apartment_sales_deposit.deposit_total) {
        console.error("$scope.deposit.deposit_total", $scope.deposit.deposit_total);
        return false;
    } else if (!apartment_sales_deposit.owner_deposit_amount) {
        console.error("$scope.deposit.owner_deposit_amount", $scope.deposit.owner_deposit_amount);
        return false;
    } else if (!apartment_sales_deposit.owner_deposit_total) {
        console.error("$scope.deposit.owner_deposit_total", $scope.deposit.owner_deposit_total);
        return false;
    } else if (!apartment_sales_deposit.acreage) {
        console.error("$scope.roomsDetail.acreage", $scope.roomsDetail.acreage);
        return false;
    } else if (!apartment_sales_deposit.payment_method_id) {
        console.error("$scope.roomsDetail.payment_method_id", $scope.deposit.payment_method_id);
        return false;
    }
    else {
        return true;
    }
}
$scope.updateDepositAfterTheDebtHasConfirmedTheDeposit = function () {
    UtilityService.decentralization("pms_project_map_location_tranfer_deposit").then(function (response) {
        if (response.data.err === 0 && response.data.dt !== undefined) {
            $scope.pms_project_map_location_tranfer_deposit = utility.get_allow(response.data);
            $scope.reservation = wizard_screen.man_hinh_dangky.reservation.get_reservation();
            $scope.deposit = wizard_screen.man_hinh_datcoc.deposit.get_deposit();
            $scope.contract1 = wizard_screen.man_hinh_hopdong.contract.get_contract();
            $scope.response_reservation = wizard_screen.man_hinh_dangky.reservation.get_response_reservation();
            $scope.response_deposit = wizard_screen.man_hinh_datcoc.deposit.get_response_deposit();
            $scope.response_contract = wizard_screen.man_hinh_hopdong.contract.get_response_contract();
            $scope.objectRoom = {
                room_id: $scope.item.room_id,
            };
            if ($scope.item.room_status_id === 0) {
                $scope.ObjectApartmentSalesMarketing = {
                    apartment_sales_marketing_id: $scope.item.apartment_sales_marketing_id,
                };
            } else if ($scope.item.room_status_id === 3) {
                $scope.ObjectApartmentSalesMarketing = {
                    apartment_sales_marketing_id: $scope.reservation.apartment_sales_marketing_id,
                };
            } else if ($scope.item.room_status_id === 4) {
                $scope.ObjectApartmentSalesMarketing = {
                    apartment_sales_marketing_id: $scope.deposit.apartment_sales_marketing_id,
                };
            } else if ($scope.item.room_status_id === 1) {
                $scope.ObjectApartmentSalesMarketing = {
                    apartment_sales_marketing_id: $scope.contract1.apartment_sales_marketing_id,
                };
            }
            var dataRoomDetail = JSON.stringify({
                company: $scope.companyTemp,
                languages: $scope.languageTemp,
                rooms: $scope.objectRoom,
                apartment_sales_marketing_unit: $scope.ObjectApartmentSalesMarketing //Van
            });
            UtilityService.getListObjectWithParam($scope.tableRooms, "detail", dataRoomDetail).then(function (response) {
                if (response.data.err === 0) {
                    $scope.roomsDetail = response.data.dt.rooms;
                    wizard_screen.man_hinh_canho.data_room_detail.chitiet_canho.set_room_detail($scope.roomsDetail);
                    wizard_screen.man_hinh_canho.data_room_detail.chitiet_canho.set($scope.roomsDetail);
                    wizard_screen.man_hinh_canho.data_room_detail.effective_date.get();
                    wizard_screen.man_hinh_canho.data_room_detail.employeeList.get();
                    format_room_detail_update_deposit($scope.deposit, $scope.roomsDetail);
                    let request_url = {
                        table: "apartment_sales_deposit",
                        cm: "update",
                        dt: {
                            "company": { "company_id": com_id },
                            "apartment_sales_deposit": {
                                "apartment_sales_deposit_id": utility.getNumber($scope.deposit.apartment_sales_deposit_id),
                                "apartment_sales_marketing_id": utility.getNumber($scope.deposit.apartment_sales_marketing_id),
                                "apartment_sales_contract_id": utility.getNumber($scope.deposit.apartment_sales_contract_id),
                                "apartment_sales_client_id": utility.getNumber($scope.deposit.apartment_sales_client_id),
                                "reservation_id": utility.getNumber($scope.deposit.reservation_id),
                                "status": 4,/* lam dat coc */
                                "room_id": utility.getNumber($scope.room_id),
                                "agent_id": utility.getNumber($scope.deposit.agent_id),
                                "owner_nationality_id": utility.getString($scope.deposit.owner_nationality_id),
                                "owner_deposit_id": utility.getNumber($scope.deposit.owner_deposit_id),
                                "payment_method_id": utility.getString($scope.deposit.payment_cycle_id),
                                "owner_deposit_name": utility.getString($scope.deposit.owner_deposit_name),
                                "owner_deposit_last_name": utility.getString($scope.deposit.owner_deposit_last_name),
                                "owner_deposit_phone": utility.dinh_dang_so_phone_to_save(utility.getString($scope.deposit.owner_deposit_phone), $scope.deposit.owner_area_code),
                                "owner_deposit_email": utility.getString($scope.deposit.owner_deposit_email),
                                "owner_country_code": utility.getString($scope.deposit.owner_country_code),
                                "identity_type": utility.getString($scope.deposit.identity_type),
                                "identity_number": utility.getString($scope.deposit.identity_number),
                                "identity_image_path": "",
                                "identify_created": UtilityCheckFormatService.change_date_to_save($scope.deposit.identify_created),
                                "identify_expired": UtilityCheckFormatService.change_date_to_save($scope.deposit.identify_expired),
                                "identify_place": utility.getString($scope.deposit.identify_place),
                                "address_contact": utility.getString($scope.deposit.address_contact),
                                "image_path": "",
                                "tax_code": "",
                                "receiver_name": utility.getString($scope.deposit.receiver_name),
                                "position_name": utility.getString($scope.deposit.position_name),
                                "owner_currency": utility.getString($scope.deposit.owner_currency),
                                "currency_code": utility.getString($scope.deposit.currency_code),
                                "deposit_date_to": UtilityCheckFormatService.change_date_to_save($scope.deposit.deposit_date_to),
                                exchange_rate: utility.so_tra_ve_binh_thuong($scope.deposit.exchange_rate),
                                "created_by_id": $scope.deposit.created_by_id,
                                "created_by_name": $scope.deposit.created_by_name,
                                "is_complete": 0,
                                "content": utility.getString($scope.deposit.content),
                                remark: utility.getString($scope.deposit.remark),
                                bank_id: "",
                                bank_name: "",
                                reason_cancel: "",
                                "price_per_m2": utility.so_tra_ve_binh_thuong($scope.deposit.price_per_m2),
                                "acreage": utility.so_tra_ve_binh_thuong($scope.roomsDetail.acreage),
                                "cost_of_land_use_rights": utility.so_tra_ve_binh_thuong($scope.deposit.cost_of_land_use_rights),
                                "construction_cost": utility.so_tra_ve_binh_thuong($scope.deposit.construction_cost),
                                /* phan tram chien khau */
                                discount_value: utility.so_tra_ve_binh_thuong($scope.deposit.discount_value),
                                /* tien chiet khau */
                                discount_amount: utility.so_tra_ve_binh_thuong($scope.deposit.discount_amount),
                                "total_amount_after_discount": utility.so_tra_ve_binh_thuong($scope.deposit.total_amount_after_discount),
                                "approve_status": 0,
                                /* tru cong no */
                                "promotion_paid_debt": utility.getNumber($scope.deposit.article3_promotion_paid_debt),
                                /* tru trong */
                                "discount_paid_debt": utility.getNumber($scope.deposit.tru_chiet_khau),
                                /* chuong trinh khuyen mai */
                                "promotion_id": utility.getNumber($scope.deposit.article3_promotion_id),
                                total_amount: utility.so_tra_ve_binh_thuong($scope.deposit.article3_total_amount),
                                discount_type: $scope.deposit.article3_discount_type,
                                commission_type: utility.getString($scope.deposit.commission_type),
                                commission_value: utility.so_tra_ve_binh_thuong($scope.deposit.commission_value),
                                commission_amount: utility.so_tra_ve_binh_thuong($scope.deposit.commission_amount),
                                promotion_amount: utility.so_tra_ve_binh_thuong($scope.deposit.article3_promotion_amount),
                                tax: utility.so_tra_ve_binh_thuong($scope.deposit.article3_tax),
                                vat: utility.so_tra_ve_binh_thuong($scope.deposit.article3_vat),
                                grand_total: utility.so_tra_ve_binh_thuong($scope.deposit.grand_total),
                                deposit_total_paid: utility.so_tra_ve_binh_thuong($scope.deposit.total_payment),
                                deposit_code: "HHH",
                                deposit_amount: utility.so_tra_ve_binh_thuong($scope.deposit.deposit_amount),
                                deposit_total: utility.so_tra_ve_binh_thuong($scope.deposit.deposit_total),
                                deposit_date: UtilityCheckFormatService.change_date_to_save($scope.deposit.deposit_date),
                                owner_deposit_amount: Math.round(utility.so_tra_ve_binh_thuong($scope.deposit.owner_deposit_amount)),
                                owner_deposit_total: Math.round(utility.so_tra_ve_binh_thuong($scope.deposit.owner_deposit_total)),
                            },
                        },
                    }
                    if ($scope.currencyList) {
                        get_currency_code($scope.currencyList)
                    } else {
                        console.error("not found $scope.currencyList")
                    }
                    if (!UtilityCheckFormatService.check_date($scope.deposit.identify_created) === false) {
                        $scope.deposit.identify_created = $scope.deposit.identify_created;
                    }
                    if (!UtilityCheckFormatService.check_date($scope.deposit.identify_expired) === false) {
                        $scope.deposit.identify_expired = $scope.deposit.identify_expired;
                    }
                    if (!UtilityCheckFormatService.check_date($scope.deposit.deposit_date) === false) {
                        $scope.deposit.deposit_date = $scope.deposit.deposit_date;
                    }
                    if (!UtilityCheckFormatService.check_date($scope.deposit.deposit_date) === false) {
                        $scope.deposit.deposit_date_to = $scope.deposit.deposit_date;
                    }
                    
                    if (kiemtranhaptruockhiupdate_deposit()) {
                        let dt = JSON.stringify(request_url.dt);
                        UtilityService.getListObjectWithParam(request_url.table, request_url.cm, dt).success(function (response) {
                            if (response.err === 0) {
                                wizard_screen.man_hinh_datcoc.deposit.set_deposit(response.dt.apartment_sales_deposit);
                                wizard_screen.man_hinh_datcoc.deposit.set_response_deposit(response);
                            } else if (response.err === -1) {
                                console.error("Can not parse json. False data type passed to API. Status must be int type.", response.err)
                                console.error("Can not parse json. False data type passed to API. year - month - date", response.err)
                            } else if (response.err === -3) {
                                console.error("Can not parse json. Wrong data type. Status 1: Deposited; 2: Cancel the deposit. If status = 2 then deposit can not be canceled when update deposit. Please update status = 1.", response.err)
                                console.error("Can not parse json. Wrong data type. reservation_id > 0.", response.err)
                            } else if (response.err === -4) {
                                console.error("Can not parse json. Missing data maketting id.", response.err)
                            } else {
                                console.error("Error update deposit after save contract", response.err)
                            }
                        });
                    } else {
                        console.error("C-RED kiểm tra nhập trước khi lưu. [> 0 && !== null && !== undefined] && !== ''");
                    }
                }
            });
        }
    })
}