$scope.flag = { ngshowUpdate: false, nghideadd: false, ngDisableSaveButton: true }
$scope.showLabel = {};
if (item.apartment_fee_skip_calculate_id !== 0) {

    $scope.dsloaiphicanho = [];
    var json = JSON.stringify({
        company: JSON.parse(JSON.stringify($scope.company)),
        apartment_fee_categories: { "apartment_fee_category_id": $scope.item.apartment_fee_category_id },
        languages: JSON.parse(JSON.stringify($scope.languageTemp))
    });
    UtilityService.getListObjectWithParam("apartment_fee_categories", "detail", json).then(function (response) {
        if (response.data.err === 0) {
            $scope.dsloaiphicanhochitiet = response.data.dt.apartment_fee_categories;
            $scope.dsloaiphicanho.push($scope.dsloaiphicanhochitiet);

        }
    });
    // alert("disableCanHoButton"+$scope.flag.disableCanHoButton)

    $scope.flag.ngshowUpdate = true;
    $scope.showLabel.room_name = $scope.item.room_name;
    $scope.showLabel.months = $scope.item.months;
    $scope.showLabel.years = $scope.item.years;
    $scope.remark = $scope.item.remark;

    $scope.showLabel.apartment_fee_category_name = $scope.item.apartment_fee_category_name;
} else {
    $scope.flag.nghideadd = true;
    $scope.flag.ngshowUpdate = false;
}
/**
    * compare changing with db property
    */
$scope.showLabel.dbRemark = $scope.item.remark;
$scope.ngChangeEnableRemarkByTyping = () => {
    //when update with change something.
    if ($scope.showLabel.dbRemark === $scope.remark) {
        $scope.flag.ngDisableSaveButton = true;
    } else {
        //when changing
        $scope.flag.ngDisableSaveButton = false;
    }

}