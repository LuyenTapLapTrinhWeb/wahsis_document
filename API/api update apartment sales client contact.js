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
    is_invesloper:  utility.getNumber($scope.it.is_invesloper)
    
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