$scope.update_date = function () {
    $timeout(function () {
        $scope.it.from_date = $('#from_date').val();
        // $scope.to_date = $('#exchange_rate1').val();
        // alert($scope.it.from_date)
    }, 250);
}
function case_ddMMyyyy(x, y) {
    if (Number(x[2]) > Number(y[2])) {
        return -1;
    } else if (Number(x[2]) === Number(y[2])) {
        if (Number(x[1]) > Number(y[1])) {
            return -1;
        } else if (Number(x[1]) === Number(y[1])) {
            if (Number(x[0]) > Number(y[0])) {
                return -1;
            }
        }
    }
}
function case_MMddyyyy(x, y) {
    if (Number(x[2]) > Number(y[2])) {
        return -1;
    } else if (Number(x[2]) === Number(y[2])) {
        if (Number(x[0]) > Number(y[0])) {
            return -1;
        } else if (Number(x[0]) === Number(y[0])) {
            if (Number(x[1]) > Number(y[1])) {
                return -1;
            }
        }
    }
}
function case_yyyyMMdd(x, y) {
    if (Number(x[0]) > Number(y[0])) {
        return -1;
    } else if (Number(x[0]) === Number(y[0])) {
        if (Number(x[0]) > Number(y[0])) {
            return -1;
        } else if (Number(x[0]) === Number(y[0])) {
            if (Number(x[2]) > Number(y[2])) {
                return -1;
            }
        }
    }
}
function check_from_date_to_date(x, y, format_date) {
    try {
        let error_code = 0;
        if (isNull(x) && isNull(y)) {
            x = x.split("-");
            y = y.split("-");
            if (format_date) {
                if (format_date === "dd-MM-yyyy")
                    error_code = case_ddMMyyyy(x, y);
                else if (format_date === "MM-dd-yyyy")
                    error_code = case_MMddyyyy(x, y);
                else if (format_date === "yyyy-MM-dd")
                    error_code = case_yyyyMMdd(x, y);
                else
                    error_code = -3;
            }
        } else {
            error_code = -2;
        }
        return error_code;
    } catch (error) {
        return error;
    }
}

=====================controller
$scope.check_date = function (from_date, to_date) {
    let msg_body_check_date_from_to = $filter("translate")("CHECK_FROM_DATE_TO_DATE");
    let msg_body_format_from_date = $filter("translate")("format_from_date");
    let msg_body_format_to_date = $filter("translate")("format_to_date");
    let msg_title_notice = $filter("translate")("Notice");
    let msg_body_check_no_data = $filter("translate")("no_data");
    let msg_icon_warning = "warning";
    let key = utility.check_from_date_to_date(from_date, to_date, $rootScope.format_date);
    if (key) {
        switch (key) {
            case -1:
                swal(msg_title_notice, msg_body_check_date_from_to, msg_icon_warning)
                break;
            case -2:
                if (!from_date) {
                    swal(msg_title_notice, msg_body_format_from_date, msg_icon_warning)
                }
                if (!to_date) {
                    swal(msg_title_notice, msg_body_format_to_date, msg_icon_warning)
                }
                break;
            default:
                swal(msg_title_notice, msg_body_check_no_data, msg_icon_warning)
                break;
        }
    }
}