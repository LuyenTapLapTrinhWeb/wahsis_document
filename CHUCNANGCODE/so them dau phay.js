//số thêm dấu phẩy trên form add
$scope.ngChangeTotalamount = function(value) {
  $scope.it.total_amount = UtilityCheckFormatService.change_number(value);
};
/**FIX CAI BUG GIAO DIEN HIEN THI DU LIEU */
if (item.room_posted_for_sale_id === 0) {
  $scope.it.total_amount = 0;
}
// số thêm dấu phẩy trên form search list
$scope.ngChangeSothemdauphay = function(value) {
  return UtilityCheckFormatService.change_number(value);
};

{
  /* <td style="white-space: nowrap">{{ngChangeSothemdauphay(item.total_amount)}}</td> */
}

//số thêm dấu phẩy trên form search condition
$scope.ngChangeSothemdauphay = function(loai) {
  var type = {
    acreage: $scope.acreage,
    to_total_amount: $scope.to_total_amount,
    total_amount: $scope.total_amount,
    to_acreage: $scope.to_acreage
  };
  if (loai === "acreage") {
    // acreage
    $scope.acreage = UtilityCheckFormatService.change_so_thap_phan_khong_gioi_han(
      type.acreage
    );
  } else if (loai === "to_total_amount") {
    // to_total_amount
    $scope.to_total_amount = UtilityCheckFormatService.change_so_thap_phan_khong_gioi_han(
      type.to_total_amount
    );
  } else if (loai === "total_amount") {
    // total_amount
    $scope.total_amount = UtilityCheckFormatService.change_so_thap_phan_khong_gioi_han(
      type.total_amount
    );
  } else if (loai === "to_acreage") {
    // to_acreage
    $scope.to_acreage = UtilityCheckFormatService.change_so_thap_phan_khong_gioi_han(
      type.to_acreage
    );
  }
};
{
  /* <input type="text" rows="1" class="form-control" 
onKeyPress='return InputNumberOne1(this, event);' 
ng-change="ngChangeSothemdauphay('to_total_amount')"
ng-model="to_total_amount">
<input type="text" rows="1" class="form-control" 
onKeyPress='return InputNumberOne1(this, event);' 
ng-change="ngChangeSothemdauphay('total_amount')"
ng-model="total_amount">
<input type="text" rows="1" class="form-control" 
onKeyPress='return InputNumberOne1(this, event);' 
ng-change="ngChangeSothemdauphay('to_acreage')"
ng-model="to_acreage">
<input type="text" rows="1" class="form-control" 
onKeyPress='return InputNumberOne1(this, event);' 
ng-change="ngChangeSothemdauphay('acreage')"
ng-model="acreage"> */
}
