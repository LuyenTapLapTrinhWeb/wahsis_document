<!-- room -->
<div class="form-group">
<label>{{"RI_ROOM"|translate}}</label>
<span class="c-red">*</span>
<div ng-show="flag.ngshowCanhoSelect">
 
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

/**TRUONG HOP CHI SHOW SELECT LANGUAGE EDIT VA DISABLE LANGUAGE ADD */
<div ng-show="flag.ngdisableCanhoselect">
<div class="fg-line">
    <label class="col-md-2 control-label">{{lang.LANGUAGE_ID}}
        <span class="c-red">*</span>
    </label>
    <div class="col-md-4">
        <select ng-model="it.language_id" ng-options="x.language_id as x.language_name for x in languages_list" class=" a" ng-disabled="stt_search">
            <option value="" disabled>--Choose language--</option>
        </select>
    </div>
</div>
</div>

/**CHIA NUT BAM KHI ADD HOAC UPDATE */
        $scope.flag = {};
        if (item.user_guide_id !== 0) {
            $scope.flag.ngdisableCanhoselect = true;
            $scope.flag.ngshowCanhoSelect = false;
        } else {
            $scope.flag.ngshowCanhoSelect = true;
        }