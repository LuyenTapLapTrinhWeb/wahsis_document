<!DOCTYPE html>
<html>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
<style>
table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}
th, td {
    padding: 15px;
}
</style>
<body>

<p>Try to change the names.</p>

<div ng-app="myApp" ng-controller="myCtrl">
  <table >
     <tr>
         <th ng-repeat="x in header_list">
             {{x}}
            </th>
        </tr>
        <tr ng-repeat="obj in list">
         <td ng-repeat="col in column_list">
             {{obj[col]}}
            </td>
        </tr>
    </table>
</div>

<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    
    //Danh sách Mr.Nam thiết lập
    $scope.header_list1 = "stt,Tên,Số tiền";
    $scope.column_list1 = "stt,name,amount";
    //lấy về và biến thành cái mảng 1 chiều
    $scope.header_list = $scope.header_list1.split(',');
    $scope.column_list = $scope.column_list1.split(',');
    //danh sách được lấy từ API tìm kiếm
    $scope.list = [{"amount":100,"stt":1,"name":"Thanh"},{"amount":100,"stt":2,"name":"Thanh"},{"amount":100,"stt":3,"name":"Thanh"},{"amount":100,"stt":4,"name":"Thanh"},{"amount":100,"stt":5,"name":"Thanh"},{"amount":100,"stt":6,"name":"Thanh"},{"amount":100,"stt":7,"name":"Thanh"},{"amount":100,"stt":8,"name":"Thanh"}]
 
});
</script>

</body>
</html>


$scope.xuat_excel = () => {
    $scope.api_detail_code = "";
    $scope.show_api_detail = false;
    if ($scope.apartment_fee_category_id === 1) {
        /* phi quan ly */
        $scope.api_detail_code = "RPG.0001";
        $scope.show_api_detail = true;
    } else if ($scope.apartment_fee_category_id === 3) {
        /* tien nuoc */
        $scope.api_detail_code = "RPG.0002";
        $scope.show_api_detail = true;
    }
    else if ($scope.apartment_fee_category_id === 2) {
        /* tien dien */
        $scope.api_detail_code = "RPG.0003";
        $scope.show_api_detail = true;
    }
    else {
        $scope.show_api_detail = false;
    }
    $scope.api_detail($scope.api_detail_code);

}
$scope.excel = () => {
    /**vi tri hien tai can xuat excel */
    var data_type = 'data:application/vnd.ms-excel;charset=UTF-8';
    var table_div = "";
    if ($scope.show_api_detail) {
        table_div = document.getElementById('excelbill_show');
    } else {
        table_div = document.getElementById('excelbill');
    }
    var table_html = table_div.outerHTML.replace(/ /g, '%20');

    var a = document.createElement('a');
    a.href = data_type + ', ' + table_html;
    a.download = 'report_detail_apartment_fee' + Math.floor((Math.random() * 9999999) + 1000000) + '.xls';
    a.click(function (e) {
        e.preventDefault();
    });
}
$scope.tongsongaytrongthang = (thang, nam) => {
    // Month is 1-indexed (January is 1, February is 2, etc).
    return new Date(nam, thang, 0).getDate();
}
$scope.api_detail = (master_data_id) => {
    if (utility.checkValue(master_data_id)) {
        var dt = JSON.stringify({ "master_data": { "master_data_id": master_data_id }, "company": { "company_id": com_id }, "languages": { "language_id": language } })
        UtilityService.getListObjectWithParam("master", "detail", dt).then(function (response) {
            if (response.data.err === 0) {
                /* danh sach list api map NAM LIU tra ve */
                $scope.master_data = response.data.dt.master_data;
                $scope.headerstring = $scope.master_data.freefield1;
                $scope.columnstring = $scope.master_data.freefield2;
                $scope.header_list = $scope.headerstring.split(",");
                $scope.column_list = $scope.columnstring.split(",");
                /* danh sach list api 1 */
                $scope.json = JSON.stringify({
                    company: $scope.company,
                    page: { page_size: $scope.total_row, page_index: 1 },
                    languages: $scope.languageTemp,
                    apartment_fee: $scope.str_search_aft,
                    rooms: $scope.str_search_rooms
                });
                // console.log("$scope.json", $scope.json);
                $scope.sum_total = 0;
                UtilityService.getListObjectWithParam('apartment_fee_totals', 'summary_by_category_report', $scope.json).then(function (success) {
                    if (success.data.err === 0) {
                        $scope.list = success.data.dt.apartment_fee_list;
                        var list2 = [];
                        $scope.colspan_col = $scope.header_list.length - 1;
                        for (i in $scope.list) {
                            /* check obj 1 */
                            var myObj = $scope.list[i];
                            // myObj.stt = Number(i) + 1;
                            // var thang = new Date(myObj.period_date.split(" ")[0]).getMonth() + 1;
                            // var nam = new Date(myObj.period_date.split(" ")[0]).getFullYear();
                            // myObj.days = $scope.tongsongaytrongthang(thang, nam);
                            // myObj.old_period_date = UtilityCheckFormatService.change_date(myObj.old_period_date.split(" ")[0]);
                            // myObj.period_date = UtilityCheckFormatService.change_date(myObj.period_date.split(" ")[0]);
                            // myObj.period = myObj.old_period_date + " - " + myObj.period_date
                            // myObj.months = myObj.month;
                            // myObj.total_amount = UtilityCheckFormatService.change_currency(Number(myObj.total_amount));
                            // myObj.amount = UtilityCheckFormatService.change_currency(Number(myObj.amount));
                            // myObj.tax_amount = UtilityCheckFormatService.change_currency(Number(myObj.tax_amount));
                            // myObj.grand_total = UtilityCheckFormatService.change_currency(Number(myObj.grand_total));
                            /* chuyen tiep qua check obj 2 khi description co ton tai*/
                            list2.push(myObj);
                            if (myObj.description_json.length > 0) {
                                // myObj.amount = "";
                                // myObj.evrm_fee_total = "";
                                // myObj.grand_total = ""; 
                                // myObj.tax_amount = "";
                                // myObj.title = "";
                                // myObj.total_amount = "";
                                var ed_list = JSON.parse(myObj.description_json);
                                for (x in ed_list) {
                                    var ed_obj = ed_list[x];
                                    // ed_obj.amount = UtilityCheckFormatService.change_currency(Number(ed_obj.dg));
                                    // ed_obj.evrm_fee_total = UtilityCheckFormatService.change_currency(Number(ed_obj.evrm));
                                    // ed_obj.grand_total = UtilityCheckFormatService.change_currency(Number(ed_obj.gt));
                                    // ed_obj.quantity = ed_obj.sl;
                                    // ed_obj.title = ed_obj.title;
                                    // ed_obj.tax_amount = UtilityCheckFormatService.change_currency(Number(ed_obj.tax));
                                    // ed_obj.total_amount = UtilityCheckFormatService.change_currency(Number(ed_obj.tt));
                                    // ed_obj.period = myObj.period;
                                    // ed_obj.room_name = myObj.room_name;
                                    list2.push(ed_obj);
                                }
                            } else {
                                /* chua biet lam gi */
                                myObj.description_json = "";
                            }
                        }
                        $scope.list = list2;
                    }
                });
            }
        });
    }
}