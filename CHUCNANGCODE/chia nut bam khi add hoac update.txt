<div class="form-group">
                    <label class="col-md-4 col-xs-12">{{"APARTMENT"|translate}}
                        <span class="c-red">*</span>
                    </label>
                    <!-- disableCanHoButton: -->
                    <!-- <input type="checkbox" ng-model="flag.checked"> -->
                    <div class="col-md-8 col-xs-12" ng-show="flag.nghideadd">
                        <select chosen id="states" class="form-control chosen-select" tabindex="4" ng-model="selected_room" ng-change="ngchangeAPILoaiPhiCanho()"
                            ng-options="obj.room_id as obj.name for obj in roomList" required>
                            <option value="">{{"ALL"|translate}}</option>
                            <option disabled></option>
                        </select>
                        <!-- {{apartment_fee_categories_list}} -->
                    </div>
                    <div class="col-md-8 col-xs-12" ng-show="flag.ngshowUpdate">
                        <span class="lbl_like_input">{{showLabel.room_name}}</span>
                    </div>
                </div>
$scope.flag = { ngshowUpdate: false, nghideadd: false, ngDisableSaveButton: true }
    $scope.showLabel = {};
    if (item.apartment_fee_skip_calculate_id !== 0) {
 
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