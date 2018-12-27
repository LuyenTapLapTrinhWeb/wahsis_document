$scope.ngchangeemployee_id = function (employee_id) {
    get_employee_name_by_employee_id(employee_id);
}
function select_employeename_from_employeelist_where_employeeid(employee_list, employee_id) {
    var employee_name = "";
    if (employee_list && employee_id) {
        for (var x in employee_list) {
            if (employee_list[x].employee_id === employee_id) {
                employee_name = employee_list[x].employee_name;
                $scope.employee_id = employee_list[x].employee_id;
            }
        }
        return employee_name;
    } else {
        if (employee_list) { console.error("not found ") }; if (employee_id) { console.error("not found ") };
        return "";
    }
}

function get_employee_name_by_employee_id(employee_id) {
    UtilityService.getListObject("employees", language).then(function (response) {
        if (response.data.err === 0) {
            $scope.employee_list = response.data.dt.employees_list;
            //fix cai bug sap xep theo mot cot trong json array
            $scope.employee_list.sort(function (a, b) {
                return Number(a.employee_id) - Number(b.employee_id);
            });
            if (employee_id) {
                $scope.employee_name = select_employeename_from_employeelist_where_employeeid($scope.employee_list, employee_id);
            }
        }
    });
}
if (kiem_tra_nhap_truoc_khi_luu()) {
    $scope.employee_name = select_employeename_from_employeelist_where_employeeid($scope.employee_list, $scope.employee_id);
}
<div class="col-md-6 col-sm-6 col-xs-12 marginBot5">
    <div class="row">
        <div class="col-md-5">
            <label>
                {{ "EMPLOYEE"| translate }}
                <span class="c-red">*</span>
            </label>
        </div>
        <div class="col-md-7">
            <select chosen="" class="chosen-select" ng-change="ngchangeemployee_id(employee_id)" id="states" ng-model="employee_id" ng-options="obj.employee_id as obj.employee_name for obj in employee_list">
                <option value=""> {{ "ALL"| translate }} </option>
                <option disabled=""> </option>
            </select>
            employee_name: {{ employee_name }}
        </div>
    </div>
</div>