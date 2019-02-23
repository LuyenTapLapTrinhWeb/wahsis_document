Request URL: http://pms-dev.wahsis.net/api/core_config_data?
Request Method: POST
Status Code: 200 OK
Remote Address: 125.212.211.168:80
Referrer Policy: no-referrer-when-downgrade
cm: list_by_group
dt: {"company":{"company_id":54744},"core_config_data":{"config_group":"sms_setting"}}

$scope.loadInfo = function () {
    var config = { config_group: "sms_setting" };
    var dtJSON = JSON.stringify({ company: JSON.parse(JSON.stringify($scope.company)), core_config_data: JSON.parse(JSON.stringify(config)) });
    UtilityService.getListObjectWithParam($scope.tableCoreConfig, 'list_by_group', dtJSON).then(function (response) {
        if (response.data.err === 0) {
            $scope.items = response.data.dt.core_config_data_list;
            // console.log($scope.items);
            if ($scope.items.length > 0) {
                for (var i = 0; i < $scope.items.length; i++) {
                    if ($scope.items[i].config_key === "sms_setting/reservation_time") {
                        $scope.reservation_time = $scope.items[i].config_value;

                    }
                    if ($scope.items[i].config_key === "sms_setting/commitment_type") {
                        $scope.commitment_type = $scope.items[i].config_value;

                    }
                    if ($scope.items[i].config_key === "sms_setting/commitment_value") {
                        $scope.commitment_value = $scope.items[i].config_value;

                    }
                    if ($scope.items[i].config_key === "sms_setting/term_contract") {
                        $scope.term_contract = $scope.items[i].config_value;

                    }
                    if ($scope.items[i].config_key === "sms_setting/overdue_interest") {
                        $scope.overdue_interest = $scope.items[i].config_value;

                    }
                    if ($scope.items[i].config_key === "sms_setting/project_code") {
                        $scope.project_code = $scope.items[i].config_value;

                    }
                    if ($scope.items[i].config_key === "sms_setting/unit_code") {
                        $scope.unit_code = $scope.items[i].config_value;
                    }
                    if ($scope.items[i].config_key === "sms_setting/time_on_warning") {
                        $scope.time_on_warning = $scope.items[i].config_value;
                    }
                }
            }
        }
    });
}