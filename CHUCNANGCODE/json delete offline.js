$scope.delete = function () {
    function remove(array, element) {
        const index = array.indexOf(element);
        array.splice(index, 1);
    }
    if (!$scope.selected_sales_commission && !$scope.selected_commission_support) {
        console.error("not found "); swal($filter("translate")("Notice"), $filter("translate")("SELECTED_COMMISSTION_UNDEFINED"), "error");
        $scope.selected_sales_commission = [];
        $scope.selected_commission_support = [];
        return;
    }
    else {
        if ($scope.selected_sales_commission.length > 0 && $scope.apartment_sales_commission_assign_list.length > 0) {
            remove($scope.apartment_sales_commission_assign_list, $scope.selected[0])
        }
        if ($scope.selected_commission_support.length > 0 && $scope.apartment_sales_commission_assign_support_list.length > 0) {
            remove($scope.apartment_sales_commission_assign_support_list, $scope.selected[0])
        }
    }
}