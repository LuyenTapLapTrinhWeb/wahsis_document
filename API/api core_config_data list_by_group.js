Request URL: http://pms-dev.wahsis.net/api/core_config_data?
Request Method: POST
Status Code: 200 OK
Remote Address: 125.212.211.168:80
Referrer Policy: no-referrer-when-downgrade
cm: list_by_group
dt: {"company":{"company_id":54744},"core_config_data":{"config_group":"sms_setting"}}

$scope.load_config_value_sms_setting = function () {
    var config = { "config_group": "sms_setting" };
    var dtJSON = JSON.stringify({ "company": { "company_id": com_id }, "core_config_data": config });
    UtilityService.getListObjectWithParam("core_config_data", 'list_by_group', dtJSON).then(function (response) {
        if (response.data.err === 0) {
            $scope.config_value_sms_setting_list = response.data.dt.core_config_data_list;
            if ($scope.config_value_sms_setting_list.length > 0) {
                for (var i = 0; i < $scope.config_value_sms_setting_list.length; i++) {
                    var sms_setting = $scope.config_value_sms_setting_list[i];
                    if (sms_setting.config_key === "sms_setting/reservation_time") {
                        $scope.reservation_time = sms_setting.config_value;
                    }
                    if (sms_setting.config_key === "sms_setting/commitment_type") {
                        $scope.commitment_type = sms_setting.config_value;

                    }
                    if (sms_setting.config_key === "sms_setting/commitment_value") {
                        $scope.commitment_value = sms_setting.config_value;

                    }
                    if (sms_setting.config_key === "sms_setting/term_contract") {
                        $scope.term_contract = sms_setting.config_value;

                    }
                    if (sms_setting.config_key === "sms_setting/overdue_interest") {
                        $scope.overdue_interest = sms_setting.config_value;

                    }
                    if (sms_setting.config_key === "sms_setting/project_code") {
                        $scope.project_code = sms_setting.config_value;

                    }
                    if (sms_setting.config_key === "sms_setting/unit_code") {
                        $scope.unit_code = sms_setting.config_value;
                    }
                    if (sms_setting.config_key === "sms_setting/time_on_warning") {
                        $scope.time_on_warning = sms_setting.config_value;
                    }
                }
            } else {
                console.log("not found core_config_data table")
            }
        }
    });
}
$scope.load_config_value_sms_setting();