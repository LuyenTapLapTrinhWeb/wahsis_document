 < !--excelbill o day-- >
    <div class="table-responsive" id="excelbill" style="display: none;width: 100% !important">
        <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
            <table id="table_company" border="0" style="width: 100%">
                <tr>
                    <!-- <td style="width: 25%;text-align: center; vertical-align: top;" rowspan="5">
                        <img ng-src={{ logo }} style="width: 115px; height: 90px;  object-fit: scale-down">
                                </td> -->
                                <td style="width: 10%;text-align: left;">{{ "COMPANY"| translate }}</td>
                        <td style="width: 60%;text-align: left;"> {{ branch_detail.company_name }}</td>

                            </tr>

                    <tr>
                        <td style="width: 10%;text-align: left;vertical-align: top;">{{ "ADDRESS"| translate }}:</td>
                        <td style="width: 60%;text-align: left;"> {{ branch_detail.address }}</td>
                    </tr>
                    <tr>
                        <td style="width: 10%;text-align: left;">{{ "PHONE"| translate }}:</td>
                        <td style="width: 60%;text-align: left;"> {{ branch_detail.phone1 }}</td>
                    </tr>
                    <tr>
                        <td style="width: 10%;text-align: left;">{{ "WEBSITE"| translate }}:</td>
                        <td style="width: 60%;text-align: left;"> {{ branch_detail.website }}</td>
                    </tr>
                        </table>
                <div style="text-align: center;width: 100%" class="text_print">
                    <b style="font-size: 20px;text-transform: uppercase;">{{ "project_sale_employeee"| translate }}</b>
                </div>
                <table border="1" style="width: 100%;border-collapse: collapse; border: 1px solid black;">
                    <thead>
                        <tr>
                            <th style="white-space: nowrap;">
                                {{ "STT"| translate }}
                            </th>
                            <th style="white-space: nowrap;">
                                {{ "SELLER_GROUP"| translate }}
                            </th>
                            <th style="white-space: nowrap;">
                                {{ "FULL_NAME"| translate }}
                            </th>
                            <th style="white-space: nowrap;">
                                {{ "EMAIL_ADDRESS"| translate }}
                            </th>
                            <th style="white-space: nowrap;">
                                {{ "PHONE"| translate }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="item in users_list" class="details">
                            <td style="white-space: nowrap; text-align:center; width:5%">
                                {{ item.stt }}
                            </td>
                            <td style="white-space: nowrap;">
                                {{ item.agent_name }}
                            </td>
                            <td style="white-space: nowrap;">
                                {{ item.full_name }}
                            </td>
                            <td style="white-space: nowrap;">
                                {{ item.email_address }}
                            </td>
                            <td style="white-space: nowrap;width: 10px">
                                {{ item.phone + "'" }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                    </div>
$scope.xuatexcel = () => {
                $rootScope.checkLogout()
        $scope.page1 = {page_index: 1, page_size: $scope.total_row };
        $scope.json1 = JSON.stringify({users: $scope.str_search, company: $scope.company, page: $scope.page1, languages: $scope.languageTemp });
                            console.log("$scope.json", $scope.json);
        UtilityService.getListObjectWithParam('users', 'report_seller_list', $scope.json1).then(function (response) {
            if (response.data.err === 0) {
                $scope.users_list = response.data.dt.users_list;
            for (x in $scope.users_list) {
                $scope.users_list[x].stt = Number(x) + 1;
            }
        }
    });

        $timeout(function () {
            /**cong ty hien tai can xuat excel */
            var data_type = 'data:application/vnd.ms-excel;charset=UTF-8';
            var table_div = document.getElementById('excelbill');
            var table_html = table_div.outerHTML.replace(/ /g, '%20');

            var a = document.createElement('a');
            a.href = data_type + ', ' + table_html;
            a.download = 'project_sale_employeee' + Math.floor((Math.random() * 9999999) + 1000000) + '.xls';
            a.click(function (e) {
                e.preventDefault();
            });
        }, 100)
}