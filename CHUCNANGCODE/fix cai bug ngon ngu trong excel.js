/* goi toan bo getbranch_detail() vao trong get pdf list.  
   Kiem tra $scope.total_row > 0 thi 
   1/thuc thi getbranch_detail()
   2/set $scope.page
*/
$scope.getbranch_detail = () => {
    $scope.branch = { company_id: com_id }
    var dtJSONCompany = JSON.stringify({ company: $scope.branch })
    UtilityService.getListObjectWithParamDev("company", "detail", dtJSONCompany).then(function (response) {
        if (response.data.err === 0) {
            $scope.branch_detail = response.data.dt.company;

        }
    });
}
$scope.excel = () => {
    try {
        $scope.get_excel_list();
        //getting data from our table
        $timeout(function () {
            var data_type = 'data:application/vnd.ms-excel';
            var table_div = document.getElementById('excelbill');
            var table_html = table_div.outerHTML.replace(/ /g, '%20');

            var a = document.createElement('a');
            a.href = data_type + ', ' + table_html;
            a.download = 'price_apartment' + Math.floor((Math.random() * 9999999) + 1000000) + '.xls';
            a.click(function (e) {
                e.preventDefault();
            });
        }, 1000)
    } catch (e) { swal($filter("translate")("warning"), e.message + "\n" + e.stack, "warning"); }

}
/* cai bug so dien thoai o day */
<div class="table-responsive" id="excelbill" style="display: none;width: 100% !important"></div>
    < meta http - equiv="content-type" content = "application/vnd.ms-excel; charset=UTF-8" >
        <table id="table_company" border="0" style="width: 100%"></table>
 
 