$scope.contractTemp = {
    agent_id: $scope.contract1.agent_id,
    apartment_sales_marketing_id: ($scope.detail_contract.apartment_sales_marketing_id === undefined || $scope.detail_contract.apartment_sales_marketing_id === null || $scope.detail_contract.apartment_sales_marketing_id === "") ? undefined : $scope.detail_contract.apartment_sales_marketing_id,
    article3_acreage: $scope.deposit.acreage, //Van
    article3_amount: Number(String($scope.deposit.price_per_m2).replace(/[,]/g, '')), //Van
    article3_construction_cost: Number(String($scope.deposit.construction_cost).replace(/[, ]/g, '')),//Van
    article3_cost_of_land_use_rights: Number(String($scope.deposit.cost_of_land_use_rights).replace(/[, ]/g, '')), //Van
    article3_discount_amount: Number(String($scope.contract1.article3_discount_amount).replace(/[,]/g, '')), //Van
    article3_discount_type: $scope.contract1.article3_discount_type,
    article3_discount_value: Number(String($scope.contract1.article3_discount_value).replace(/[,]/g, '')),
    article3_first_payment: Number(String($scope.article3_first_payment1).replace(/[,]/g, '')), //Van
    article3_grand_total: Number(String($scope.roomsDetail.grandTotal1).replace(/[,]/g, '')), //Van
    article3_maintenance_fee: utility.so_tra_ve_binh_thuong($scope.contract1.article3_maintenance_fee),
    article3_maintenance_type: $scope.contract1.article3_maintenance_type,
    article3_maintenance_value: utility.so_tra_ve_binh_thuong($scope.contract1.article3_maintenance_value), //Van
    article3_payment_cycle: $scope.contract1.article3_payment_cycle,
    article3_payment_method: $scope.contract1.article3_payment_method,
    // article3_payment_period: Math.floor(row_value),
    article3_payment_period_type: $scope.contract1.article3_payment_period_type,
    article3_payment_period_value: UtilityCheckFormatService.change_number_to_save($scope.contract1.article3_payment_period_value),
    article3_promotion_amount: utility.so_tra_ve_binh_thuong($scope.contract1.article3_promotion_amount),
    article3_promotion_id: $scope.contract1.article3_promotion_id,
    article3_promotion_paid_debt: $scope.contract1.article3_promotion_paid_debt,
    article3_tax: 10,
    article3_total_amount: Number(String($scope.deposit.total_price).replace(/[,]/g, '')), //Van
    article3_total_amount_after_discount: Number(String($scope.contract1.total_after_discount).replace(/[, ]/g, '')),
    article3_vat: Number(String($scope.roomsDetail.vat).replace(/[,]/g, '')),
    commission_amount: Number(String($scope.contract1.commission_amount).replace(/[, ]/g, '')), //Van
    commission_type: $scope.contract1.commission_type,
    commission_value: Number(String($scope.contract1.commission_value).replace(/[, ]/g, '')), //Van
    commitment_type: $scope.contract1.is_commitment === true ? utility.checkValue($scope.detail_contract.commitment_type) : "",
    commitment_value: $scope.contract1.is_commitment === true ? utility.so_tra_ve_binh_thuong($scope.detail_contract.commitment_value1) : 0,
    created_by_id: account_type, //Van
    created_by_name: $scope.contract1.created_by_name,
    effective_date: $scope.fromDateContractTemp,
    input_by_id: u_id,
    input_by_name: u_name,
    is_commitment: $scope.contract1.is_commitment,
    owner_area_code: $scope.deposit.country,
    owner_contact_address: $scope.deposit.address_contact,
    owner_id_card: $scope.deposit.identity_number,
    owner_issued_date: UtilityCheckFormatService.change_date_to_save($scope.identifyCreatedDepositTemp),
    owner_issued_place: $scope.deposit.identify_place,
    owner_nationality_id: $scope.deposit.owner_nationality_id,
    owner_phone: $scope.owner_phone,
    owner_representative: encodeURI($scope.deposit.owner_name1),
    payment_cycle_id: $scope.contract1.payment_cycle_id,
    room_id: $scope.item.room_id,
    room_model: $scope.roomsDetail.room_model,
    room_name: $scope.item.room_name,
    seller_address: $scope.contract1.seller_address,
    seller_company_name: encodeURI($scope.contract1.seller_company_name),
    seller_phone: $scope.contract1.seller_phone,
    seller_position: $scope.contract1.seller_position,
    seller_representative: $scope.contract1.seller_representative, //Van
};