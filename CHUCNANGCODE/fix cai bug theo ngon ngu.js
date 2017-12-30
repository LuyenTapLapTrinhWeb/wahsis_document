<div class="col-xs-12 col-sm-4">
    <div class="form-group">
        <label class="col-xs-5">{{ "LANGUAGE"| translate }}</label>
        <div class="col-xs-7">
            <select type="text" id="states" chosen class="form-control" ng-model="language_id" ng-change="change_language()" ng-options="obj.language_id  as obj.language_name for obj in languages_list">
                <option value="" disabled>{{ "CHOOSE_LANGUAGE"| translate }}</option>
            </select>
        </div>
    </div>
</div>
UtilityService.getListObject("languages", language).success(function (response) { if (response.err === 0) { $scope.languages_list = response.dt.languages_list; $rootScope.language_popup = $scope.language_id } });
function openPopup() { var modalInstance = $uibModal.open({ resolve: { language_id: () => { return $scope.language_id } } }) }
function crud_apartment_fee_group(language_id) {
    /**Có thể sử dụng ở đây */
    $scope.languageTemp = { language_id: language_id };
    /**Hoặc sử dụng ở đây */
     
    $scope.dtObject = JSON.stringify({
        apartment_fee_group: JSON.parse(JSON.stringify($scope.data)),
        company: JSON.parse(JSON.stringify($scope.company)),
        languages: JSON.parse(JSON.stringify( $scope.languageTemp))
      });
}


