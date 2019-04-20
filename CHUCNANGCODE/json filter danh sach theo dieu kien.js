
/* bước 1 // có danh sách đã hoàn thiện*/
let apartment_sales_deposit_list = []
/* Bước 2 // lọc danh sách theo điều kiện hiển thị*/
function get_deposit_list_by_filter_status(apartment_sales_deposit_list) {
    return apartment_sales_deposit_list.filter(function (deposit, deposit_index, deposit_list) {
        if (deposit.status > 3) {
            return deposit;
        }
    });
}
/* bước 3 cách sử dụng */
function getOnlyHopDongDatCoc(apartment_sales_deposit_list) {
    let apartment_sales_deposit_list_new = get_deposit_list_by_filter_status(apartment_sales_deposit_list);
    return apartment_sales_deposit_list_new;
}
/* sử dụng cho điều kiện tổng: tiêu chí search tất cả */
function getAllTypeContract() {
    $scope.apartment_sales_deposit_list = getOnlyHopDongDatCoc(response_deposit.data.dt.apartment_sales_deposit_list);
}
/* sử dụng cho điều kiện đơn: tiêu chí search riêng lẻ  */
if ($scope.apartment_sales_contract_list.length > 0) {
    if (checkContractTypeCombobox($scope.contract_type) === "ALL") {
        // getAllTypeContract();
    } else if (checkContractTypeCombobox($scope.contract_type) === "HOP_DONG_DAT_COC") {
        getOnlyHopDongDatCoc($scope.apartment_sales_contract_list);
    } else if (checkContractTypeCombobox($scope.contract_type) === "HOP_DONG_MUA_BAN") {
        // getOnlyHopDongMuaBan();
    } else {
        getAllTypeContract();
    }
}