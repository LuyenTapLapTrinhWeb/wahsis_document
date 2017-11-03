//số thêm dấu phẩy trên form add
  $scope.ngChangeTotalamount = function(value) {
    $scope.it.total_amount = UtilityCheckFormatService.change_number(value);
  };
/**FIX CAI BUG GIAO DIEN HIEN THI DU LIEU */
  if (item.room_posted_for_sale_id === 0) {
     
    $scope.it.total_amount = 0;
  }  
// số thêm dấu phẩy trên form search
$scope.ngChangeTotalamount = function(value) {
  return UtilityCheckFormatService.change_number(value);
};
<td style="white-space: nowrap">{{ngChangeTotalamount(item.total_amount)}}</td>
