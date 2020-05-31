function crud_generate_house_number_and_coordinates_controller($filter, $rootScope, $scope, DTOptionsBuilder, $uibModalInstance, $rootScope) {

    $scope.$watch(function ($scope) {
        return $scope.abc = language;
    }, function () {
        $scope.list_page = []
        $scope.item_per_page1 = []
        var json_value = getCookieJson("pms-dev-format");
        $scope.item_per_page = JSON.parse(json_value).item_per_page;
        $scope.item_per_page_list = JSON.parse(json_value).item_per_page_list;
        $scope.page_length = page_length;
        $scope.currentPage1 = 1;
        $scope.item_per = $scope.item_per_page_list.split(",");
        for (var j = 0; j < $scope.item_per.length; j++) {
            $scope.item_per_page1.push({
                value: $scope.item_per[j],
                text: $scope.item_per[j]
            });
        };
        $scope.page = {
            page_index: 1,
            page_size: $scope.item_per_page
        }
        $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('scrollY', 300).withOption('scrollX', true).withButtons(['copy', 'pdf', 'excel']).withDOM('<"html5buttons"B>lTtipr')
        $scope.it = {
            room_address: "",
            house_number: "",
            house_number: "",
            last_house_number: "",
            house_number_list: [],
            latitude_of_house_number: "",
            longitude_of_house_number: "",
            latitude_of_last_house_numbers: "",
            longitude_of_last_house_numbers: "",
            coordinates_house_number: { "latitude": "", "longitude": "" },
            coordinates_last_house_number: { "latitude": "", "longitude": "" },
            latitude: "",
            longitude: "",
            distance_of_a_range_latitude: null,
            distance_of_a_range_longitude: null,
        }
        $scope.total_house_number_list = [];
    })
    $scope.close = function (total_house_number_list) {
        $uibModalInstance.close(total_house_number_list);
    };
    $scope.loadNewLongLat = function () {
        if (isNaN($scope.total_house_number) || !Number.isInteger($scope.total_house_number)) {
            $scope.total_house_number = parseInt($scope.total_house_number);
        }
        if (isNaN($scope.it.longitude_of_house_number) || !Number.isInteger($scope.it.longitude_of_house_number)) {
            $scope.it.longitude_of_house_number = parseInt($scope.it.longitude_of_house_number);
        }
        if (isNaN($scope.it.latitude_of_house_number) || !Number.isInteger($scope.it.latitude_of_house_number)) {
            $scope.it.latitude_of_house_number = parseInt($scope.it.latitude_of_house_number);
        }
        if (isNaN($scope.it.longitude_of_last_house_numbers) || !Number.isInteger($scope.it.longitude_of_last_house_numbers)) {
            $scope.it.longitude_of_last_house_numbers = parseInt($scope.it.longitude_of_last_house_numbers);
        }
        if (isNaN($scope.it.latitude_of_last_house_numbers) || !Number.isInteger($scope.it.latitude_of_last_house_numbers)) {
            $scope.it.latitude_of_last_house_numbers = parseInt($scope.it.latitude_of_last_house_numbers);
        }
        $scope.coordinates_house_number = { "latitude": $scope.it.latitude_of_house_number, "longitude": $scope.it.longitude_of_house_number }
        $scope.coordinates_last_house_number = { "latitude": $scope.it.latitude_of_last_house_numbers, "longitude": $scope.it.longitude_of_last_house_numbers }
        /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` */
        /* Tính khoảng cách mỗi khoảng của kinh độ hoặc vĩ độ  */
        $scope.calculate_distance_of_a_range_lat_long($scope.coordinates_house_number.latitude, $scope.coordinates_house_number.longitude, $scope.coordinates_last_house_number.latitude, $scope.coordinates_last_house_number.longitude, $scope.total_house_number)
    }
    $scope.change_house_number = function (house_number, last_house_number) {
        if (isNaN(house_number) || !Number.isInteger(house_number)) {
            if (last_house_number) {
                house_number = parseInt(house_number);
            }
        }
        if (isNaN(last_house_number) || !Number.isInteger(last_house_number)) {
            if (last_house_number) {
                last_house_number = parseInt(last_house_number);
            }
        }
        if (house_number && last_house_number) {
            if (house_number > last_house_number)
                $scope.total_house_number = (house_number - last_house_number) / 2 + 1;
            else
                $scope.total_house_number = (last_house_number - house_number) / 2 + 1;

        }
    }
    $scope.generate_the_number_of_units_in_the_house_number_list = function () {
        /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` */
        /* Kiểm tra nhập*/
        if ($scope.it.house_number % 2 === 1 && $scope.it.last_house_number % 2 === 0 || $scope.it.house_number % 2 === 0 && $scope.it.last_house_number % 2 === 1) {
            console.error("Không có trường hợp dãy nhà vừa chẵn vừa lẻ");
            $scope.message_error = $filter("translate")("EVEN_AND_ODD_BUILDINGS");
            return;
        } else {
            $scope.message_error = "";
        }
        if (isNaN($scope.total_house_number) || !Number.isInteger($scope.total_house_number)) {
            $scope.total_house_number = parseInt($scope.total_house_number);
        }
        if (isNaN($scope.it.house_number) || !Number.isInteger($scope.it.house_number)) {
            $scope.it.house_number = parseInt($scope.it.house_number);
        }
        if (isNaN($scope.it.last_house_number) || !Number.isInteger($scope.it.last_house_number)) {
            $scope.it.last_house_number = parseInt($scope.it.last_house_number);
        }
        if (isNaN($scope.it.longitude_of_house_number) || !Number.isInteger($scope.it.longitude_of_house_number)) {
            $scope.it.longitude_of_house_number = parseInt($scope.it.longitude_of_house_number);
        }
        if (isNaN($scope.it.latitude_of_house_number) || !Number.isInteger($scope.it.latitude_of_house_number)) {
            $scope.it.latitude_of_house_number = parseInt($scope.it.latitude_of_house_number);
        }
        if (isNaN($scope.it.longitude_of_last_house_numbers) || !Number.isInteger($scope.it.longitude_of_last_house_numbers)) {
            $scope.it.longitude_of_last_house_numbers = parseInt($scope.it.longitude_of_last_house_numbers);
        }
        if (isNaN($scope.it.latitude_of_last_house_numbers) || !Number.isInteger($scope.it.latitude_of_last_house_numbers)) {
            $scope.it.latitude_of_last_house_numbers = parseInt($scope.it.latitude_of_last_house_numbers);
        }
        /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` */
        /* Reset giá trí theo ô nhập  */
        $scope.coordinates_house_number = { "latitude": $scope.it.latitude_of_house_number, "longitude": $scope.it.longitude_of_house_number }
        $scope.coordinates_last_house_number = { "latitude": $scope.it.latitude_of_last_house_numbers, "longitude": $scope.it.longitude_of_last_house_numbers }
        /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` */
        /* Tạo danh sách căn*/
        if ($scope.total_house_number && $scope.it.house_number && $scope.it.last_house_number) {
            $scope.total_house_number_list = [];
            for (var i = $scope.it.house_number; i <= $scope.it.last_house_number; i += 2) {
                let coordinator = {
                    room_address_id: i,
                    room_address: `${i}, ${$scope.it.room_address ? $scope.it.room_address : ""}`,
                    latitude: null,
                    longitude: null,
                }
                $scope.total_house_number_list.push(coordinator);
            }
        }
        /* Thêm căn đầu và căn cuối vào danh sách  */
        $scope.total_house_number_list[0].latitude = $scope.coordinates_house_number.latitude;
        $scope.total_house_number_list[0].longitude = $scope.coordinates_house_number.longitude;
        $scope.total_house_number_list[$scope.total_house_number_list.length - 1].latitude = $scope.coordinates_last_house_number.latitude;
        $scope.total_house_number_list[$scope.total_house_number_list.length - 1].longitude = $scope.coordinates_last_house_number.longitude;
        /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` */
        /* Khoảng cách mỗi khoảng không được phép âm */
        $scope.total_distance_of_a_range = ($scope.total_house_number - 1);
        if ($scope.coordinates_last_house_number.latitude > $scope.coordinates_house_number.latitude) {
            $scope.distance_of_a_range_latitude = ($scope.coordinates_last_house_number.latitude - $scope.coordinates_house_number.latitude) / $scope.total_distance_of_a_range;
            /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` */
            /* Tính vĩ độ */
            if ($scope.coordinates_house_number && $scope.total_house_number_list.length) {
                for (var i = $scope.total_house_number_list.length - ($scope.total_house_number_list.length - 1); i < $scope.total_house_number_list.length - 1; i++) {
                    var s = $scope.total_house_number_list[i];
                    s.latitude = $scope.coordinates_house_number.latitude += $scope.distance_of_a_range_latitude
                }
            }
        } else if ($scope.coordinates_last_house_number.latitude < $scope.coordinates_house_number.latitude) {
            $scope.distance_of_a_range_latitude = ($scope.coordinates_house_number.latitude - $scope.coordinates_last_house_number.latitude) / $scope.total_distance_of_a_range;
            /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` */
            /* Tính vĩ độ */
            if ($scope.coordinates_house_number && $scope.total_house_number_list.length) {
                for (var i = $scope.total_house_number_list.length - ($scope.total_house_number_list.length - 1); i < $scope.total_house_number_list.length - 1; i++) {
                    var s = $scope.total_house_number_list[i];
                    s.latitude = $scope.coordinates_house_number.latitude -= $scope.distance_of_a_range_latitude
                }
            }
        } else {
            /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` */
            /* Tính vĩ độ */
            if ($scope.coordinates_house_number && $scope.total_house_number_list.length) {
                for (var i = $scope.total_house_number_list.length - ($scope.total_house_number_list.length - 1); i < $scope.total_house_number_list.length - 1; i++) {
                    var s = $scope.total_house_number_list[i];
                    s.latitude = null;
                }
            }
        }
        if ($scope.coordinates_last_house_number.longitude > $scope.coordinates_house_number.longitude) {
            $scope.distance_of_a_range_longitude = ($scope.coordinates_last_house_number.longitude - $scope.coordinates_house_number.longitude) / $scope.total_distance_of_a_range;
            /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` */
            /* Tính kinh độ lớn hơn*/
            if ($scope.coordinates_last_house_number && $scope.total_house_number_list.length) {
                for (var i = $scope.total_house_number_list.length - ($scope.total_house_number_list.length - 1); i < $scope.total_house_number_list.length - 1; i++) {
                    var s = $scope.total_house_number_list[i];
                    s.longitude = $scope.coordinates_house_number.longitude += $scope.distance_of_a_range_longitude
                }
            }
        } else if ($scope.coordinates_last_house_number.longitude < $scope.coordinates_house_number.longitude) {
            $scope.distance_of_a_range_longitude = ($scope.coordinates_house_number.longitude - $scope.coordinates_last_house_number.longitude) / $scope.total_distance_of_a_range;
            /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` */
            /* Tính kinh độ nhỏ hơn*/
            if ($scope.coordinates_last_house_number && $scope.total_house_number_list.length) {
                for (var i = $scope.total_house_number_list.length - ($scope.total_house_number_list.length - 1); i < $scope.total_house_number_list.length - 1; i++) {
                    var s = $scope.total_house_number_list[i];
                    s.longitude = $scope.coordinates_house_number.longitude -= $scope.distance_of_a_range_longitude
                }
            }
        } else {
            /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` */
            /* Tính kinh độ bằng nhau*/
            if ($scope.coordinates_last_house_number && $scope.total_house_number_list.length) {
                for (var i = $scope.total_house_number_list.length - ($scope.total_house_number_list.length - 1); i < $scope.total_house_number_list.length - 1; i++) {
                    var s = $scope.total_house_number_list[i];
                    s.longitude = null;
                }
            }
        }
        $scope.coordinates_house_number = { "latitude": $scope.it.latitude_of_house_number, "longitude": $scope.it.longitude_of_house_number }
        $scope.coordinates_last_house_number = { "latitude": $scope.it.latitude_of_last_house_numbers, "longitude": $scope.it.longitude_of_last_house_numbers }
    }
    $scope.calculate_distance_of_a_range_lat_long = function (lata, longa, latb, longb, total_house_number) {
        $scope.total_distance_of_a_range = (total_house_number - 1);
        $scope.distance_of_a_range_latitude = (latb - lata) / $scope.total_distance_of_a_range;
        $scope.distance_of_a_range_longitude = (longb - longa) / $scope.total_distance_of_a_range;
    }
    $scope.loadNewRoomAddress = function (room_address) {
        if (room_address) {
            $scope.it.room_address = room_address;
            // change_address_map();
            // NgMap.getMap().then(function(map) {
            //     map.setZoom(17);
            // });
        } else {
            $scope.it.latitude = "";
            $scope.it.longitude = "";
            // change_address_map();
            return;
        }
    };
    $scope.is_show_summary_table = false;
    $scope.is_show_generate_table = false;
    $scope.show_summary_table = function () {
        $scope.is_show_summary_table = true;
    }
    $scope.hide_summary_table = function () {
        $scope.is_show_summary_table = false;
    }
    $scope.show_generate_table = function () {
        $scope.is_show_generate_table = true;
        $scope.generate_the_number_of_units_in_the_house_number_list();
    }
    $scope.hide_generate_table = function () {
        $scope.is_show_generate_table = false;
    }
    $scope.hide_generate_table = function () {
        $scope.is_show_generate_table = false;
    }
    $scope.generate = function () {
        $scope.generate_the_number_of_units_in_the_house_number_list();
        if ($scope.total_house_number_list && $scope.total_house_number_list.length) {
            $rootScope.total_house_number_list = angular.copy($scope.total_house_number_list);
            $scope.close($rootScope.total_house_number_list);
        } else {
            console.error("Chưa tạo được tọa độ và số nhà");
            return;
        }
    }
};