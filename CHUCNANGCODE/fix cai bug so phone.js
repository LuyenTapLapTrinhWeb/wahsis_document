if ($scope.countryList && $scope.countryList.length > 0) {
    for (var i = 0; i < $scope.countryList.length; i++) {
        if ($scope.countryList[i].master_data_id === 'VN') {
            $scope.deposit.owner_area_code = $scope.countryList[i].freefield3;
            let count_owner_area_code = utility.count_occurrences_owner_area_code(deposit.owner_deposit_phone, $scope.deposit.owner_area_code);
            if ($scope.deposit.owner_deposit_phone && count_owner_area_code === 1) {
                $scope.deposit.owner_deposit_phone = utility.hien_thi_so_phone_khi_update(deposit.owner_deposit_phone, $scope.deposit.owner_area_code);
            }
            if ($scope.reservation.owner_phone) {
                $scope.deposit.owner_deposit_phone = $scope.reservation.owner_phone;
            } else {
                $scope.deposit.owner_deposit_phone = utility.hien_thi_so_phone_khi_update(deposit.owner_deposit_phone, $scope.deposit.owner_area_code);
            }
            break;
        }
    }
} else {
    console.error("not found $scope.countryList", $scope.countryList)
}