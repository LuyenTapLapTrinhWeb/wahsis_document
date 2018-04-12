/* RADIO BUTTON */
<div class="col-md-4 col-sm-6 col-xs-12 truong_search marginBot5" ng-repeat="i in typeList">
    <div class="row">
        <label class="col-md-5 col-sm-5 col-xs-12">{{ i.name }}</label>
        <div class="col-md-7 col-sm-7 col-xs-12">
            <input id="{{i.value}}" ng-change="changeType()" type="radio" name="radioTest" ng-model="$parent.report_type_id" ng-value="i.value">
    </div>
        </div>
    </div>
    $scope.$watch(function ($scope) {
        return $scope.abc = $filter('translate')('NOTE_FORMAT1')
    }, function () {
        $scope.typeList = [{ value: "total", name: $filter('translate')('total_report') }, { value: "detail", name: $filter('translate')('DETAIL') }];
    });