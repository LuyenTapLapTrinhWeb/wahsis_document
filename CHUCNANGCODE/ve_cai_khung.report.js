<div ng-controller="resident_incident_report_controller"> 
    <div class="table-responsive" id="bill" style="display: none">
        <table border="0" id="table_company" style="width: 100%">
            <tr>
                <td rowspan="5" style="width: 25%;text-align: center; vertical-align: top;">
                    <img ng-src="{{logo}}" style="width: 115px; height: 90px;  object-fit: scale-down">
                    </img>
                </td>
                <td style="width: 10%;text-align: left;">
                    {{"COMPANY"|translate}}
                </td>
                <td style="width: 60%;text-align: left;">
                    {{branch_detail.company_name}}
                </td>
            </tr>
            <tr>
                <td style="width: 10%;text-align: left;vertical-align: top;">
                    {{"ADDRESS"|translate}}:
                </td>
                <td style="width: 60%;text-align: left;">
                    {{branch_detail.address}}
                </td>
            </tr>
            <tr>
                <td style="width: 10%;text-align: left;">
                    {{"PHONE"|translate}}:
                </td>
                <td style="width: 60%;text-align: left;">
                    {{branch_detail.phone1}}
                </td>
            </tr>
            <tr>
                <td style="width: 10%;text-align: left;">
                    {{"WEBSITE"|translate}}:
                </td>
                <td style="width: 60%;text-align: left;">
                    {{branch_detail.website}}
                </td>
            </tr>
        </table>
        <div class="text_print" style="text-align: center;width: 100%;  margin-top:15px;margin-bottom:15px;">
            <b style="font-size: 20px;text-transform: uppercase;">
                {{"RI_MODULE"|translate}}
            </b>
        </div>
        <!-- table total file pdf -->

        <!-- end table total pdf -->

        <!-- table detail file pdf -->

        <table border="1" style="width: 100%;border-collapse: collapse; border: 1px solid black;" class="table table-striped table-bordered table-hover">
            <thead>
                
            </thead>
            <tbody>
                 
            </tbody>
        </table>
        <!-- end table detail file pdf -->
    </div>
    <div class="table-responsive" id="excelbill" style="display: none">
        <table border="0" id="table_company" style="width: 100%">
            <tr>
                <td rowspan="5" style="width: 25%;text-align: center; vertical-align: top;">
                    <!--                    <img ng-src="{{logo}}" style="width: 115px; height: 90px;  object-fit: scale-down">
                                        </img>-->
                </td>
                <td style="width: 10%;text-align: left;">
                    {{"COMPANY"|translate}}
                </td>
                <td style="width: 60%;text-align: left;">
                    {{branch_detail.company_name}}
                </td>
            </tr>
            <tr>
                <td style="width: 10%;text-align: left;vertical-align: top;">
                    {{"ADDRESS"|translate}}:
                </td>
                <td style="width: 60%;text-align: left;">
                    {{branch_detail.address}}
                </td>
            </tr>
            <tr>
                <td style="width: 10%;text-align: left;">
                    {{"PHONE"|translate}}:
                </td>
                <td style="width: 60%;text-align: left;">
                    {{branch_detail.phone1}}
                </td>
            </tr>
            <tr>
                <td style="width: 10%;text-align: left;">
                    {{"WEBSITE"|translate}}:
                </td>
                <td style="width: 60%;text-align: left;">
                    {{branch_detail.website}}
                </td>
            </tr>
        </table>
        <div class="text_print" style="text-align: center;width: 100%">
            <b style="font-size: 20px;text-transform: uppercase;">
                {{"RI_MODULE"|translate}}
            </b>
        </div>
        <!-- table total file pdf -->
        <!-- end table total pdf -->
        <!-- table detail file pdf -->
        <table border="1" style="width: 100%;border-collapse: collapse; border: 1px solid black;" class="table table-striped table-bordered table-hover">
            <thead>
                 
            </thead>
            <tbody>
                 
            </tbody>
        </table>
        <!-- end table detail file pdf -->
    </div>
</div>
/**VE CAI NUT */
<div class="pull-right">
<div class="btn-group" uib-dropdown="">
<button class="btn btn-primary pull-right" type="button" uib-dropdown-toggle="">

    {{"EXPORT"|translate}}
    <span class="caret">
    </span>
</button>
<ul role="menu" uib-dropdown-menu="">
    <!--<li><a data-ng-click="excel()">Excel</a></li>-->
    <li>
        <a data-ng-click="pdf()">
            PDF
        </a>
        <!-- <a data-ng-click="pdf(2)">
            {{"Detailes_Feedback"|translate}}
        </a> -->
        <a id="excel">Excel</a>
    </li>

</ul>
</div>
</div>
    //viet ngoai ham phan quyen
$scope.pdf = function () {
    $rootScope.checkLogout();
    var contents = $("#bill").html();
    var frame1 = document.createElement("iframe");
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow
      ? frame1.contentWindow
      : frame1.contentDocument.document
        ? frame1.contentDocument.document
        : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write(
      '<html><head><title>&nbsp</title><style type="text/css" media="print">@page{size:  landscape; margin: 20mm 3mm 0mm 3mm; }html{ margin: 20px 3px 0px 3px;}body{margin: 0mm 5mm 0mm 5mm; }</style>'
    );

    frameDoc.document.write("</head><body>");
    frameDoc.document.write(contents);
    frameDoc.document.write("</body></html>");
    frameDoc.document.close();
    setTimeout(function () {
      window.frames["frame1"].focus();
      window.frames["frame1"].print();
      document.body.removeChild(frame1);
    }, 500);
    return false;
  };
 
  //viet trong ham phan quyen
  $scope.branch = {
    company_id: com_id
  };
  var dtJSONCompany = JSON.stringify({
    company: $scope.branch
  });
  UtilityService.getListObjectWithParamDev(
    "company",
    "detail",
    dtJSONCompany
  ).then(function (response) {
    if (response.data.err === 0) {
      $scope.branch_detail = response.data.dt.company;
    }
  });
$scope.get_list_pdf = function () {
    $scope.page_pdf = { page_index: 1, page_size: 10000 };
    var json_pdf = JSON.stringify({
      rooms: JSON.parse(JSON.stringify($scope.str_search_room)),
      resident_incident: JSON.parse(JSON.stringify($scope.str_search)),
      company: JSON.parse(JSON.stringify($scope.company)),
      page: JSON.parse(JSON.stringify($scope.page_pdf)),
      languages: JSON.parse(JSON.stringify($scope.languageTemp))
    });

    UtilityService.getListObjectWithParam(
      "resident_incident",
      "report",
      json_pdf
    ).then(function (response) {
      if (response.data.err === 0) {
        $scope.total_row = response.data.dt.page.total_row;
        $scope.page_pdf1 = { page_index: 1, page_size: $scope.total_row };
        var json_pdf = JSON.stringify({
          rooms: JSON.parse(JSON.stringify($scope.str_search_room)),
          resident_incident: JSON.parse(JSON.stringify($scope.str_search)),
          company: JSON.parse(JSON.stringify($scope.company)),
          page: JSON.parse(JSON.stringify($scope.page_pdf1)),
          languages: JSON.parse(JSON.stringify($scope.languageTemp))
        });
        UtilityService.getListObjectWithParam(
          "resident_incident",
          "report",
          json_pdf
        ).then(function (response) {
          if (response.data.err === 0) {
            $scope.resident_incident_list_pdf =
              response.data.dt.resident_incident_list;
            for (
              var i = 0;
              i < $scope.resident_incident_list_pdf.length;
              i++
            ) {
              $scope.resident_incident_list_pdf[i].stt =
                (parseInt($scope.currentPage1) - 1) * $scope.item_per_page +
                i +
                1;
            }
          }
        });
      }
    });
  };

 