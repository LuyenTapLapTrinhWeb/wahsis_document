/** search */

function dichngonngucombobox(list, language_id) {
    var ed_list = [];
    for (x in list) {
        if (list[x].language_id === language_id) {
            var item = { option: list[x].option, value: list[x].value }
            ed_list.push(item);
        }
    }
    return ed_list;
}
$scope.status_list = [
    { "option": "Active", "value": 1, language_id: "en" },
    { "option": "Inactive", "value": 0, language_id: "en" },
    { "option": "Kích hoạt", "value": 1, language_id: "vi" },
    { "option": "Không kích hoạt", "value": 0, language_id: "vi" }
];
$scope.status_list = dichngonngucombobox($scope.status_list, language_id);
//---------------End Call popup------------------------------
$scope.gird_language_translation = function () {
    /**fix cai bug dich ngon ngu trong combobox */
    var language_id = language;
    $scope.status_list = [
        { "option": "Active", "value": 1, language_id: "en" },
        { "option": "Inactive", "value": 0, language_id: "en" },
        { "option": "Kích hoạt", "value": 1, language_id: "vi" },
        { "option": "Không kích hoạt", "value": 0, language_id: "vi" }
    ];
    $scope.status_list = dichngonngucombobox($scope.status_list, language_id);

    // dang sua o day
    $scope.gridOptions.columnDefs[0].displayName = $scope.translation.NO1;
    $scope.gridOptions.columnDefs[1].displayName = $scope.translation.PROVIDER_NAME;
    $scope.gridOptions.columnDefs[2].displayName = $scope.translation.PROVIDER_ADDRESS;
    $scope.gridOptions.columnDefs[3].displayName = $scope.translation.EFFECTIVE_DATE;
    $scope.gridOptions.columnDefs[4].displayName = $scope.translation.CREATED_BY_NAME;
    $scope.gridOptions.columnDefs[5].displayName = $scope.translation.STATUS;
    $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
}
/** edit */
function dichngonngucombobox(list, language_id) {
    var ed_list = [];
    for (x in list) {
        if (list[x].language_id === language_id) {
            var item = { option: list[x].option, value: list[x].value }
            ed_list.push(item);
        }
    }
    return ed_list;
}

/**fix cai bug dich ngon ngu trong combobox */
var language_id = language;
$scope.status_list = [
    { "option": "Active", "value": 1, language_id: "en" },
    { "option": "Inactive", "value": 0, language_id: "en" },
    { "option": "Kích hoạt", "value": 1, language_id: "vi" },
    { "option": "Không kích hoạt", "value": 0, language_id: "vi" }
];
$scope.status_list = dichngonngucombobox($scope.status_list, language);