<!-- room -->
<div class="form-group">
<label>{{"RI_ROOM"|translate}}</label>
<span class="c-red">*</span>
<div class="lbl_like_input" ng-show="flag.ngshowCanhoSelect">
 
</div>
<div class="lbl_like_input" ng-show="flag.ngdisableCanhoselect">
    <p>{{room_name}}</p>
</div>
</div>
<!-- ./room -->
/**CHIA NUT BAM KHI ADD HOAC UPDATE */
$scope.flag = {};
if (item.apartment_fee_skip_calculate_id !== 0) {
$scope.flag.ngdisableCanhoselect = true;
$scope.flag.ngshowCanhoSelect = false;
} else {
$scope.flag.ngshowCanhoSelect = true;
}