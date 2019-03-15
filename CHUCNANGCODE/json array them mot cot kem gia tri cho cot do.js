$scope.config_value = [];
$scope.core_config_data = [];
function getData() {
    $http.get(API_URL_PARTNER + 'core_config_data?cm=detail_by_key&dt={"company":{"company_id":' + $routeParams.company_id + '},"core_config_data":{"config_key":"mobile_app_setting/main_screen"}}').success(function (response) {
        utility.check_error403(response.err)
        if (response.err === 0) {
            $scope.core_config_data = response.dt.core_config_data;
            if ($scope.core_config_data !== null && $scope.core_config_data !== undefined) {
                //Them cot title vao trong json array
                $scope.core_config_data.config_value = JSON.parse($scope.core_config_data.config_value);
                for (var i = 0; i < $scope.core_config_data.config_value.length; i++) {
                    switch ($scope.core_config_data.config_value[i].id) {
                        case "is_information": { $scope.core_config_data.config_value[i].title = "INFORMATION"; break; }
                        case "is_amenities": { $scope.core_config_data.config_value[i].title = "AMENITIES"; break; }
                        case "is_notifications": { $scope.core_config_data.config_value[i].title = "NOTIFICATIONS"; break; }
                        case "is_monthlybills": { $scope.core_config_data.config_value[i].title = "MONTHLY BILLS"; break; }
                        case "is_comments": { $scope.core_config_data.config_value[i].title = "COMMENTS"; break; }
                        case "is_leasingservices": { $scope.core_config_data.config_value[i].title = "LEASING SERVICES"; break; }
                        case "is_smartaccess": { $scope.core_config_data.config_value[i].title = "SMART ACCESS"; break; }
                        case "is_smartcontroll": { $scope.core_config_data.config_value[i].title = "SMART CONTROLS"; break; }
                        case "is_lookforsale": { $scope.core_config_data.config_value[i].title = "LOOK FOR SALE"; break; }
                        case "is_lookforrent": { $scope.core_config_data.config_value[i].title = "LOOK FOR RENT"; break; }
                        case "is_forsale": { $scope.core_config_data.config_value[i].title = "FOR SALE"; break; }
                        case "is_forrent": { $scope.core_config_data.config_value[i].title = "FOR RENT"; break; }
                        case "is_news": { $scope.core_config_data.config_value[i].title = "NEWS & EVENTS"; break; }
                        case "is_camera": { $scope.core_config_data.config_value[i].title = "CAMERA"; break; }
                    }
                }
                $scope.config_value = $scope.core_config_data.config_value;
                // console.table($scope.core_config_data.config_value);
            }
        }
    });
}