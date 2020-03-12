// ------list
$scope.gender = [{ value: 1, option: $filter("translate")("MALE") }, { value: 0, option: $filter("translate")("FEMALE") }, { value: 3, option: $filter("translate")("OTHER") }]
$scope.gender_list = [{ value: 1, name: $filter('translate')('MALE') }, { value: 0, name: $filter('translate')('FEMALE') }, { value: 3, name: $filter('translate')('Other') }];
// ------update gender name
$scope.get_gender_name = function (gender_id) {
    let gender_name = "";
    $scope.gender_list.forEach(function (gender) {
        if (gender_id === gender.value) {
            gender_name = gender.name;
        }
    });
    return gender_name
}
    // --------html
    `ng-model = 'sex'`