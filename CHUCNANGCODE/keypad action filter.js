function convertToKeypadActionDeviceType(keypad_action_device_list, device_type) {
    if (keypad_action_device_list.length) {
        keypad_action_device_list.forEach(function (element) {
            let keypad_action_device = { "keypad_action_device_id": 0, "keypad_action_device_name": "" };
            switch (device_type) {
                case 1: {
                    light = element
                    keypad_action_device.keypad_action_device_id = light.light_id;
                    keypad_action_device.keypad_action_device_name = light.light_name;
                } break;
                case 2: {
                    air_conditioner = element
                    keypad_action_device.keypad_action_device_id = air_conditioner.air_conditioner_id;
                    keypad_action_device.keypad_action_device_name = air_conditioner.air_conditioner_name;
                } break;
                case 3: {
                    curtain = element
                    keypad_action_device.keypad_action_device_id = curtain.curtain_id;
                    keypad_action_device.keypad_action_device_name = curtain.curtain_name;
                } break;
                case 4: {
                    television = element
                    keypad_action_device.keypad_action_device_id = television.id;
                    keypad_action_device.keypad_action_device_name = television.name;
                } break;
                default: {
                    keypad_action_device.keypad_action_device_id = 0;
                    keypad_action_device.keypad_action_device_name = "television.name"
                };
            }
            keypad_action_device_result_list.push(keypad_action_device)
        });
    }
    return keypad_action_device_result_list;
}
function GetDeviceNameByDeviceType(device_name, area_id, device_type, keypad_action) {
    let request_url = {
        /* /smart/api/v3/television/areas/12?company_id=40743 */
        uri: `${device_name}/areas/${area_id}`,
    }
    console.log("request_url.uri", request_url)
    UtilityIoTService.getListObject(request_url.uri).then(function success(response) {
        if (response.status === 200) {
            console.log(response)
            switch (device_type) {
                case 1: { $scope.keypad_action_device_list = convertToKeypadActionDeviceType(response.data.dt ? response.data.dt : [], device_type); } break;
                case 2: { $scope.keypad_action_device_list = convertToKeypadActionDeviceType(response.data.dt ? response.data.dt : [], device_type); } break;
                case 3: { $scope.keypad_action_device_list = convertToKeypadActionDeviceType(response.data ? response.data : [], device_type); } break;
                case 4: { $scope.keypad_action_device_list = convertToKeypadActionDeviceType(response.data ? response.data : [], device_type); } break;
                default: $scope.keypad_action_device_list = [];
            }
            if ($scope.keypad_action_device_list.length) {
                $scope.keypad_action_device_list.forEach(function (element) {
                    keypad_action_device = element
                    if (keypad_action_device.keypad_action_device_id === keypad_action.device_id) {
                        keypad_action.device_name = keypad_action_device.keypad_action_device_name;
                    }
                })
                console.table("$scope.keypad_action_device_list", $scope.keypad_action_device_list)
            } else {
                console.error("$scope.keypad_action_device_list", $scope.keypad_action_device_list)
            }
        } else {
            console.error(response)
        }
    }, function error(response) {
        console.error(`${response.data.err}: ${response.data.msg}`)
    });
}
function get_success(response) {
    console.table("$scope.keypad_action_list", $scope.keypad_action_list)
    if (response.data.dt) {
        $scope.keypad_action_list = response.data.dt;
        $scope.keypad_action_list.forEach(function (element) {
            keypad_action = element;
            $scope.keypad_action_device_type_list.forEach(function (element) {
                keypad_action_device_type = element
                if (keypad_action_device_type.keypad_action_device_type_id === keypad_action.device_type) {
                    keypad_action.device_type_name = keypad_action_device_type.keypad_action_device_type_name;
                }
            });
            switch (element.device_type) {
                case 1: {
                    // GetDeviceNameByDeviceType("light", $rootScope.area_id, element.device_type, keypad_action);
                    $scope.keypad_button_action_light_list.forEach(function (element) {
                        light = element
                        if (light.keypad_action_type_id === keypad_action.action) {
                            keypad_action.action_name = light.keypad_action_type_name;
                        }
                    })
                } break;
                case 2: {
                    // GetDeviceNameByDeviceType("air_conditioner", $rootScope.area_id, element.device_type, keypad_action);
                    $scope.keypad_button_action_air_conditioner_list.forEach(function (element) {
                        air_conditioner = element
                        if (air_conditioner.keypad_action_type_id === keypad_action.action) {
                            keypad_action.action_name = air_conditioner.keypad_action_type_name;
                        }
                    })
                } break;
                case 3: {
                    // GetDeviceNameByDeviceType("curtain", $rootScope.area_id, element.device_type, keypad_action);
                    $scope.keypad_button_action_curtain_list.forEach(function (element) {
                        curtain = element
                        if (curtain.keypad_action_type_id === keypad_action.action) {
                            keypad_action.action_name = curtain.keypad_action_type_name;
                        }
                    })
                } break;
                case 4: {
                    // GetDeviceNameByDeviceType("television", $rootScope.area_id, element.device_type, keypad_action);
                    $scope.keypad_button_action_television_list.forEach(function (element) {
                        television = element
                        if (television.keypad_action_type_id === keypad_action.action) {
                            keypad_action.action_name = television.keypad_action_type_name;
                        }
                    })
                } break;
                default: device_name = "undefined";
            }
        });
        $scope.total_page = 1;
        $scope.total_row = response.data.length;
        $scope.list_page = [];
        for (var i = 1; i <= $scope.total_page; i++) {
            var j = { val: "", test: "" };
            j.val = i;
            j.test = i;
            $scope.list_page.push(j);
        }
    } else {
        $scope.keypad_action_list = [];
    }
}