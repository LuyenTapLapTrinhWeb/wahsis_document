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
                /* danh sach list api map */
                $scope.master_data = response.data.dt.master_data;
                $scope.headerstring = $scope.master_data.freefield1;
                $scope.columnstring = $scope.master_data.freefield2;
                $scope.header_list = $scope.headerstring.split(",");
                $scope.column_list = $scope.columnstring.split(",");

                /* danh sach list api 1 */
                $scope.json = JSON.stringify({
                    company: $scope.company,
                    page: $scope.page,
                    languages: $scope.languageTemp,
                    apartment_fee: $scope.str_search_apartment_fee_totals,
                    rooms: $scope.str_search_rooms
                });
                // console.log("$scope.json", $scope.json);
                $scope.sum_total = 0;
                UtilityService.getListObjectWithParam('apartment_fee_totals', 'summary_by_category_report', $scope.json).then(function (success) {
                    if (success.data.err === 0) {
                        // $scope.apartment_fee_list = success.data.dt.apartment_fee_list;
                        $scope.list = success.data.dt.apartment_fee_list;

                        $scope.colspan_col = $scope.header_list.length - 1;
                        for (i in $scope.list) {
                            $scope.list[i].stt = Number(i) + 1;
                            $scope.list[i].order = Number(i) + 1;
                            $scope.list[i].block_name = $scope.list[i].block_name
                            $scope.list[i].owner_name = $scope.list[i].owner_name
                            var thang = new Date($scope.list[i].period_date.split(" ")[0]).getMonth() + 1;
                            var nam = new Date($scope.list[i].period_date.split(" ")[0]).getFullYear();
                            $scope.list[i].days = $scope.tongsongaytrongthang(thang, nam);
                            $scope.list[i].old_period_date = UtilityCheckFormatService.change_date($scope.list[i].old_period_date.split(" ")[0]);
                            $scope.list[i].period_date = UtilityCheckFormatService.change_date($scope.list[i].period_date.split(" ")[0]);
                            $scope.list[i].period = $scope.list[i].old_period_date + " - " + $scope.list[i].period_date
                            $scope.list[i].months = $scope.list[i].month;
                            $scope.list[i].total_amount = UtilityCheckFormatService.change_currency(Number($scope.list[i].total_amount));
                            $scope.list[i].amount = UtilityCheckFormatService.change_currency(Number($scope.list[i].amount));
                            $scope.list[i].tax_amount = UtilityCheckFormatService.change_currency(Number($scope.list[i].tax_amount));
                            $scope.list[i].grand_total = UtilityCheckFormatService.change_currency(Number($scope.list[i].grand_total));
                            if ($scope.list[i].description_json.length > 0) {
                                /* chuyen hoa description_json parse object */
                                var ed_list = JSON.parse($scope.list[i].description_json);
                                $scope.list[i].amount = "";
                                $scope.list[i].evrm_fee_total = "";
                                $scope.list[i].grand_total = "";
                                $scope.list[i].quantity = "";
                                $scope.list[i].tax_amount = "";
                                $scope.list[i].title = "";
                                $scope.list[i].total_amount = "";
                                for (x in ed_list) {
                                    var item = {
                                        amount: UtilityCheckFormatService.change_currency(Number(ed_list[x].dg)),
                                        evrm_fee_total: UtilityCheckFormatService.change_currency(Number(ed_list[x].evrm)),
                                        grand_total: UtilityCheckFormatService.change_currency(Number(ed_list[x].gt)),
                                        quantity: UtilityCheckFormatService.change_currency(Number(ed_list[x].sl)),
                                        quantity: ed_list[x].sl,
                                        title: ed_list[x].title,
                                        tax_amount: UtilityCheckFormatService.change_currency(Number(ed_list[x].tax)),
                                        total_amount: UtilityCheckFormatService.change_currency(Number(ed_list[x].tt)),
                                        order: $scope.list[i].stt,
                                        period: $scope.list[i].period,
                                        room_name: $scope.list[i].room_name,
                                    }
                                    $scope.list.push(item);
                                }
                            } else {
                                $scope.list[i].description_json = "";
                            }
                        }
                        //fix cai bug sap xep theo mot cot trong json array
                        function SortByName(array) {
                            if (typeof (array) === typeof ([])) {
                                array.sort(function (a, b) {
                                    if (a.order < b.order)
                                        return -1;
                                    if (a.order > b.order)
                                        return 1;
                                    return 0;
                                });
                            } else {
                                swal($filter("translate")("warning"), $filter("translate")("no_data"), "warning");
                            }
                        }
                        SortByName($scope.list);
                    }
                });
            }
        });
    }
}