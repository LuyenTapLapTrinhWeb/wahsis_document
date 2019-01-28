$scope.ok = function () {
    if ($scope.it.phone1.charAt(0) === "0") {
        $scope.it.phone = $scope.it.phone1.slice(1, $scope.it.phone1.length);
        $scope.it.phone = $scope.it.area_code1 + $scope.it.phone;
    } else {
        $scope.it.phone = $scope.it.area_code1 + $scope.it.phone1;
    }

    $scope.data = {
        first_name: $scope.it.first_name,
        last_name: $scope.it.last_name,
        cell_phone: $scope.it.phone,
        zip_code: $scope.it.zip_code,
        email_address: $scope.it.email_address,
        country_id: $scope.it.country_id,
        province_id: $scope.it.province_id,
        district_id: $scope.it.district_id,
        address: $scope.it.address,
        company_name: $scope.it.company_name,
        business_name: utility.getString($scope.it.career_id),
        position_name: utility.getString($scope.it.position_name),
        client_type: $scope.it.client_type,
        hobby: $scope.it.hobby,
        remark: $scope.it.remark,
        source_id: $scope.it.source_id,
        source_name: "",
        area_code: $scope.it.area_code,
        salary: $scope.it.salary,
        sex: utility.getNumber($scope.it.sex),
        date_of_birth: UtilityCheckFormatService.change_date_to_save($scope.it.birthday),
        users_id: u_id,
        users_name: u_name,
        create_by_id: u_id,
        address_contact: $scope.it.address_contact,
        tax_code: $scope.it.tax_code,
        bank_account_number: $scope.it.bank_account_number,
        bank_name: $scope.it.bank_name,
        identity_number: $scope.it.identity_number,
        issue_date: UtilityCheckFormatService.change_date_to_save($scope.it.date_identity),
        issue_place: $scope.it.issue_place,
        is_invesloper: utility.getNumber($scope.it.is_invesloper)

    }
    console.log("data", $scope.data);
    $scope.data1 = {
        users_id: u_id,
    }

    $scope.data2 = {
        contact: $scope.it.contact,
    }

    //alert($scope.data.source_id)

    if (account_type === 2) {

        if (item === 0) {
            $scope.dtObject = JSON.stringify({ apartment_sales_client: JSON.parse(JSON.stringify($scope.data)), apartment_sales_client_assign: JSON.parse(JSON.stringify($scope.data1)), apartment_sales_client_contact: JSON.parse(JSON.stringify($scope.data2)), company: JSON.parse(JSON.stringify($scope.company)) });
            console.log($scope.dtObject)
            UtilityService.getListObjectWithParam("apartment_sales_client", "add", $scope.dtObject).then(function (response) {
                if (response.data.err === 0) {
                    console.log("dt", response);
                    $uibModalInstance.close();

                    swal("Success!", $filter("translate")("Save_Success"), "success");
                } else {
                    if (response.data.err === -2) {
                        swal("Error!", $filter("translate")("DUPLICATE_PHONE"), "error");
                    } else
                        swal("Error!", $filter("translate")("Save_Error"), "error");
                }
            });
        } else {
            $scope.data.apartment_sales_client_id = $scope.it.apartment_sales_client_id;
            $scope.dtObject = JSON.stringify({ apartment_sales_client: JSON.parse(JSON.stringify($scope.data)), apartment_sales_client_assign: JSON.parse(JSON.stringify($scope.data1)), apartment_sales_client_contact: JSON.parse(JSON.stringify($scope.data2)), company: JSON.parse(JSON.stringify($scope.company)) });
            console.log($scope.dtObject)
            UtilityService.getListObjectWithParam("apartment_sales_client", "update", $scope.dtObject).then(function (response) {
                if (response.data.err === 0) {
                    $uibModalInstance.close();

                    swal("Success!", $filter("translate")("update_success"), "success");
                } else {
                    if (response.data.err === -2) {
                        swal("Error!", $filter("translate")("DUPLICATE_PHONE"), "error");
                    } else
                        swal("Error!", $filter("translate")("Save_Error"), "error");
                }

            });

        }
    } else if (account_type === 1) {
        if (item === 0) {
            $scope.dtObject = JSON.stringify({ apartment_sales_client: JSON.parse(JSON.stringify($scope.data)), company: JSON.parse(JSON.stringify($scope.company)) });
            UtilityService.addObject("apartment_sales_client", $scope.dtObject).then(function (response) {
                if (response.data.err === 0) {
                    console.log("dt_hello", response);
                    var data_contact = {
                        apartment_sales_client_contact_id: 0,
                        users_id: u_id,
                        apartment_sales_client_id: response.data.dt.apartment_sales_client.apartment_sales_client_id,
                        contact: $scope.it.contact,
                    }
                    var dt_contact = JSON.stringify({ apartment_sales_client_contact: JSON.parse(JSON.stringify(data_contact)), company: JSON.parse(JSON.stringify($scope.company)) });
                    UtilityService.getListObjectWithParam("apartment_sales_client_contact", "add", dt_contact).then(function (response) {
                        console.log("dt_contact", response)
                        if (response.data.err === 0) {
                            swal("Success!", $filter("translate")("Save_Success"), "success");
                            $uibModalInstance.close();
                        }
                    })
                } else {
                    if (response.data.err === -2) {
                        swal("Error!", $filter("translate")("DUPLICATE_PHONE"), "error");
                    } else
                        swal("Error!", $filter("translate")("Save_Error"), "error");
                }
            });
        } else {
            $scope.data.apartment_sales_client_id = $scope.it.apartment_sales_client_id;
            $scope.dtObject = JSON.stringify({ apartment_sales_client: JSON.parse(JSON.stringify($scope.data)), company: JSON.parse(JSON.stringify($scope.company)) });
            console.log($scope.dtObject)
            UtilityService.updateObject("apartment_sales_client", $scope.dtObject).then(function (response) {
                if (response.data.err === 0) {
                    var data_contact = {
                        apartment_sales_client_contact_id: $scope.it.contact_id,
                        users_id: u_id,
                        apartment_sales_client_id: response.data.dt.apartment_sales_client.apartment_sales_client_id,
                        contact: $scope.it.contact
                    }
                    var dt_contact = JSON.stringify({ apartment_sales_client_contact: JSON.parse(JSON.stringify(data_contact)), company: JSON.parse(JSON.stringify($scope.company)) });

                    UtilityService.getListObjectWithParam("apartment_sales_client_contact", "update", dt_contact).then(function (response) {
                        console.log(response)
                        if (response.data.err === 0) {
                            swal("Success!", $filter("translate")("update_success"), "success");
                            $uibModalInstance.close();
                        }
                    })
                } else {
                    if (response.data.err === -2) {
                        swal("Error!", $filter("translate")("DUPLICATE_PHONE"), "error");
                    } else
                        swal("Error!", $filter("translate")("Save_Error"), "error");
                }
            });

        }
    }


};
/* front end truyen api */

Request URL: http://pms-dev.wahsis.net/api/apartment_sales_client?
Request Method: POST
Status Code: 200 OK
Remote Address: 125.212.211.168: 80
Referrer Policy: no - referrer - when - downgrade
Accept: application / json, text / plain, */*
Accept-Encoding: gzip, deflate
Accept-Language: en,vi;q=0.9
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEiLCJhaWQiOiIxMDAwMiIsImF0aSI6IjEiLCJtaWQiOiI1NDc0NCIsInVzciI6ImFkbWluIiwicm9sIjoic3RhZmYiLCJpYXQiOjE1NDg0NzEzNDksImp0aSI6Im82NjY1NnNyNGU1cnlmOXEifQ.KH3qayeOXCUiKShbfnjWIypyuRz2Gdw872iI_VenIAA
Connection: keep-alive
Content-Length: 784
Content-Type: application/x-www-form-urlencoded
Cookie: pms-dev-company-code={"companyid":54744,"companycode":"5344L6","module":"SMS"}; pms-dev-token={"token":"eyJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEiLCJhaWQiOiIxMDAwMiIsImF0aSI6IjEiLCJtaWQiOiI1NDc0NCIsInVzciI6ImFkbWluIiwicm9sIjoic3RhZmYiLCJpYXQiOjE1NDg0NzEzNDksImp0aSI6Im82NjY1NnNyNGU1cnlmOXEifQ.KH3qayeOXCUiKShbfnjWIypyuRz2Gdw872iI_VenIAA"}; pms-dev={"companyid":54744,"companycode":"5344L6","username":"admin","pass":"adminaA@","userid":2,"email":"","fullname":"Administrator","phone":"84123","business_model":"apartment_servic","branch_id":54745,"company_logo":"","account_type":1,"branch_name":"Tiáº¿n PhÆ°á»c - Senturia VÆ°á»n LÃ i","agent_id":0,"module_active_list":[{"module_id":"pos","module_name":"","active_date":"2018-05-01 00:00:00.0","expiration_date":"2020-12-31 00:00:00.0","is_active":true},{"module_id":"sms","module_name":"","active_date":"2018-05-01 00:00:00.0","expiration_date":"2020-12-31 00:00:00.0","is_active":true}],"module_name":"SMS","gendevice_id":"1548475769467-599"}; pms-dev-format={"format_date":"dd-MM-yyyy","format_time":"HH:mm:ss","format_money":"#,##0","format_number":"#,##0.00","item_per_page":"100","item_per_page_list":"50,100,200"}; io=dOIm-u9h1oGpIDmuACkH
Host: pms-dev.wahsis.net
Origin: http://pms-dev.wahsis.net
Referer: http://pms-dev.wahsis.net/
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
cm: update
dt: {"apartment_sales_client":{"first_name":"test12129999","last_name":"1212999test","cell_phone":"846622356","email_address":"hahahaha@gmail.com","country_id":"","business_name":"SCC.0003","position_name":"","client_type":"CLT.0001","source_id":"SCS.0002","source_name":"","area_code":"VN","salary":"Tren 100 trieu","sex":1,"date_of_birth":"2019-01-02","users_id":2,"users_name":"Administrator","create_by_id":2,"issue_date":"2018-12-27","is_invesloper":1,"apartment_sales_client_id":40876},"company":{"company_id":54744}}
/* ket qua tra ve */
    { "err": 0, "msg": "No error", "dt": { "apartment_sales_client": { "apartment_sales_client_id": 40876, "first_name": "test12129999", "last_name": "1212999test", "cell_phone": "846622356", "email_address": "hahahaha@gmail.com", "country_id": "", "business_name": "SCC.0003", "position_name": "", "client_type": "CLT.0001", "area_code": "VN", "source_id": "SCS.0002", "source_name": "", "sex": 1, "date_of_birth": "2019-01-02", "salary": "Tren 100 trieu", "create_by_id": 2, "is_invesloper": 1, "issue_date": "2018-12-27", "age_from": 0, "age_to": 0 } } }



apartment_sales_contract_id = {
    "apartment_sales_contract_id": 0,
    "deposit_date": UtilityCheckFormatService.change_date_to_save($scope.dayCurrent),
    "deposit_date_to": UtilityCheckFormatService.change_date_to_save($scope.dayCurrent),
    "commission_staff_value": $scope.deposit.commission_staff_value,
    "commission_staff_support_value": $scope.deposit.commission_staff_support_value,
    "commission_agent_value": $scope.deposit.commission_agent_value,
    "commission_agent_support_value": $scope.deposit.commission_agent_support_value,
    "room_id": $scope.room_id,
    "receiver_name": $scope.deposit.receiver_id,
    "owner_deposit_name": $scope.deposit.owner_deposit_name,
    "owner_deposit_last_name": $scope.deposit.owner_deposit_last_name,
    "owner_deposit_phone": $scope.owner_deposit_phone_temp,
    "owner_deposit_email": $scope.deposit.owner_deposit_email,
    "currency_code": $scope.deposit.currency_code,
    "deposit_amount": 0,
    "deposit_total": 0,
    "exchange_rate": utility.so_tra_ve_binh_thuong($scope.deposit.exchange_rate),
    "owner_currency": $scope.deposit.owner_currency,
    "owner_deposit_amount": 0,
    "owner_deposit_total": 0,
    "created_by_id": $scope.u_id,
    "created_by_name": $scope.u_name,
    "identity_type": $scope.deposit.identity_type,
    "identity_number": utility.getString($scope.deposit.identity_number),
    "identify_created": $scope.identifyCreatedDepositTemp,
    "identify_expired": $scope.identifyExpiredDepositTemp,
    "identify_place": utility.getString($scope.deposit.identify_place),
    "content": $scope.deposit.content,
    "request_status": 1,
    "remark": $scope.deposit.remark,
    "bank_id": utility.getString($scope.deposit.bank_id),
    "bank_name": utility.getString($scope.deposit.bank_name),
    "payment_type": utility.getString($scope.deposit.payment_type),
    "address_contact": $scope.deposit.address_contact,
    "apartment_sales_marketing_id": apartment_sales_marketing_id,
    "owner_nationality_id": $scope.deposit.owner_nationality_id,
    "owner_area_code": $scope.deposit.owner_area_code,
    "agent_id": $scope.deposit.agent_id,
    "agent_type_id": $scope.deposit.agent_type_id,
    "commission_type": $scope.deposit.commission_type,
    "commission_value": utility.so_tra_ve_binh_thuong($scope.deposit.commission_value),
    "commission_amount": utility.so_tra_ve_binh_thuong($scope.deposit.commission_amount),
    "total_amount": utility.so_tra_ve_binh_thuong($scope.deposit.total_price),
    "discount_type": $scope.deposit.discount_type,
    "discount_value": utility.so_tra_ve_binh_thuong($scope.deposit.discount_value),
    "discount_amount": utility.so_tra_ve_binh_thuong($scope.deposit.discount_amount),
    "total_amount_after_discount": utility.so_tra_ve_binh_thuong($scope.deposit.total_amount_after_discount_promotion),
    "price_per_m2": utility.so_tra_ve_binh_thuong($scope.deposit.price_per_m2),
    "acreage": utility.so_tra_ve_binh_thuong($scope.roomsDetail.acreage),
    "construction_cost": utility.so_tra_ve_binh_thuong($scope.deposit.construction_cost),
    "cost_of_land_use_rights": utility.so_tra_ve_binh_thuong($scope.deposit.cost_of_land_use_rights),
    "promotion_id": $scope.deposit.article3_promotion_id, /* chuong trinh khuyen mai */
    "promotion_amount": utility.so_tra_ve_binh_thuong($scope.deposit.article3_promotion_amount), /* gia tri khuyen mai */
    "promotion_paid_debt": $scope.deposit.article3_promotion_paid_debt,  /* tru cong no */
    "approve_status": 0,
    "tax": 10,
    "vat": utility.so_tra_ve_binh_thuong($scope.deposit.vat),
    "grand_total": utility.so_tra_ve_binh_thuong($scope.roomsDetail.grandTotal1),
    "discount_paid_debt": $scope.deposit.tru_chiet_khau, /* tru trong */
    "deposit_total_paid": utility.so_tra_ve_binh_thuong($scope.deposit.deposit_total_paid),
    "is_complete": 0,
    "payment_method_id": "", // "payment_method_id": $scope.deposit.payment_cycle_id,
    "deposit_code": "",
    "status": $scope.deposit.status,
}



apartment_sales_client_id = {
    first_name: $scope.it.first_name,
    last_name: $scope.it.last_name,
    cell_phone: $scope.it.phone,
    zip_code: $scope.it.zip_code,
    email_address: $scope.it.email_address,
    country_id: $scope.it.country_id,
    province_id: $scope.it.province_id,
    district_id: $scope.it.district_id,
    address: $scope.it.address,
    company_name: $scope.it.company_name,
    business_name: utility.getString($scope.it.career_id),
    position_name: utility.getString($scope.it.position_name),
    client_type: $scope.it.client_type,
    hobby: $scope.it.hobby,
    remark: $scope.it.remark,
    source_id: $scope.it.source_id,
    source_name: "",
    area_code: $scope.it.area_code,
    salary: $scope.it.salary,
    sex: utility.getNumber($scope.it.sex),
    date_of_birth: UtilityCheckFormatService.change_date_to_save($scope.it.birthday),
    users_id: u_id,
    users_name: u_name,
    create_by_id: u_id,
    address_contact: $scope.it.address_contact,
    tax_code: $scope.it.tax_code,
    bank_account_number: $scope.it.bank_account_number,
    bank_name: $scope.it.bank_name,
    identity_number: $scope.it.identity_number,
    issue_date: UtilityCheckFormatService.change_date_to_save($scope.it.date_identity),
    issue_place: $scope.it.issue_place,
    is_invesloper: utility.getNumber($scope.it.is_invesloper)
}