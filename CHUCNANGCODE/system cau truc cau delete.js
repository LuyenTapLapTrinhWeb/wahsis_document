$scope.delete = function () {
    $rootScope.checkLogout();
    if ($scope.selected.length > 0) {
        swal({
            title: $filter('translate')('Are_you_sure'),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            cancelButtonText: $filter('translate')('cancel'),
            confirmButtonText: $filter('translate')('Yes_delete_it'),
            closeOnConfirm: false
        }, function () {
            let request_url = {
                DELETE: {
                    table: "apartment_sales_commission_assign",
                    cm: "delete",
                    dt: {
                        "company": { "company_id": com_id },
                        "apartment_sales_commission_assign": { "apartment_sales_commission_assign_id": $scope.selected[0].apartment_sales_commission_assign_id }
                    }
                },
                DETAIL: {
                    table: "apartment_sales_commission_assign",
                    cm: "detail",
                    dt: {
                        "company": { "company_id": com_id },
                        "apartment_sales_commission_assign": { "apartment_sales_commission_assign_id": $scope.selected[0].apartment_sales_commission_assign_id }
                    }
                }
            }
            let dt = JSON.stringify(request_url.DETAIL.dt)
            UtilityService.getListObjectWithParam(request_url.DELETE.table, request_url.DELETE.cm, dt).then(function (response) {
                if (response.data.err === 0) {
                    $scope.search();
                    $scope.selected = [];
                    swal($filter('translate')('Notice'), $filter('translate')('Delete_Success'), "success");
                } else {
                    swal($filter('translate')('Notice'), $filter('translate')('Delete_Error'), "error");
                }
            })
        });
    } else {
        swal($filter('translate')('Notice'), $filter('translate')('Please_choose_item_to_delete'), "warning");
    }
}