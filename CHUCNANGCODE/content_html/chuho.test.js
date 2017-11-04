  /**search.chu ho cho thue dang ban
   * http://pms-dev.wahsis.net/api/
      owners?cm=list_owners_by_room_id&dt={"rooms":{"room_id":9},"company":{"company_id":40743}}
  */
  $scope.json_chuho = JSON.stringify({
    rooms: $scope.it.owner_id,
    company: $scope.company //company_id:"40743"
  });
  UtilityService.getListObjectWithParam(
    "owners",
    "list_owners_by_room_id",
    $scope.json_chuho
  ).success(function(response) {
    // console.log(response, $scope.json_room)
    if (response.err === 0) {
      $scope.owners_list = response.dt.owners_list;
    }
  });