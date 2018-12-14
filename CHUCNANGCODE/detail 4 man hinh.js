/* reservation */
$scope.reservation_id = { "apartment_sales_status_id": $scope.item.reservation_id }; //Van from $scope.item.source_id to $scope.item.reservation_id
$scope.reservation_detail = JSON.stringify({
    company: $scope.companyTemp,
    languages: $scope.languageTemp,
    apartment_sales_status: $scope.reservation_id
});
UtilityService.getListObjectWithParam("apartment_sales_status", "detail", $scope.reservation_detail).success(function (response) {
    if (response.err === 0) {
        $scope.reservation_detail_list = response.dt.apartment_sales_status;
        $scope.deposit.receiver_id = $scope.reservation_detail_list.created_by_id;//Van
        $scope.deposit.agent_id = $scope.reservation_detail_list.agent_id;//Van
        // console.log("apartment_sales_status_detail_list", $scope.reservation_detail_list);
        $scope.arr_detail = [];
        $scope.arr_detail.push($scope.reservation_detail_list);
        // console.log("arr_detail", $scope.arr_detail);
        if ($scope.arr_detail.length !== 0) {
            //$scope.agent_detail.agent_id = $scope.arr_detail[0].agent_id;
            $scope.deposit.agent_id = $scope.arr_detail[0].agent_id;

        }
    }
});


/* deposit */
$scope.apartment_sales_deposit_id = { "apartment_sales_deposit_id": $scope.item.source_id };
$scope.apartment_sales_deposit_detail = JSON.stringify({
    company: $scope.companyTemp,
    languages: $scope.languageTemp,
    apartment_sales_deposit: $scope.apartment_sales_deposit_id
});
UtilityService.getListObjectWithParam("apartment_sales_deposit", "detail", $scope.apartment_sales_deposit_detail).success(function (response) {
    if (response.err === 0) {
        $scope.apartment_sales_deposit_detail_list = response.dt.apartment_sales_deposit;
    } else {
        console.error("can't not load apartment_sales_deposit detail")
        $scope.disableTabContract = true;
        $scope.disableTabComplete = true;
    }
});

/* contract */
$http.get(API_URL + "apartment_sales_contract?cm=detail&dt={company:{company_id:" + com_id + "},apartment_sales_contract:{room_id:" + id + "}}").success(function (RESPONSE_DETAIL_CONTRACT) {
    if (RESPONSE_DETAIL_CONTRACT.err === 0) {
        // console.log(response, API_URL + "apartment_sales_contract?cm=detail&dt={company:{company_id:" + com_id + "},apartment_sales_contract:{room_id:" + id + "}}")
        $scope.detailContract = RESPONSE_DETAIL_CONTRACT.dt.apartment_sales_contract;
        let cm = "";
        let table = $scope.tableApartmentSaleDeposit;
        if ($scope.source_id > 0) {
            apartment_sales_deposit = {
                company: $scope.companyTemp,
                apartment_sales_deposit: { "apartment_sales_deposit_id": $scope.item.source_id }
            }
            cm = "detail"
        } else {
            /* add new contract prepare to print */
            apartment_sales_deposit = {
                company: $scope.companyTemp,
                apartment_sales_deposit: { "room_id": $scope.item.room_id }
            }
            cm = "current"
        }
        apartment_sales_deposit = JSON.stringify(apartment_sales_deposit);
        UtilityService.getListObjectWithParam(table, cm, apartment_sales_deposit).success(function (response_deposit) {
            if (response_deposit.err === 0) {
                $scope.deposit = response_deposit.dt.apartment_sales_deposit;
                wizard_screen.man_hinh_datcoc.deposit.set_deposit(response_deposit.dt.apartment_sales_deposit)
                wizard_screen.man_hinh_datcoc.deposit.set_response_deposit(response_deposit)
                wizard_screen.man_hinh_hopdong.contract.set_contract(RESPONSE_DETAIL_CONTRACT.dt.apartment_sales_contract)
                wizard_screen.man_hinh_hopdong.contract.set_response_contract(RESPONSE_DETAIL_CONTRACT)
                $scope.updateContract()
            }
        });
    } else if (RESPONSE_DETAIL_CONTRACT.err === 403) {
        $rootScope.logout();
    }
})