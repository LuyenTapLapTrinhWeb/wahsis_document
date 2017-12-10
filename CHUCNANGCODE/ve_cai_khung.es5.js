$scope.load_employees_dependent = function () {
    if (item != null && item.employee_id != null && item.employee_id > 0) {
        var dataED = JSON.stringify({
            "employees_dependent": { "employee_id": item.employee_id },
            "languages": $scope.languageTemp,
            "company": $scope.company
        });
        UtilityService.getListObjectWithParam("employees_dependent", 'search', dataED).then(
            function (response) {
                if (response.data.err === 0) {
                    // console.table($scope.relation_ship_list)
                    $scope.employees_dependent_list = response.data.dt.employees_dependent_list;
                    var ed_list = response.data.dt.employees_dependent_list;
                    for (x in ed_list) {
                        ed_list[x].stt = parseInt(x) + 1;
                        $scope.gender_list.forEach(element => {
                            /**0: female, 1:male */
                            if (element.value === ed_list[x].sex) {
                                ed_list[x].sex_name = element.option;
                            }
                        });
                        /**IS_EMERGENCY, IS_EMPLOYEE, NONE_TAX */
                        $scope.yesno_list.forEach(element => {
                            /**0: no, 1:yes */
                            if (element.value === ed_list[x].is_emergency) {
                                ed_list[x].is_emergency_name = element.option;
                            }
                            if (element.value === ed_list[x].is_employee) {
                                ed_list[x].is_employee_name = element.option;
                            }
                            if (element.value === ed_list[x].none_tax) {
                                ed_list[x].none_tax_name = element.option;
                            }
                        });
                        /**RELATION_SHIP */
                        $scope.relation_ship_list.forEach(element => {
                            if (element.master_data_id === ed_list[x].relation_ship) {
                                ed_list[x].relation_ship_name = element.master_data_name;
                            }
                        });
                        console.table(ed_list[x])
                    }
                    $scope.employees_dependent_list = ed_list;
                    $scope.list_page = [];
                    $scope.total_page = response.data.dt.page.total_page;
                    $scope.total_row = response.data.dt.page.total_row;
                    $scope.stt = 1;
                    for (var i = 1; i <= $scope.total_page; i++) {
                        var j = { val: "", test: "" };
                        j.val = i;
                        j.test = i;
                        $scope.list_page.push(j);
                    }
                } else {
                    swal("Err", "Error!", "err")
                }
            },
            function (err) {
                swal("Err", err, "err")
            }
        )//end function
    }
}
    < thead >
    <tr>
        <th style="width: 5%">{{ "STT"| translate }}</th>
        <th style="white-space: nowrap">{{ "FULL_NAME"| translate }}</th>
        <th style="white-space: nowrap">{{ "GENDER"| translate }}</th>
        <th style="white-space: nowrap">{{ "DATE_OF_BIRTH"| translate }}</th>
        <th style="white-space: nowrap">{{ "PHONE"| translate }}</th>
        <th style="white-space: nowrap">{{ "EMAIL_ADDRESS"| translate }}</th>
        <th style="white-space: nowrap">{{ "ADDRESS"| translate }}</th>
        <th style="white-space: nowrap">{{ "RELATION_SHIP"| translate }}</th>
        <th style="white-space: nowrap">{{ "IS_EMERGENCY"| translate }}</th>
        <th style="white-space: nowrap">{{ "IS_EMPLOYEE"| translate }}</th>
        <th style="white-space: nowrap">{{ "OCCUPATION"| translate }}</th>
        <th style="white-space: nowrap">{{ "ID_NO"| translate }}</th>
        <th style="white-space: nowrap">{{ "TAX_CODE"| translate }}</th>
        <th style="white-space: nowrap">{{ "NONE_TAX"| translate }}</th>
        <th style="white-space: nowrap">{{ "START_DATE"| translate }}</th>
        <th style="white-space: nowrap">{{ "END_DATE"| translate }}</th>
        <th style="white-space: nowrap">{{ "REMARK"| translate }}</th>
    </tr>
                                                    </thead >
    <tbody>
        <tr ng-repeat="itemList in employees_dependent_list" class="details" ng-click="employee_dependent_click(itemList.employees_dependent_id, itemList)"
            id="employee_dependent_{{itemList.employees_dependent_id}}" ng-dblclick="employee_dependent_dbclick(itemList.employees_dependent_id, itemList)">
            <td>{{ itemList.stt }}</td>
            <td>{{ itemList.full_name }}</td>
            <td>{{ itemList.sex_name }}</td>
            <td>{{ kieu_ngay_gio_2(itemList.date_of_birth)}}</td>
            <td>{{ itemList.phone }}</td>
            <td>{{ itemList.email_address }}</td>
            <td>{{ itemList.address }}</td>
            <td>{{ itemList.relation_ship_name }}</td>
            <td>{{ itemList.is_emergency_name }}</td>
            <td>{{ itemList.is_employee_name }}</td>
            <td>{{ itemList.occupation }}</td>
            <td>{{ itemList.id_no }}</td>
            <td>{{ itemList.tax_code }}</td>
            <td>{{ itemList.none_tax_name }}</td>
            <td>{{ kieu_ngay_gio_2(itemList.start_date)}}</td>
            <td>{{ kieu_ngay_gio_2(itemList.end_date)}}</td>
            <td>{{ itemList.remark }}</td>
        </tr>
    </tbody>