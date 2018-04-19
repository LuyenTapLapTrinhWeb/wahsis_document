/* Ghi chu về xử lý download/export
tách luận lý riêng và get list riêng thành 2 function khác nhau */
function check_total_row(total_row) {
    if (Number(total_row) > 0) {
        return true;
    } else {
        swal($filter("translate")("Error_status"), $filter("translate")("error_export"), "error");
        return false;
    }
}; $scope.get_list_pdf = () => {
    $rootScope.checkLogout();
    try {
        $scope.page1 = { page_index: 1, page_size: $scope.total_row };
        $scope.json1 = JSON.stringify({ rooms: $scope.str_search_rooms, apartment_sales_deposit: $scope.str_search_apartment_sale_contact, users: $scope.str_search, company: $scope.company, page: $scope.page1, languages: $scope.languageTemp });
        // console.log("$scope.json", $scope.json);
        UtilityService.getListObjectWithParam('apartment_sales_deposit', 'report', $scope.json1).then(function (response) {
            if (response.data.err === 0) {
                /* timeout chong lag khi load page lan dau hoac load page sau khi dong popup */
                $scope.userList1 = response.data.dt.apartment_sales_deposit_list;
                if ($scope.userList1.length > 0) {
                    $scope.tongCong = 0;
                    for (var i = 0, length = $scope.userList1.length; i < length; i++) {
                        let obj = $scope.userList1[i];
                        obj.stt = Number(i) + 1;
                        $scope.tongCong += Number(obj.deposit_total);
                    }
                    $timeout(function () {
                        $scope.fix_cai_bug_to_mau_theo_trang_thai($scope.userList1, $scope.color_list);

                    }, 950)

                }
            }
        });
    } catch (e) { swal($filter("translate")("warning"), e.message + "\n" + e.stack, "warning"); }
};
$scope.pdf = function () {
    if (check_total_row($scope.total_row)) {
        $scope.get_list_pdf();
        $timeout(function () {
            $scope.getbranch_detail();
            var contents = $("#bill").html();
            var frame1 = document.createElement('iframe');
            frame1.name = "frame1";
            frame1.style.position = "absolute";
            frame1.style.top = "-1000000px";
            document.body.appendChild(frame1);
            var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title>&nbsp</title><style type="text/css" media="print">@page{size:  auto; margin: 20mm 3mm 0mm 3mm;; }html{ margin: 20px 3px 0px 3px;}body{margin: 0mm 5mm 0mm 5mm; }</style>');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                document.body.removeChild(frame1);
            }, 500);
            return false;
        }, 1000)
    }
};
$scope.excel = () => {
    if (check_total_row($scope.total_row)) {
        $scope.get_list_pdf();
        $timeout(function (e) {
            try {
                $scope.getbranch_detail();
                //getting data from our table
                var data_type = 'data:application/vnd.ms-excel';
                var table_div = document.getElementById('excelbill');
                var table_html = table_div.outerHTML.replace(/ /g, '%20');
                var a = document.createElement('a');
                a.href = data_type + ', ' + table_html;
                a.download = 'report_customer_deposit' + Math.floor((Math.random() * 9999999) + 1000000) + '.xls';
                a.click(function (e) {
                    e.preventDefault();
                });
            } catch (e) { swal($filter("translate")("warning"), e.message + "\n" + e.stack, "warning"); }

        }, 1000)
    }
}