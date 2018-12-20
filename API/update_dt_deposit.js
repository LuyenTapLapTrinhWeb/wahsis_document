function updateDepositAfterSaveContract() {
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
    let request_url = {
        table: "apartment_sales_deposit",
        cm: "update",
        dt: {
            "company": { "company_id": com_id },
            "apartment_sales_deposit": {
                "apartment_sales_deposit_id": $scope.deposit.apartment_sales_deposit_id,
                "apartment_sales_contract_id": $scope.contract1.apartment_sales_contract_id,
                "apartment_sales_marketing_id": $scope.deposit.apartment_sales_marketing_id,
                "apartment_sales_client_id": $scope.deposit.apartment_sales_client_id,
                "reservation_id": $scope.deposit.reservation_id,
                "status": 1,
                "room_id": $scope.room_id,
                "agent_id": $scope.deposit.agent_id,
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
                "deposit_date": UtilityCheckFormatService.change_date_to_save($scope.deposit.deposit_date),
                "deposit_date_to": UtilityCheckFormatService.change_date_to_save($scope.deposit.deposit_date_to),
                "owner_currency": utility.getString($scope.deposit.owner_currency),
                "currency_code": utility.getString($scope.deposit.currency_code),
                deposit_amount: utility.so_tra_ve_binh_thuong($scope.deposit.deposit_amount),
                deposit_total: utility.so_tra_ve_binh_thuong($scope.deposit.deposit_total),
                exchange_rate: utility.so_tra_ve_binh_thuong($scope.deposit.exchange_rate),
                owner_deposit_amount: Math.round(utility.so_tra_ve_binh_thuong($scope.deposit.owner_deposit_amount)),
                owner_deposit_total: Math.round(utility.so_tra_ve_binh_thuong($scope.deposit.owner_deposit_total)),
                "created_by_id": $scope.contract1.created_by_id,
                "created_by_name": $scope.contract1.created_by_name,
                "is_complete": 0,
                "content": utility.getString($scope.deposit.content),
                "remark": utility.getString($scope.deposit.remark),
                "bank_id": "",
                "bank_name": "",
                "reason_cancel": "",
                "price_per_m2": utility.so_tra_ve_binh_thuong($scope.objectDeposit.price_per_m2),
                "acreage": utility.so_tra_ve_binh_thuong($scope.objectDeposit.acreage),
                total_amount: utility.so_tra_ve_binh_thuong($scope.deposit.total_price),
                discount_type: $scope.deposit.discount_type,
                /* phan tram chien khau */
                discount_value: utility.so_tra_ve_binh_thuong($scope.deposit.discount_value),
                /* tien chiet khau */
                discount_amount: utility.so_tra_ve_binh_thuong($scope.deposit.discount_amount),
                "total_amount_after_discount": utility.so_tra_ve_binh_thuong($scope.deposit.total_amount_after_discount),
                commission_type: $scope.deposit.commission_type,
                commission_value: utility.so_tra_ve_binh_thuong($scope.deposit.commission_value),
                commission_amount: utility.so_tra_ve_binh_thuong($scope.deposit.commission_amount),
                "approve_status": 0,
                /* tru cong no */
                "promotion_paid_debt": $scope.deposit.article3_promotion_paid_debt,
                /* tru trong */
                "discount_paid_debt": $scope.deposit.tru_chiet_khau,
                /* chuong trinh khuyen mai */
                "promotion_id": $scope.deposit.article3_promotion_id,
                total_amount: utility.so_tra_ve_binh_thuong($scope.contract1.article3_total_amount),
                discount_type: $scope.contract1.article3_discount_type,
                discount_value: utility.so_tra_ve_binh_thuong($scope.contract1.article3_discount_value),
                discount_amount: utility.so_tra_ve_binh_thuong($scope.contract1.article3_discount_amount),
                total_amount_after_discount: utility.so_tra_ve_binh_thuong($scope.contract1.article3_total_amount_after_discount),
                commission_type: $scope.contract1.commission_type,
                commission_value: utility.so_tra_ve_binh_thuong($scope.contract1.commission_value),
                commission_amount: utility.so_tra_ve_binh_thuong($scope.contract1.commission_amount),
                "cost_of_land_use_rights": utility.so_tra_ve_binh_thuong($scope.deposit.cost_of_land_use_rights),
                "construction_cost": utility.so_tra_ve_binh_thuong($scope.deposit.construction_cost),
                promotion_amount: utility.so_tra_ve_binh_thuong($scope.contract1.article3_promotion_amount),
                tax: utility.so_tra_ve_binh_thuong($scope.contract1.article3_tax),
                vat: utility.so_tra_ve_binh_thuong($scope.contract1.article3_vat),
                grand_total: utility.so_tra_ve_binh_thuong($scope.contract1.article3_grand_total),
                deposit_total_paid: utility.so_tra_ve_binh_thuong($scope.contract1.total_payment),
            },
        },
    }
    let dt = JSON.stringify(request_url.dt);
    UtilityService.getListObjectWithParam(request_url.table, request_url.cm, dt).success(function (response) {
        if (response.err === 0) {
            $scope.apartment_sales_deposit_id = { "apartment_sales_deposit_id": $scope.deposit.apartment_sales_deposit_id };
            $scope.apartment_sales_deposit_detail = JSON.stringify({
                company: $scope.companyTemp,
                languages: $scope.languageTemp,
                apartment_sales_deposit: $scope.apartment_sales_deposit_id
            });
            UtilityService.getListObjectWithParam("apartment_sales_deposit", "detail", $scope.apartment_sales_deposit_detail).success(function (response_deposit) {
                if (response.err === 0) {
                    $scope.deposit = response_deposit.dt.apartment_sales_deposit;
                    wizard_screen.man_hinh_datcoc.deposit.set_deposit(response_deposit.dt.apartment_sales_deposit);
                    wizard_screen.man_hinh_datcoc.deposit.set_response_deposit(response_deposit);
                    $scope.updateDeposit();
                } else {
                    console.error("can't not load apartment_sales_deposit detail")
                    $scope.disableTabContract = true;
                    $scope.disableTabComplete = true;
                }
            });
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
}