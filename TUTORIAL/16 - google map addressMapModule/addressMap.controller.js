function addressMapController($scope, $filter, UtilityService, NgMap) {
    var ctrl = this;
    $scope.apartment = ctrl.apartment
    $scope.tableMaster = 'master';

    // $scope.apartment.latitude = 10.7425856;
    // $scope.apartment.longitude = 106.6822236;

    $scope.clearAddressMap = function () {
        // $scope.apartment.latitude = 10.7425856;
        // $scope.apartment.longitude = 106.6822236;
        // $scope.apartment.room_address = '';
        // NgMap.getMap().then(function (map) {
        //     map.setZoom(3);
        // });
    }
    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD_YQFtQTBAvc0xPKkEStJ55SOumCkKHwY";
    $scope.loadNewLongLat = function (long, lat) {
        $scope.apartment.longitude = long;
        $scope.apartment.latitude = lat;
        NgMap.getMap().then(function (map) {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
            map.setZoom(17);
        });
    };
    $scope.loadNewRoomAddress = function (room_address) {
        if (room_address) {
            $scope.apartment.room_address = room_address;
            change_address_map();
            NgMap.getMap().then(function (map) {
                map.setZoom(17);
            });
        } else {
            $scope.apartment.latitude = "";
            $scope.apartment.longitude = "";
            change_address_map();
            return;
        }
    };
    $scope.change_country = function () {
        if ($scope.apartment.country_id) {
            $scope.master_province = { "parent_id": $scope.apartment.country_id, "master_group": "PROVINCE" }
            $scope.json_province = JSON.stringify({ master_data: JSON.parse(JSON.stringify($scope.master_province)), company: { "company_id": com_id }, languages: { "language_id": language } });
            UtilityService.getListObjectWithParam($scope.tableMaster, 'list_parent', $scope.json_province).then(function (response) {
                // console.log(response, $scope.json_province)
                if (response.data.err === 0) {
                    $scope.province_list = response.data.dt.master_data_list

                }
            });
        }
        /* phan 1: loa map theo country_id */
        if ($scope.apartment.country_id) {
            let request_url = {
                table: "master",
                cm: "detail",
                dt: JSON.stringify({
                    "master_data": {
                        "master_group": 'COUNTRY',
                        "master_data_id": $scope.apartment.country_id ? $scope.apartment.country_id : ''
                    },
                    "languages": { "language_id": language }
                }),
            }
            UtilityService.getListObjectWithParamDev(request_url.table, request_url.cm, request_url.dt).then(function (response) {
                if (response.data.err === 0) {
                    $scope.apartment.country_name = response.data.dt.master_data.master_data_name;
                    $scope.apartment.country_id = response.data.dt.master_data.master_data_id;
                    phan_4_load_building_theo_country_id_state_province_id_city_dictrict_id($scope.apartment.country_id, 0, 0);
                    change_address_map();
                    NgMap.getMap().then(function (map) {
                        map.setZoom(9);
                    });
                }
            });
        } else {
            $scope.apartment.latitude = "";
            $scope.apartment.longitude = "";
            $scope.province_list = [];
            change_address_map();
            console.error('no data $scope.apartment.country_id', $scope.apartment.country_id);
            return;
        }
    }
    $scope.change_province = function () {
        if ($scope.apartment.state_province_id) {
            $scope.languageTemp = { language_id: $scope.language_id }
            $scope.master_district = { "parent_id": $scope.apartment.state_province_id, "master_group": "DISTRICT" }
            $scope.dtJSON = JSON.stringify({ master_data: JSON.parse(JSON.stringify($scope.master_district)), company: { "company_id": com_id }, languages: { "language_id": language } });
            UtilityService.getListObjectWithParam($scope.tableMaster, 'list_parent', $scope.dtJSON).then(function (response) {
                // console.log(response, dtJSON)
                if (response.data.err === 0) {
                    $scope.district_list = response.data.dt.master_data_list
                }
            });
        }
        /* phan 2, load map theo state_province_id */
        if ($scope.apartment.state_province_id) {
            let request_url = {
                table: "master",
                cm: "detail",
                dt: JSON.stringify({
                    "master_data": {
                        "master_group": 'PROVINCE',
                        "master_data_id": $scope.apartment.state_province_id ? $scope.apartment.state_province_id : ''
                    },
                    "languages": { "language_id": language }
                }),

            }
            UtilityService.getListObjectWithParamDev(request_url.table, request_url.cm, request_url.dt).then(function (response) {
                if (response.data.err === 0) {
                    $scope.apartment.state_province_name = response.data.dt.master_data.master_data_name;
                    $scope.apartment.state_province_id = response.data.dt.master_data.master_data_id;
                    phan_4_load_building_theo_country_id_state_province_id_city_dictrict_id($scope.apartment.country_id, $scope.apartment.state_province_id, 0);
                    change_address_map();
                    NgMap.getMap().then(function (map) {
                        map.setZoom(13);
                    });
                }
            });
        } else {
            $scope.apartment.latitude = "";
            $scope.apartment.longitude = "";
            $scope.district_list = [];
            change_address_map();
            console.error('no data $scope.apartment.state_province_id', $scope.apartment.state_province_id);
            return;
        }
    }
    $scope.change_district = function () {
        /* phan 3, load map theo city_dictrict_id */
        if ($scope.apartment.city_dictrict_id) {
            let request_url = {
                table: "master",
                cm: "detail",
                dt: JSON.stringify({
                    "master_data": {
                        "master_group": 'DISTRICT',
                        "master_data_id": $scope.apartment.city_dictrict_id ? $scope.apartment.city_dictrict_id : ''
                    },
                    "languages": { "language_id": language }
                })
            }
            UtilityService.getListObjectWithParamDev(request_url.table, request_url.cm, request_url.dt).then(function (response) {
                if (response.data.err === 0) {
                    $scope.apartment.city_district_name = response.data.dt.master_data.master_data_name;
                    $scope.apartment.city_dictrict_id = response.data.dt.master_data.master_data_id;
                    phan_4_load_building_theo_country_id_state_province_id_city_dictrict_id($scope.apartment.country_id, $scope.apartment.state_province_id, $scope.apartment.city_dictrict_id);
                    change_address_map();
                    NgMap.getMap().then(function (map) {
                        map.setZoom(15);
                    });
                }
            });
        } else {
            $scope.apartment.latitude = "";
            $scope.apartment.longitude = "";

            change_address_map();
            console.error('no data $scope.apartment.city_dictrict_id', $scope.apartment.city_dictrict_id);
            return;
        }
    }
    /* 
        @title company_name
    */
    $scope.change_company_name = function (company_name) {
        $scope.apartment.company_name = company_name;
        console.log("$scope.apartment.company_name", $scope.apartment.company_name)
    }
    /* 
        @title name_address buildings area
        @parameter building_id 
    */
    $scope.change_buildings = function (building_id) {
        let request_url = {
            table: "buildings",
            cm: "list",
            dt: JSON.stringify({
                "buildings": { "country_id": $scope.apartment.country_id }, "languages": { language_id: language }
            })
        }
        UtilityService.getListObjectWithParamDev(request_url.table, request_url.cm, request_url.dt).then(function (response) {
            if (response.data.err === 0) {
                $scope.buildings_list = response.data.dt.buildings_list;
                if (building_id) {
                    for (var building_index in $scope.buildings_list) {
                        var building = $scope.buildings_list[building_index];
                        if (building.building_id === building_id) {
                            $scope.apartment.name_address = building.name_address;
                            $scope.apartment.room_address = building.address;
                            $scope.apartment.country_id = building.country_id;
                            $scope.apartment.state_province_id = building.state;
                            $scope.apartment.city_dictrict_id = building.city;
                            $scope.apartment.longitude = building.default_longitude;
                            $scope.apartment.latitude = building.default_latitude;
                            $scope.apartment.zip_code = building.zip_code;
                            $scope.apartment.unit_name = building.unit_name;
                            break;
                        }
                    }
                    if ($scope.apartment.country_id) {
                        console.log("$scope.apartment.country_id", $scope.apartment.country_id)
                    } else {
                        console.error("$scope.apartment.country_id", $scope.apartment.country_id)
                    }
                    if ($scope.apartment.state_province_id) {
                        console.log("$scope.apartment.state_province_id", $scope.apartment.state_province_id)
                    } else {
                        console.error("$scope.apartment.state_province_id", $scope.apartment.state_province_id)
                    }
                    if ($scope.apartment.city_dictrict_id) {
                        console.log("$scope.apartment.city_dictrict_id", $scope.apartment.city_dictrict_id)
                    } else {
                        console.error("$scope.apartment.city_dictrict_id", $scope.apartment.city_dictrict_id)
                    }
                    /* phan 1: loa map theo country_id */
                    phan_1_load_map_theo_country_id($scope.apartment.country_id, $scope.apartment.state_province_id, $scope.apartment.city_dictrict_id);
                }
            }
        });
    }
    /* 
        @title country_list country_id
    */
    function phan_1_load_map_theo_country_id(country_id, state_province_id, city_dictrict_id) {
        if (country_id) {
            let request_url = {
                table: "master",
                cm: "detail",
                dt: JSON.stringify({
                    "master_data": {
                        "master_group": 'COUNTRY',
                        "master_data_id": country_id ? country_id : ''
                    },
                    "languages": { "language_id": language }
                }),
            }
            UtilityService.getListObjectWithParamDev(request_url.table, request_url.cm, request_url.dt).then(function (response) {
                if (response.data.err === 0) {
                    $scope.apartment.country_name = response.data.dt.master_data.master_data_name;
                    $scope.apartment.country_id = response.data.dt.master_data.master_data_id;
                    /* phan 2, load map theo state_province_id */
                    phan_2_load_map_theo_province_id(country_id, state_province_id, city_dictrict_id);
                }
            });
        } else {
            $scope.apartment.latitude = "";
            $scope.apartment.longitude = "";

            change_address_map();
            console.error('no data $scope.apartment.country_id', $scope.apartment.country_id);
            return;
        }
    }
    /* 
        @title province_list state_province_id city
    */
    function phan_2_load_map_theo_province_id(country_id, state_province_id, city_dictrict_id) {
        if (country_id) {
            $scope.master_province = { "parent_id": country_id, "master_group": "PROVINCE" }
            $scope.json_province = JSON.stringify({ master_data: JSON.parse(JSON.stringify($scope.master_province)), company: { "company_id": com_id }, languages: { "language_id": language } });
            UtilityService.getListObjectWithParam($scope.tableMaster, 'list_parent', $scope.json_province).then(function (response) {
                // console.log(response, $scope.json_province)
                if (response.data.err === 0) {
                    $scope.province_list = response.data.dt.master_data_list;
                    $scope.apartment.state_province_id = state_province_id;
                    if (state_province_id) {
                        let request_url = {
                            table: "master",
                            cm: "detail",
                            dt: JSON.stringify({
                                "master_data": {
                                    "master_group": 'PROVINCE',
                                    "master_data_id": state_province_id ? state_province_id : ''
                                },
                                "languages": { "language_id": language }
                            }),

                        }
                        UtilityService.getListObjectWithParamDev(request_url.table, request_url.cm, request_url.dt).then(function (response) {
                            if (response.data.err === 0) {
                                $scope.apartment.state_province_name = response.data.dt.master_data.master_data_name;
                                $scope.apartment.state_province_id = response.data.dt.master_data.master_data_id;
                                /* phan 3, load map theo city_dictrict_id */
                                phan_3_load_map_theo_district_id(country_id, state_province_id, city_dictrict_id);
                            }
                        });
                    } else {
                        $scope.apartment.latitude = "";
                        $scope.apartment.longitude = "";

                        change_address_map();
                        console.error('no data $scope.apartment.state_province_id', $scope.apartment.state_province_id);
                        return;
                    }
                }
            });
        }
    }
    /* 
        @title district_list city_dictrict_id state
    */
    function phan_3_load_map_theo_district_id(country_id, state_province_id, city_dictrict_id) {
        if (state_province_id) {
            $scope.languageTemp = { language_id: $scope.language_id }
            $scope.master_district = { "parent_id": state_province_id, "master_group": "DISTRICT" }
            $scope.dtJSON = JSON.stringify({ master_data: JSON.parse(JSON.stringify($scope.master_district)), company: { "company_id": com_id }, languages: { "language_id": language } });
            UtilityService.getListObjectWithParam($scope.tableMaster, 'list_parent', $scope.dtJSON).then(function (response) {
                // console.log(response, dtJSON)
                if (response.data.err === 0) {
                    $scope.district_list = response.data.dt.master_data_list;
                    $scope.apartment.city_dictrict_id = city_dictrict_id;
                    if (city_dictrict_id) {
                        let request_url = {
                            table: "master",
                            cm: "detail",
                            dt: JSON.stringify({
                                "master_data": {
                                    "master_group": 'DISTRICT',
                                    "master_data_id": city_dictrict_id ? city_dictrict_id : ''
                                },
                                "languages": { "language_id": language }
                            })
                        }
                        UtilityService.getListObjectWithParamDev(request_url.table, request_url.cm, request_url.dt).then(function (response) {
                            if (response.data.err === 0) {
                                $scope.apartment.city_district_name = response.data.dt.master_data.master_data_name;
                                $scope.apartment.city_dictrict_id = response.data.dt.master_data.master_data_id;
                                phan_4_load_building_theo_country_id_state_province_id_city_dictrict_id(country_id, state_province_id, city_dictrict_id);
                                change_address_map();
                                NgMap.getMap().then(function (map) {
                                    map.setZoom(17);
                                });
                            }
                        });
                    } else {
                        $scope.apartment.latitude = "";
                        $scope.apartment.longitude = "";
                        change_address_map();
                        console.error('no data $scope.apartment.city_dictrict_id', $scope.apartment.city_dictrict_id);
                        return;
                    }
                }
            });
        }
    }
    /* 
       @parameter country_id, state_province_id, city_dictrict_id
   */
    function phan_4_load_building_theo_country_id_state_province_id_city_dictrict_id(country_id, state_province_id, city_dictrict_id) {
        /* phan 4, load building theo city dictrict id */
        let request_url = {
            table: "buildings",
            cm: "list",
            dt: JSON.stringify({
                "buildings": { "country_id": $scope.apartment.country_id }, "languages": { language_id: language }
            })
        }
        UtilityService.getListObjectWithParamDev(request_url.table, request_url.cm, request_url.dt).then(function (response) {
            if (response.data.err === 0) {
                $scope.buildings_list = response.data.dt.buildings_list;
                var buildings_list = angular.copy($scope.buildings_list);
                if (country_id && state_province_id && city_dictrict_id) {
                    buildings_list = [];
                    for (var building_index in $scope.buildings_list) {
                        var building = $scope.buildings_list[building_index];
                        if (country_id === building.country_id) {
                            if (state_province_id === building.state) {
                                if (city_dictrict_id === building.city) {
                                    buildings_list.push(building);
                                }
                            }
                        }
                    }
                    $scope.buildings_list = [];
                    $scope.buildings_list = angular.copy(buildings_list);
                    return buildings_list;
                }
                else if (country_id && state_province_id) {
                    buildings_list = [];
                    for (var building_index in $scope.buildings_list) {
                        var building = $scope.buildings_list[building_index];
                        if (country_id === building.country_id) {
                            if (state_province_id === building.state) {
                                buildings_list.push(building);
                            }
                        }
                    }
                    $scope.buildings_list = [];
                    $scope.buildings_list = angular.copy(buildings_list);
                    return buildings_list;
                }
                else if (country_id) {
                    buildings_list = [];
                    for (var building_index in $scope.buildings_list) {
                        var building = $scope.buildings_list[building_index];
                        if (country_id === building.country_id) {
                            buildings_list.push(building);
                        }
                    }
                    $scope.buildings_list = [];
                    $scope.buildings_list = angular.copy(buildings_list);
                    return buildings_list;
                } else {
                    return buildings_list;
                }
            }
        })
    }
    /* 
        @property room unit_name room_address zip_code longitude latitude
        @description Địa chỉ: Người dùng nhập như thế nào thì giữ nguyên bản, không tự thay đổi.
    */
    function set_room_address() {
        if (!$scope.apartment.room_address && !$scope.apartment.country_id && !$scope.apartment.state_province_id && !$scope.apartment.city_dictrict_id && !$scope.apartment.building_id) {
            $scope.apartment.room_address = "";
        } else if (!$scope.apartment.room_address && !$scope.apartment.country_id && !$scope.apartment.state_province_id && !$scope.apartment.city_dictrict_id) {
            $scope.apartment.room_address = "";
        } else if (!$scope.apartment.room_address && !$scope.apartment.country_id && !$scope.apartment.state_province_id) {
            $scope.apartment.room_address = "";
        } else if (!$scope.apartment.room_address && !$scope.apartment.country_id) {
            $scope.apartment.room_address = "";
        } else if (!$scope.apartment.room_address) {
            $scope.apartment.room_address = "";
        } else {
            $scope.apartment.room_address = $scope.apartment.room_address ? result.formatted_address : "";
        }
    }
    function change_address_map() {
        var address = "";
        if ($scope.apartment.room_address && $scope.apartment.city_district_name && $scope.apartment.state_province_name && $scope.apartment.country_name) {
            address = `${$scope.apartment.room_address},${$scope.apartment.city_district_name},${$scope.apartment.state_province_name},${$scope.apartment.country_name}`// + $scope.apartment.country_id;
        } else if ($scope.apartment.room_address && $scope.apartment.state_province_name && $scope.apartment.country_name) {
            address = `${$scope.apartment.room_address},${$scope.apartment.state_province_name},${$scope.apartment.country_name}`// + $scope.apartment.country_id;
        } else if ($scope.apartment.room_address && $scope.apartment.country_name) {
            address = `${$scope.apartment.room_address},${$scope.apartment.country_name}`// + $scope.apartment.country_id;
        } else if ($scope.apartment.city_district_name && $scope.apartment.state_province_name && $scope.apartment.country_name) {
            address = `${$scope.apartment.city_district_name},${$scope.apartment.state_province_name},${$scope.apartment.country_name}`// + $scope.apartment.country_id;
        } else if ($scope.apartment.state_province_name && $scope.apartment.country_name) {
            address = `${$scope.apartment.state_province_name},${$scope.apartment.country_name}`// + $scope.apartment.country_id;
        } else if ($scope.apartment.country_name) {
            address = `${$scope.apartment.country_name}`// + $scope.apartment.country_id;
        } else {
            address = `${$scope.apartment.room_address}`// + $scope.apartment.country_id;
        }
        if (utility.isNull(address)) {
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'address': address
            }, function (results_list, status, response) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results_list && results_list.length) {
                        for (var x in results_list) {
                            var result = results_list[x];
                            // set_room_address();
                            $scope.apartment.zip_code = $scope.apartment.zip_code ? $scope.apartment.zip_code : '';
                            $scope.apartment.unit_name = $scope.apartment.unit_name ? $scope.apartment.unit_name : '';
                            $scope.apartment.longitude = result.geometry.location.lng();
                            $scope.apartment.latitude = result.geometry.location.lat();
                            /* 
                                @property area
                            */
                            $scope.apartment.building_id = $scope.apartment.building_id ? $scope.apartment.building_id : 0;
                            $scope.apartment.name_address = $scope.apartment.name_address ? $scope.apartment.name_address : 0;
                            /* 
                                @property country
                            */
                            $scope.apartment.country_id = $scope.apartment.country_id ? $scope.apartment.country_id : "";
                            $scope.apartment.country_name = $scope.apartment.country_name ? $scope.apartment.country_name : "";
                            /* 
                                @property province
                            */
                            $scope.apartment.state_province_id = $scope.apartment.state_province_id ? $scope.apartment.state_province_id : "";
                            $scope.apartment.state_province_name = $scope.apartment.state_province_name ? $scope.apartment.state_province_name : "";
                            /* 
                                @property district
                            */
                            $scope.apartment.city_dictrict_id = $scope.apartment.city_dictrict_id ? $scope.apartment.city_dictrict_id : "";
                            $scope.apartment.city_district_name = $scope.apartment.city_district_name ? $scope.apartment.city_district_name : "";
                            /* 
                                @property company
                            */
                            $scope.apartment.company_name = $scope.apartment.company_name ? $scope.apartment.company_name : "";
                            break;
                        }

                    }
                } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
                    swal($filter("translate")("Notice"), $filter("translate")("STATUS_GEOCODE_RESULTS") + $filter("translate")("ZERO_RESULTS"), "success");
                    console.error($filter("translate")("STATUS_GEOCODE_RESULTS") + $filter("translate")("ZERO_RESULTS"));
                    $scope.apartment.latitude = "";
                    $scope.apartment.longitude = "";
                } else {
                    // swal($filter("translate")("Notice"), $filter("translate")("STATUS_GEOCODE_RESULTS") + $filter("translate")("UNKNOW_ERRO"), "success");
                    console.error($filter("translate")("STATUS_GEOCODE_RESULTS") + $filter("translate")("ERROR"));
                    $scope.apartment.latitude = "";
                    $scope.apartment.longitude = "";
                }
            });
        }
    }

    $scope.getpos = function (event) {
        $scope.apartment.latitude = event.latLng.lat();
        $scope.apartment.longitude = event.latLng.lng();
    };
    function set_location_list_default_editing() {
        $scope.language_temp = { language_id: language }
        $scope.master_country = { master_group: 'COUNTRY' };
        $scope.json_country = JSON.stringify({ master_data: JSON.parse(JSON.stringify($scope.master_country)), company: { "company_id": com_id }, languages: { "language_id": language } });
        UtilityService.getListObjectWithParam($scope.tableMaster, 'list', $scope.json_country).then(function (response) {
            // console.log($scope.json_country, response)
            if (response.data.err === 0) {
                $scope.country_list = response.data.dt.master_data_list;
                if ($scope.apartment.country_id) {
                    $scope.master_province = { "parent_id": $scope.apartment.country_id ? $scope.apartment.country_id : $scope.country_list[0].country_id, "master_group": "PROVINCE" }
                    $scope.json_province = JSON.stringify({ master_data: JSON.parse(JSON.stringify($scope.master_province)), company: { "company_id": com_id }, languages: { "language_id": language } });
                    UtilityService.getListObjectWithParam($scope.tableMaster, 'list_parent', $scope.json_province).then(function (response) {
                        // console.log(response, $scope.json_province)
                        if (response.data.err === 0) {
                            $scope.province_list = response.data.dt.master_data_list
                            if ($scope.apartment.state_province_id) {
                                $scope.languageTemp = { language_id: $scope.language_id }
                                $scope.master_district = { "parent_id": $scope.apartment.state_province_id, "master_group": "DISTRICT" }
                                $scope.dtJSON = JSON.stringify({ master_data: JSON.parse(JSON.stringify($scope.master_district)), company: { "company_id": com_id }, languages: { "language_id": language } });
                                UtilityService.getListObjectWithParam($scope.tableMaster, 'list_parent', $scope.dtJSON).then(function (response) {
                                    // console.log(response, dtJSON)
                                    if (response.data.err === 0) {
                                        $scope.district_list = response.data.dt.master_data_list
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }
    function set_location_list_default_adding() {
        $scope.language_temp = { language_id: language }
        $scope.master_country = { master_group: 'COUNTRY' };
        $scope.json_country = JSON.stringify({ master_data: JSON.parse(JSON.stringify($scope.master_country)), company: { "company_id": com_id }, languages: { "language_id": language } });
        UtilityService.getListObjectWithParam($scope.tableMaster, 'list', $scope.json_country).then(function (response) {
            // console.log($scope.json_country, response)
            if (response.data.err === 0) {
                $scope.country_list = response.data.dt.master_data_list;
                if ($scope.country_list && $scope.country_list.length) {
                    for (var country_index in $scope.country_list) {
                        var country = $scope.country_list[country_index];
                        if (country.master_data_id.toLowerCase() === "vn") {
                            $scope.apartment.country_id = country.master_data_id;
                            $scope.apartment.country_name = country.master_data_name;
                        }
                    }
                }
                if ($scope.apartment.country_id) {
                    $scope.master_province = { "parent_id": $scope.apartment.country_id ? $scope.apartment.country_id : $scope.country_list[0].country_id, "master_group": "PROVINCE" }
                    $scope.json_province = JSON.stringify({ master_data: JSON.parse(JSON.stringify($scope.master_province)), company: { "company_id": com_id }, languages: { "language_id": language } });
                    UtilityService.getListObjectWithParam($scope.tableMaster, 'list_parent', $scope.json_province).then(function (response) {
                        // console.log(response, $scope.json_province)
                        if (response.data.err === 0) {
                            $scope.province_list = response.data.dt.master_data_list
                            if ($scope.province_list && $scope.province_list.length) {
                                for (var province_index in $scope.province_list) {
                                    var province = $scope.province_list[province_index];
                                    if (parseInt(province.master_data_id.toLowerCase()) === 79) {
                                        $scope.apartment.state_province_id = province.master_data_id;
                                        $scope.apartment.state_province_name = province.master_data_name;
                                    }
                                }
                                if ($scope.apartment.state_province_id) {
                                    $scope.languageTemp = { language_id: $scope.language_id }
                                    $scope.master_district = { "parent_id": $scope.apartment.state_province_id ? $scope.apartment.state_province_id : $scope.province_list[1].state_province_id, "master_group": "DISTRICT" }
                                    $scope.dtJSON = JSON.stringify({ master_data: JSON.parse(JSON.stringify($scope.master_district)), company: { "company_id": com_id }, languages: { "language_id": language } });
                                    UtilityService.getListObjectWithParam($scope.tableMaster, 'list_parent', $scope.dtJSON).then(function (response) {
                                        // console.log(response, dtJSON)
                                        if (response.data.err === 0) {
                                            $scope.district_list = response.data.dt.master_data_list
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
        });
    }
    function set_language_default() {
        $scope.json_language = JSON.stringify({ company: { "company_id": com_id }, languages: { "language_id": language } });
        UtilityService.getListObjectWithParam("languages", 'list', $scope.json_language).then(function (response) {
            // console.log($scope.json_country, response)
            if (response.data.err === 0) {
                $scope.languages_list = response.data.dt.languages_list;
                $scope.language_id = language;
            }
        });
    }
    $scope.$watch(
        function ($scope) {
            return $scope.abc = $filter('translate')('NOTE_FORMAT1')
        },
        function () {
            $scope.map = true;
            set_language_default();
            if (!$scope.apartment.room_id == 0) {
                /* editing */
                NgMap.getMap().then(function (map) {
                    var center = map.getCenter();
                    google.maps.event.trigger(map, "resize");
                    map.setZoom(17);
                    map.setCenter(center);
                    set_location_list_default_editing();
                });
            } else {
                /* adding default position map */
                $scope.apartment.latitude = '10.8230989';
                $scope.apartment.longitude = '106.6296638';
                NgMap.getMap().then(function (map) {
                    var center = map.getCenter();
                    google.maps.event.trigger(map, "resize");
                    map.setZoom(13);
                    map.setCenter(center);
                    set_location_list_default_adding();
                });
            }
        }
    );
}