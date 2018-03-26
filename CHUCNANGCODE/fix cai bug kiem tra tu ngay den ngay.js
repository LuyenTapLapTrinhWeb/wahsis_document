$scope.check_tungay_denngay = (from, to) => {
    try {
        if (!utility.checkValue(from)) {
            utility.notify("Warning", "Please Enter Start Date!", "warning");
            return false;
        } else {
            if (!utility.check_date(from, format_date)) {
                utility.notify("Warning", $filter("translate")("format_start_time"), "warning");
                return false;
            }
            if (!utility.checkValue(to)) {
                utility.notify("Warning", "Please Enter End Date!", "warning");
                return false;
            } else {
                if (utility.check_date(to, format_date)) {
                    var fd = UtilityCheckFormatService.change_date_to_save(from);
                    var td = UtilityCheckFormatService.change_date_to_save(to)
                    if (!utility.checkDateRange(fd, td)) {
                        utility.notify("Warning", $filter("translate")("from_to_time_invalid"), "warning");
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    utility.notify("Warning", $filter("translate")("format_end_time"), "warning");
                    return false;
                }
            }
        }
    } catch (e) {
        utility.notify($filter("translate")("warning"), e.message + "\n" + e.stack, "warning");
        return false;
    }
}