Request URL: http://pms-dev.wahsis.net/api/core_config_data?
Request Method: POST
Status Code: 200 OK
Remote Address: 125.212.211.168:80
Referrer Policy: no-referrer-when-downgrade
cm: add
dt: {"core_config_data_list":[{"branch_id":0,"config_key":"sms_setting/reservation_time","config_value":"3","config_group":"sms_setting","description":"Thời gian đặt chỗ"},{"branch_id":0,"config_key":"sms_setting/commitment_type","config_value":"percent","config_group":"sms_setting","description":""},{"branch_id":0,"config_key":"sms_setting/commitment_value","config_value":"5","config_group":"sms_setting","description":""},{"branch_id":0,"config_key":"sms_setting/term_contract","config_value":"30","config_group":"sms_setting","description":""},{"branch_id":0,"config_key":"sms_setting/overdue_interest","config_value":"1","config_group":"sms_setting","description":""},{"branch_id":0,"config_key":"sms_setting/project_code","config_value":"107","config_group":"sms_setting","description":""},{"branch_id":0,"config_key":"sms_setting/unit_code","config_value":"1","config_group":"sms_setting","description":""},{"branch_id":0,"config_key":"sms_setting/time_on_warning","config_value":"5","config_group":"sms_setting","description":"Thời gian cảnh báo"}],"company":{"company_id":54744}}

$scope.save = function () {
    $rootScope.checkLogout()
    if ($scope.branch_id === undefined || $scope.branch_id === "")
        $scope.branch_id = 0;
    if ($scope.reservation_time !== undefined && $scope.reservation_time !== "") {
        if (parseInt($scope.reservation_time) > 24) {
            utility.notify("Notice ", "Reservation time must be smaller than 25", "warning");
            return;
        }
    }
    $scope.array_config = [];
    $scope.array_config.push({
        branch_id: $scope.branch_id,
        config_key: "sms_setting/reservation_time",
        config_value: $scope.reservation_time,
        config_group: "sms_setting",
        description: "Thời gian đặt chỗ"
    });
    $scope.array_config.push({
        branch_id: $scope.branch_id,
        config_key: "sms_setting/commitment_type",
        config_value: $scope.commitment_type,
        config_group: "sms_setting",
        description: ""
    });
    $scope.array_config.push({
        branch_id: $scope.branch_id,
        config_key: "sms_setting/commitment_value",
        config_value: $scope.commitment_value,
        config_group: "sms_setting",
        description: ""
    });
    $scope.array_config.push({
        branch_id: $scope.branch_id,
        config_key: "sms_setting/term_contract",
        config_value: $scope.term_contract,
        config_group: "sms_setting",
        description: ""
    });
    $scope.array_config.push({
        branch_id: $scope.branch_id,
        config_key: "sms_setting/overdue_interest",
        config_value: $scope.overdue_interest,
        config_group: "sms_setting",
        description: ""
    });
    $scope.array_config.push({
        branch_id: $scope.branch_id,
        config_key: "sms_setting/project_code",
        config_value: $scope.project_code,
        config_group: "sms_setting",
        description: ""
    });
    $scope.array_config.push({
        branch_id: $scope.branch_id,
        config_key: "sms_setting/unit_code",
        config_value: $scope.unit_code,
        config_group: "sms_setting",
        description: ""
    });
    $scope.array_config.push({
        branch_id: $scope.branch_id,
        config_key: "sms_setting/time_on_warning",
        config_value: $scope.time_on_warning,
        config_group: "sms_setting",
        description: "Thời gian cảnh báo"
    });
    var dt = JSON.stringify({ core_config_data_list: JSON.parse(JSON.stringify($scope.array_config)), company: JSON.parse(JSON.stringify($scope.company)) });
    UtilityService.addObject($scope.tableCoreConfig, dt).then(function (response) {
        // console.log(dt)
        if (response.data.err === 0) {
            swal({ title: $filter("translate")("SUCCESS"), text: $filter("translate")("Save_Success"), timer: 2000, type: "success" });
        } else {
            Notify('Error.', 'top-right', '5000', 'red', 'fa-check', true);
        }
    });
};