/* goi toan bo getbranch_detail() vao trong get pdf list.  
   Kiem tra $scope.total_row > 0 thi 
   1/thuc thi getbranch_detail()
   2/set $scope.page
*/

/* cai bug so dien thoai o day */
<div class="table-responsive" id="excelbill" style="display: none;width: 100% !important"></div>
    <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
        <table id="table_company" border="0" style="width: 100%"></table>

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
        $scope.getbranch_detail();
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
$scope.pdf = function () {
    $scope.getbranch_detail();
    $scope.get_excel_list();
    $timeout(function () {
        var contents = $("#bill").html();
        var frame1 = document.createElement('iframe');
        frame1.name = "frame1";
        frame1.style.position = "absolute";
        frame1.style.top = "-1000000px";
        document.body.appendChild(frame1);
        var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
        frameDoc.document.open();
        frameDoc.document.write('<html><head><title>&nbsp</title><style type="text/css" media="print">@page{size: landscape; margin: 20mm 3mm 0mm 3mm;; }html{margin: 20px 3px 0px 3px;}body{margin: 0mm 5mm 0mm 5mm; }</style>');
        frameDoc.document.write('</head><body>');
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        $timeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            document.body.removeChild(frame1);
        }, 500);
        return false;
    }, 1000) // back to looper so angular can refresh the view
}