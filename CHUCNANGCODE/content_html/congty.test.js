 /**congty lấy address*/
  //lay thong tin cong ty long/lat

  $scope.json_company = JSON.stringify({
    company: $scope.company //company_id:"40743"
  });
  UtilityService.getListObjectWithParamDev(
    "company",
    "detail",
    $scope.json_company
  ).success(function(response) {
    if (response.err === 0) {
      var company_list = response.dt.company;
      if (item.room_posted_for_sale_id === 0) {
        $scope.it.address = company_list.address;
        $scope.it.longitude = company_list.longitude;
        $scope.it.latitude = company_list.latitude;
      }
    }
  });