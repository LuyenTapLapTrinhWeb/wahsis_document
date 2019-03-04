/* Load interval không có điều kiện dừng*/
$scope.theTime = {};
$interval(function () {
    var d = new Date();
    $scope.theTime.h = d.getHours();
    $scope.theTime.m = d.getMinutes();
}, 1000);
/* set interval cua vinh */

$scope.checkhour = function (h1, h2)//h1 : gio hien tai he thong , h2: gio hieu luc ket thuc 
{
    if (parseInt(h1.h) > parseInt(h2.h)) {
        return false; // qua han dang ky
    }
    else {
        if (parseInt(h1.h) == parseInt(h2.h)) {
            if (h1.m > h2.m) {
                return false; // qua han dang ky
            }
            else {
                return true; //con trong thoi gian dang ky
            }
        }
        else {
            return true; //con trong thoi gian dang ky
        }

    }
}

$scope.check_range_timeend_and_currenttime = function (h1, h2)//h1 : gio hien tai he thong , h2: gio hieu luc ket thuc 
{
    var sophut1 = (parseInt(h1.h) * 60) + parseInt(h1.m)
    var sophut2 = (parseInt(h2.h) * 60) + parseInt(h2.m)
    if ((sophut2 - sophut1) <= parseInt($scope.time_on_warning)) {
        return true //trong khoang warning
    }
    else {
        return false //ngoai khoang warning
    }
}

function get_color_code_by_room_status_name(room_status_name) {
    var mamau = "";
    for (var i = 0; i < $scope.color_list.length; i++) {
        if ($scope.color_list[i].color_code === room_status_name) {
            mamau = $scope.color_list[i].css_code;
        }
    }
    // a = mamau, "border": "1px solid #e7eaec" };
    return mamau;
}
function load_config_value_sms_setting() {
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
                // console.log("$scope.time_on_warning", $scope.time_on_warning)
            } else {
                console.log("not found core_config_data table")
            }
        }
    });
}
function get_hours_minutes_time_end(gio_ket_thuc_dang_ky_end_time) {
    var time_end = {}
    if (gio_ket_thuc_dang_ky_end_time) {
        time_end.h = (gio_ket_thuc_dang_ky_end_time.split(" ")[1]).split(":")[0];
        time_end.m = (gio_ket_thuc_dang_ky_end_time.split(" ")[1]).split(":")[1];
    } else {
        console.error("not found gio_ket_thuc_dang_ky_end_time")
    }
    return time_end;
}
$scope.getmau = function (code) {
    if ($scope.location_list) {
        for (var m = 0; m < $scope.location_list.length; m++) {
            for (var n = 0; n < $scope.location_list[m].children.length; n++) {
                for (var o = 0; o < $scope.location_list[m].children[n].children.length; o++) {
                    if ($scope.location_list[m].children[n].children[o].room_code == code) {
                        var status = $scope.location_list[m].children[n].children[o].room_status_id;
                        var sales_access = $scope.location_list[m].children[n].children[o].sales_access;
                        var a = "";
                        if (status === "0" || status === 0) {
                            a = get_color_code_by_room_status_name("available")
                        } else if (status === "-1" || status === -1) {
                            a = get_color_code_by_room_status_name("lock")
                        } else if (status === "1" || status === 1) {
                            a = get_color_code_by_room_status_name("contract")
                        } else if (status === "2" || status === 2) {
                            a = get_color_code_by_room_status_name("contract")
                        } else if (status === "3" || status === 3) {
                            var time_end = get_hours_minutes_time_end($scope.location_list[m].children[n].children[o].end_time)
                            if ($scope.checkhour($scope.theTime, time_end) == false) {
                                a = get_color_code_by_room_status_name("available")
                            } else {
                                if ($scope.check_range_timeend_and_currenttime($scope.theTime, time_end)) {
                                    a = get_color_code_by_room_status_name("reservation")
                                    return {
                                        "fill": a,
                                        "transition": "1.5s",
                                        "stroke-width": "10",
                                        "stroke": "yellow",
                                        "stroke-dasharray": "500",
                                        "stroke-dashoffset": "500",
                                        "animation": "flash 2s linear infinite"
                                    }
                                }
                                else {
                                    a = get_color_code_by_room_status_name("reservation");
                                }
                            }
                        } else if (status === "4" || status === 4) {
                            a = get_color_code_by_room_status_name("deposit")
                        }
                        if (sales_access != 0) {
                            a = get_color_code_by_room_status_name("lock");
                            return { "fill": a, "opacity": "1", "cursor": "not-allowed" }
                        }
                        else {
                            return { "fill": a }
                        }
                    }
                }
            }
        }
        for (var room in $scope.rooms_list) {
            var room_status_id = $scope.rooms_list[room].room_status_id
            var a = "";
            if (room_status_id === "0" || room_status_id === 0) {
                a = get_color_code_by_room_status_name("lock");
            }
            return { "fill": a, "opacity": "1", "cursor": "not-allowed" }
        }

    }
    else {
        console.error("not found $scope.location_list, need to restart service, can't get module active", $scope.location_list)
    }
}
/* load interval có điều kiện dừng*/
$scope.count_row_customer2 = 0;
function set_customer2_name(i) {
    var j_son = { apartment_sales_client_id: $scope.new_event_booking_list[i].apartment_sales_client_2_id }
    var json1 = JSON.stringify({ apartment_sales_client: JSON.parse(JSON.stringify(j_son)), company: JSON.parse(JSON.stringify($scope.company)) });
    UtilityService.getListObjectWithParam("apartment_sales_client", "detail", json1).then(function (response) {
        if (response.data.err === 0) {
            $scope.apartment_sales_client_2 = response.data.dt.apartment_sales_client;

            console.log("sdfgdfg", $scope.apartment_sales_client_2)
            $scope.new_event_booking_list[i].first_name111 = $scope.apartment_sales_client_2.first_name;
            $scope.new_event_booking_list[i].date_of_birth_2 = !$scope.apartment_sales_client_2.date_of_birth ? "" : $scope.apartment_sales_client_2.date_of_birth;
            $scope.new_event_booking_list[i].identity_number_2 = !$scope.apartment_sales_client_2.identity_number ? "" : $scope.apartment_sales_client_2.identity_number;
            $scope.new_event_booking_list[i].issue_place_2 = !$scope.apartment_sales_client_2.issue_place ? "" : $scope.apartment_sales_client_2.issue_place;
            $scope.new_event_booking_list[i].address_2 = !$scope.apartment_sales_client_2.address ? "" : $scope.apartment_sales_client_2.address;
            $scope.new_event_booking_list[i].address_contact_2 = !$scope.apartment_sales_client_2.address_contact ? "" : $scope.apartment_sales_client_2.address_contact;
            $scope.new_event_booking_list[i].cell_phone_2 = !$scope.apartment_sales_client_2.cell_phone ? "" : $scope.apartment_sales_client_2.cell_phone;
            $scope.new_event_booking_list[i].email_address_2 = !$scope.apartment_sales_client_2.email_address ? "" : $scope.apartment_sales_client_2.email_address;

            $scope.count_row_customer2++

        }
    });
}

$scope.print1 = function (date_of_confirmation_slip) {
    $scope.count_row_customer2 = 0
    for (var i = 0; i <= $scope.new_event_booking_list.length - 1; i++) {
        set_customer2_name(i)
    }
    // $timeout(function () { console.log($scope.new_event_booking_list) }, 5000);

    var promise = $interval(function () {
        if ($scope.count_row_customer2 == $scope.new_event_booking_list.length) {

            console.log("abc", $scope.new_event_booking_list)
            $interval.cancel(promise);
            var tongnoidung = "";
            for (var i in $scope.new_event_booking_list) {
                $scope.first_name111 = "";
                var _full_name =
                    $scope.new_event_booking_list[i].first_name +
                    " " +
                    $scope.new_event_booking_list[i].last_name;
                var event_booking_code = $scope.new_event_booking_list[i].event_booking_code
                var contents = "";
                if ($scope.new_event_booking_list[i].apartment_sales_client_2_id === 0) {

                    contents = $scope.tao_chuoi_in_phieu_xac_nhan(
                        $scope.apartment_sales_client_list[i].event_booking_code,
                        _full_name,
                        $scope.apartment_sales_client_list[i].date_of_birth,
                        $scope.apartment_sales_client_list[i].identity_number,
                        $scope.apartment_sales_client_list[i].issue_date,
                        $scope.apartment_sales_client_list[i].issue_place,
                        $scope.apartment_sales_client_list[i].address,
                        $scope.apartment_sales_client_list[i].address_contact,
                        $scope.apartment_sales_client_list[i].cell_phone,
                        $scope.apartment_sales_client_list[i].email_address,
                        $scope.apartment_sales_client_list[i].bank_name,
                        $scope.apartment_sales_client_list[i].bank_account_number,
                        $scope.apartment_sales_client_list[i].create_date,
                        $scope.print_date,

                    );
                }
                else {

                    contents = tao_chuoi_in_phieu_xac_nhan_2(
                        $scope.apartment_sales_client_list[i].event_booking_code,
                        _full_name,
                        $scope.apartment_sales_client_list[i].date_of_birth,
                        $scope.apartment_sales_client_list[i].identity_number,
                        $scope.apartment_sales_client_list[i].issue_date,
                        $scope.apartment_sales_client_list[i].issue_place,
                        $scope.apartment_sales_client_list[i].address,
                        $scope.apartment_sales_client_list[i].address_contact,
                        $scope.apartment_sales_client_list[i].cell_phone,
                        $scope.apartment_sales_client_list[i].email_address,
                        $scope.apartment_sales_client_list[i].bank_name,
                        $scope.apartment_sales_client_list[i].bank_account_number,
                        $scope.apartment_sales_client_list[i].create_date,

                        $scope.new_event_booking_list[i].first_name111,
                        $scope.new_event_booking_list[i].date_of_birth_2,
                        $scope.new_event_booking_list[i].identity_number_2,
                        $scope.new_event_booking_list[i].issue_date_2,
                        $scope.new_event_booking_list[i].issue_place_2,
                        $scope.new_event_booking_list[i].address_2,
                        $scope.new_event_booking_list[i].address_contact_2,
                        $scope.new_event_booking_list[i].cell_phone_2,
                        $scope.new_event_booking_list[i].email_address_2,
                        $scope.print_date
                    );


                }


                tongnoidung += contents;
            }
            $scope._print(tongnoidung);
        }
    }, 1);


};