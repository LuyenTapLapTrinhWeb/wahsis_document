
$scope.master_data_name = "";
$scope.master_group_id = "";
if (utility.checkValue($scope.master_group_id)) {
    $scope.master_group_id = master_group_id;
} else {
    swal($filter("translate")("no_data"), $filter("translate")("no_data"), "warning");
}

/**object search */
$scope.str_search = {
    master_data_name: "",
    group_id: $scope.master_group_id /**FROM ID + CONTROLLER POPUP */
};
/**dataJson search */
$scope.dataJson = JSON.stringify({
    master_data: $scope.str_search,
    company: { company_id: com_id },
    languages: { language_id: getString($scope.language_id) }
});
var dt = $scope.dataJson;

UtilityService.getListObjectWithParam("master", "search", dt).then(function (
    response
) {
    // console.log("setup_master_data",response);
    utility.check_error403(response.err);
    if (response.data.err === 0) {
        $scope.master_data_list = response.data.dt.master_data_list;
        /**DICH NGON NGU THEO COMBOBOX LANGUAGE */
        var ed_list = utility.getArray($scope.master_data_list);
        for (x in ed_list) {
            /**thu: "Thu", chi: "Chi" */
            ed_list[x].freefield1 = $scope.dich_ngon_ngu(getString(ed_list[x].freefield1));
        }
        $scope.master_data_list = ed_list;

        console.log($scope.master_data_list);
    }
});
