$scope.deposit.owner_deposit_amount = $scope.deposit.owner_deposit_total
var dataExchange = JSON.stringify({
    company: {
        company_id: com_id,
        branch_id: 0
    },
    exchange_rate: {
        base_currency: $scope.deposit.owner_currency,
        base_amount: utility.so_tra_ve_binh_thuong($scope.deposit.owner_deposit_amount),
        currency_code: $scope.deposit.currency_code
    }
});
$scope.users = {
    users_id: u_id,
    account_type: account_type
}
UtilityService.getListObjectWithParam($scope.tableExchangeRate, 'exchange', dataExchange).success(function (response) {
    if (response.err === 0) {
        $scope.base_exchange = response.dt.exchange_rate.exchange;
        $scope.deposit.deposit_amount = $scope.base_exchange;
        $scope.deposit.deposit_total = $scope.base_exchange;
        var dataExchange1 = JSON.stringify({
            company: {
                company_id: com_id,
                branch_id: 0
            },
            exchange_rate: {
                base_currency: $scope.deposit.owner_currency,
                base_amount: 1,
                currency_code: $scope.deposit.currency_code
            };
        });
        UtilityService.getListObjectWithParam($scope.tableExchangeRate, 'exchange', dataExchange1).success(function (response) {
            if (response.err === 0) {
                $scope.base_exchange1 = response.dt.exchange_rate.exchange;
                $scope.deposit.exchange_rate = $scope.base_exchange1;
            }
        })
    }
})