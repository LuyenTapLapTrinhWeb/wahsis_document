//số thêm dấu phẩy trên form add
$scope.ngChangeSothemdauphay = function(value) {
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

// UtilityService.decentralization( số thêm dấu phẩy trên form search condition )

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
/* tinh toan trong form add new */
$scope.ngChangeSothemdauphay = function (loai) {
  var typing_input = {
      acreage: $scope.it.acreage,
      construction_cost: $scope.it.construction_cost,
      price: $scope.it.price,
      cost_of_land_use_rights: $scope.it.cost_of_land_use_rights,
      total_price: $scope.it.total_price
  };
  if (loai === "acreage") {
      $scope.it.acreage = UtilityCheckFormatService.change_so_thap_phan_khong_gioi_han(typing_input.acreage);
  } else if (loai === "construction_cost") {
      $scope.it.construction_cost = UtilityCheckFormatService.change_so_thap_phan_khong_gioi_han(typing_input.construction_cost);
  } else if (loai === "price") {
      $scope.it.price = UtilityCheckFormatService.change_so_thap_phan_khong_gioi_han(typing_input.price);
  } else if (loai === "cost_of_land_use_rights") {
      $scope.it.cost_of_land_use_rights = UtilityCheckFormatService.change_so_thap_phan_khong_gioi_han(typing_input.cost_of_land_use_rights);
  }
  if ($scope.rooms_detail.room_model === 1) {
      typing_input.total_price = utility.so_tra_ve_binh_thuong(typing_input.acreage) * utility.so_tra_ve_binh_thuong(typing_input.price);
  } else {
      typing_input.total_price = utility.so_tra_ve_binh_thuong(typing_input.construction_cost) + utility.so_tra_ve_binh_thuong(typing_input.cost_of_land_use_rights);
  }
  $scope.it.total_price = UtilityCheckFormatService.change_currency(typing_input.total_price);
};
