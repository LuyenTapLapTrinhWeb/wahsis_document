function addressMapController($scope, $filter, UtilityService, NgMap) {
    $scope.tableMaster = 'master';
    $scope.it = {
        latitude: 10.7425856,
        longitude: 106.6822236,
    };
    $scope.clearAddressMap = function () {
        $scope.it = {
            latitude: 10.7425856,
            longitude: 106.6822236,
        };
        $scope.it.room_address = '';
        NgMap.getMap().then(function (map) {
            map.setZoom(3);
        });
    }
    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD_YQFtQTBAvc0xPKkEStJ55SOumCkKHwY";
    $scope.loadNewLongLat = function (long, lat) {
        $scope.it.longitude = long;
        $scope.it.latitude = lat;
    };
    $scope.loadNewRoomAddress = function (room_address) {
        if (room_address) {
            $scope.it.room_address = room_address;
            change_address_map();
        } else {
            $scope.it.latitude = "";
            $scope.it.longitude = "";
            console.error('no data $scope.it.room_address', $scope.it.room_address);
            return;
        }
    };
    $scope.change_country = function () {
        if ($scope.it.country_id) {
            $scope.master_province = { "parent_id": $scope.it.country_id, "master_group": "PROVINCE" }
            $scope.json_province = JSON.stringify({ master_data: JSON.parse(JSON.stringify($scope.master_province)), company: { "company_id": com_id }, languages: { "language_id": language } });
            UtilityService.getListObjectWithParam($scope.tableMaster, 'list_parent', $scope.json_province).then(function (response) {
                // console.log(response, $scope.json_province)
                if (response.data.err === 0) {
                    $scope.province_list = response.data.dt.master_data_list

                }
            });
        }
        /* phan 1: loa map theo country_id */
        if ($scope.it.country_id) {
            let request_url = {
                table: "master",
                cm: "detail",
                dt: JSON.stringify({
                    "master_data": {
                        "master_group": 'COUNTRY',
                        "master_data_id": $scope.it.country_id ? $scope.it.country_id : ''
                    },
                    "languages": { "language_id": language }
                }),
            }
            UtilityService.getListObjectWithParamDev(request_url.table, request_url.cm, request_url.dt).then(function (response) {
                if (response.data.err === 0) {
                    $scope.it.country_name = response.data.dt.master_data.master_data_name;
                    change_address_map();
                }
            });
        } else {
            $scope.it.latitude = "";
            $scope.it.longitude = "";
            console.error('no data $scope.it.country_id', $scope.it.country_id);
            return;
        }
    }
    $scope.change_province = function () {
        if ($scope.it.province_id) {
            $scope.languageTemp = { language_id: $scope.language_id }
            $scope.master_district = { "parent_id": $scope.it.province_id, "master_group": "DISTRICT" }
            $scope.dtJSON = JSON.stringify({ master_data: JSON.parse(JSON.stringify($scope.master_district)), company: { "company_id": com_id }, languages: { "language_id": language } });
            UtilityService.getListObjectWithParam($scope.tableMaster, 'list_parent', $scope.dtJSON).then(function (response) {
                // console.log(response, dtJSON)
                if (response.data.err === 0) {
                    $scope.district_list = response.data.dt.master_data_list
                }
            });
        }
        /* phan 2, load map theo province_id */
        if ($scope.it.province_id) {
            let request_url = {
                table: "master",
                cm: "detail",
                dt: JSON.stringify({
                    "master_data": {
                        "master_group": 'PROVINCE',
                        "master_data_id": $scope.it.province_id ? $scope.it.province_id : ''
                    },
                    "languages": { "language_id": language }
                }),

            }
            UtilityService.getListObjectWithParamDev(request_url.table, request_url.cm, request_url.dt).then(function (response) {
                if (response.data.err === 0) {
                    $scope.it.province_name = response.data.dt.master_data.master_data_name;
                    change_address_map();
                }
            });
        } else {
            $scope.it.latitude = "";
            $scope.it.longitude = "";
            console.error('no data $scope.it.province_id', $scope.it.province_id);
            return;
        }
    }
    $scope.change_district = function () {
        /* phan 3, load map theo district_id */
        if ($scope.it.district_id) {
            let request_url = {
                table: "master",
                cm: "detail",
                dt: JSON.stringify({
                    "master_data": {
                        "master_group": 'DISTRICT',
                        "master_data_id": $scope.it.district_id ? $scope.it.district_id : ''
                    },
                    "languages": { "language_id": language }
                })
            }
            UtilityService.getListObjectWithParamDev(request_url.table, request_url.cm, request_url.dt).then(function (response) {
                if (response.data.err === 0) {
                    $scope.it.district_name = response.data.dt.master_data.master_data_name;
                    change_address_map();
                }
            });
        } else {
            $scope.it.latitude = "";
            $scope.it.longitude = "";
            console.error('no data $scope.it.district_id', $scope.it.district_id);
            return;
        }
    }
    function change_address_map() {
        var address = ''
        if ($scope.it.room_address && $scope.it.district_name && $scope.it.province_name && $scope.it.country_name) {
            address = `${$scope.it.room_address},${$scope.it.district_name},${$scope.it.province_name},${$scope.it.country_name}`// + $scope.it.country_id;
        } else if ($scope.it.room_address && $scope.it.province_name && $scope.it.country_name) {
            address = `${$scope.it.room_address},${$scope.it.province_name},${$scope.it.country_name}`// + $scope.it.country_id;
        } else if ($scope.it.room_address && $scope.it.country_name) {
            address = `${$scope.it.room_address},${$scope.it.country_name}`// + $scope.it.country_id;
        } else if ($scope.it.district_name && $scope.it.province_name && $scope.it.country_name) {
            address = `${$scope.it.district_name},${$scope.it.province_name},${$scope.it.country_name}`// + $scope.it.country_id;
        } else if ($scope.it.province_name && $scope.it.country_name) {
            address = `${$scope.it.province_name},${$scope.it.country_name}`// + $scope.it.country_id;
        } else if ($scope.it.country_name) {
            address = `${$scope.it.country_name}`// + $scope.it.country_id;
        } else {
            address = `${$scope.it.room_address}`// + $scope.it.country_id;
        }
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'address': address
        }, function (results_list, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results_list && results_list.length) {
                    for (var x in results_list) {
                        var result = results_list[x];
                        $scope.it.longitude = result.geometry.location.lng();
                        $scope.it.latitude = result.geometry.location.lat();
                        $scope.it.room_address = '';
                        $scope.it.room_address = result.formatted_address;
                        break;
                    }

                }
            } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
                swal($filter("translate")("Notice"), $filter("translate")("ZERO_RESULTS"), "success");
                $scope.it.latitude = "";
                $scope.it.longitude = "";
                $scope.it.room_address = "";

            } else {
                swal($filter("translate")("Notice"), $filter("translate")("ERROR"), "success");
                $scope.it.latitude = "";
                $scope.it.longitude = "";
                $scope.it.room_address = "";

            }
        });
    }

    $scope.getpos = function (event) {
        this.latlng = `${event.latLng.lat()}, ${event.latLng.lng()}`;
        $scope.it.latitude = event.latLng.lat();
        $scope.it.longitude = event.latLng.lng();
    };
    $scope.$watch(
        function ($scope) {
            return $scope.abc = $filter('translate')('NOTE_FORMAT1')
        },
        function () {
            $scope.map = true;
            if (!$scope.it.latitude && !$scope.it.longitude) {
                this.latlng = '10.7425856, 106.6822236';
            } else {
                this.latlng = `${$scope.it.longitude},${$scope.it.latitude}}`;
            }
            NgMap.getMap().then(function (map) {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });
            $scope.language_temp = { language_id: language }
            $scope.master_country = { master_group: 'COUNTRY' };
            $scope.json_country = JSON.stringify({ master_data: JSON.parse(JSON.stringify($scope.master_country)), company: { "company_id": com_id }, languages: { "language_id": language } });
            UtilityService.getListObjectWithParam($scope.tableMaster, 'list', $scope.json_country).then(function (response) {
                // console.log($scope.json_country, response)
                if (response.data.err === 0) {
                    $scope.country_list = response.data.dt.master_data_list;
                    if ($scope.country_list.length > 0) {
                        $scope.master_province = { "parent_id": '', "master_group": "PROVINCE" }
                        $scope.json_province = JSON.stringify({ master_data: JSON.parse(JSON.stringify($scope.master_province)), company: { "company_id": com_id }, languages: { "language_id": language } });
                        UtilityService.getListObjectWithParam($scope.tableMaster, 'list_parent', $scope.json_province).then(function (response) {
                            // console.log(response, $scope.json_province)
                            if (response.data.err === 0) {
                                $scope.province_list = response.data.dt.master_data_list
                            }
                        });
                    }
                }
            });
            $scope.json_language = JSON.stringify({ company: { "company_id": com_id }, languages: { "language_id": language } });
            UtilityService.getListObjectWithParam("languages", 'list', $scope.json_language).then(function (response) {
                // console.log($scope.json_country, response)
                if (response.data.err === 0) {
                    $scope.languages_list = response.data.dt.languages_list;
                    $scope.language_id = language;
                }
            });
        }
    );
}