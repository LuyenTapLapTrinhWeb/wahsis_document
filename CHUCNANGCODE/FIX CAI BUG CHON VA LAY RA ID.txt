
http://leocaseiro.github.io/angular-chosen/#chosen-options
 
<script>
    function ngChangeChonvalayra_idtheoclass(loai) {
        angular.element($(".page-body")).scope().ngChangeChonvalayra_idtheoclass(loai);
    }
</script>
<label class="col-md-4 control-label">{{translation.RCSA_COUNTRY_ID}}</label>
<div class="col-md-8">
    <div class="fg-line">
        <select chosen ng-model="country_id" data-placeholder="Choose a Country..." class="form-control country_id" id="states" onchange="ngChangeChonvalayra_idtheoclass('country')"
            ng-options="obj.master_data_id as obj.master_data_name for obj in country_list">
            <option value="">ALL</option>
        </select>
    </div>
</div>
<label class="col-md-4 control-label">{{translation.RCSA_CITY_NAME}}</label>
<div class="col-md-8">
    <div class="fg-line">
        <select ng-model="city_id" class="form-control city_id" chosen id="states" onchange="ngChangeChonvalayra_idtheoclass('city')"
            ng-options="obj.id as obj.value for obj in city_list">
            <option value="">ALL</option>
        </select>
    </div>
</div>
<label class="col-md-4 control-label">{{translation.RCSA_STATE_NAME}}</label>
<div class="col-md-8">
    <div class="fg-line" ng-disabled="state_list">
        <select ng-model="state_id" class="form-control state_id" chosen id="states" onchange="ngChangeChonvalayra_idtheoclass('state')"
            ng-options="obj.id as obj.value for obj in state_list">
            <option value="">ALL</option>
        </select>
    </div>
</div>
<label class="col-md-4 control-label">{{translation.RCSA_APP_ID}}</label>
<div class="col-md-8">
    <div class="fg-line ">
        <select ng-model="app_id" chosen id="states" style="margin-bottom: 5px" class="form-control app_id" 
        onchange="ngChangeChonvalayra_idtheoclass('app')"
        ng-options="obj.app_id as obj.app_name for obj in app_list">
            <option value="">ALL</option>
        </select>
    </div>
</div>
            /**FIX CAI BUG CHON VA LAY RA ID*/
            $scope.fixcaibug_chonvalayra_id = (dropdownlistclass) => {
                /**GET COUNTRY_CODE */
                var dropdownlist = $(dropdownlistclass).val();
                if (dropdownlist !== "") {
                    if ((dropdownlist).split(":").length > 1) {
                        $scope.id = (dropdownlist).split(":")[(dropdownlist).split(":").length - 1];
                    } else {
                        $scope.id = (dropdownlist).split(":")[0];
                    }
                    return $scope.id;
                } else {
                    dropdownlist = "";
                }
            }
            $scope.ngChangeChonvalayra_idtheoclass = function (loai) {
                if (loai === 'country') {
                    /**API  country*/
                    $scope.showAPI_COUNTRY();
                }
                if (loai === "city") {
                    /**API city */
                    $scope.showAPI_CITY();
                }
                if (loai === "state") {
                    /**API state */
                    $scope.showAPI_STATE();
                }
                if (loai === "app") {
                    /**API state */
                    $scope.showAPI_APP();
                }
            };

            $scope.showAPI_COUNTRY = function () {
                /**API THANH PHO*/
                $scope.city_list.length = 0;
                /**GET VALUE BY CLASS */
                $scope.new_country_id = $scope.fixcaibug_chonvalayra_id(".country_id option:selected");
                $http.get(API_URL + "master?cm=list_parent&dt={master_data:{master_group:'PROVINCE',parent_id:'" + $scope.new_country_id + "'}}")
                    .success(function (response) {
                        utility.check_error403(response.err)
                        if (response.err === 0) {
                            $scope.cityTemp = response.dt.master_data;
                            $scope.city_list = [];
                            $scope.state_list = [];
                            $scope.city_list.length = 0;
                            for (var i = 0; i < $scope.cityTemp.length; i++) {
                                var temp = {
                                    id: $scope.cityTemp[i].master_data_id,
                                    value: $scope.cityTemp[i].master_data_name,
                                    c_address: "",
                                };
                                $scope.city_list.push(temp);
                            }
                            // console.table($scope.city_list);
                        }
                    });
                return $scope.new_country_id;
            };
            $scope.showAPI_CITY = () => {
                /**API QUAN HUYEN */
                $scope.state_list.length = 0;
                if ($scope.city_list.length > 0) {

                    /**GET VALUE BY CLASS */
                    $scope.new_city_id = $scope.fixcaibug_chonvalayra_id(".city_id option:selected");


                    // console.log("$scope.cityName", $scope.cityName);
                    $http.get(API_URL + "master?cm=list_parent&dt={ master_data:{master_group:'DISTRICT',parent_id:'" + $scope.new_city_id + "'}}")
                        .success(function (response) {
                            utility.check_error403(response.err)
                            if (response.err === 0) {
                                $scope.district = response.dt.master_data;
                                $scope.state_list = [];
                                for (var i = 0; i < $scope.district.length; i++) {
                                    var temp = {
                                        id: $scope.district[i].master_data_id,
                                        value: $scope.district[i].master_data_name,
                                        c_address: "",
                                    };
                                    $scope.state_list.push(temp);
                                }
                            }
                        });
                    return $scope.new_city_id;
                }
            }
            $scope.showAPI_STATE = () => {
                if ($scope.state_list.length > 0) {
                    /**GET VALUE BY CLASS */
                    $scope.new_state_id = $scope.fixcaibug_chonvalayra_id(".state_id option:selected");
                    return $scope.new_app_id
                }
            }
            $scope.showAPI_APP = () => {
                if ($scope.app_list.length > 0) {
                    /**GET VALUE BY CLASS */
                    $scope.new_app_id = $scope.fixcaibug_chonvalayra_id(".app_id option:selected");
                    return $scope.new_app_id;
                }
            }

$scope.load_data = () => {
                if ($scope.currentPage === 0 || $scope.currentPage === undefined || $scope.currentPage === "" || $scope.currentPage === 0) {
                    $scope.currentPage = 1;
                }
                $scope.page.page_index = $scope.currentPage;
                $scope.page.page_size = parseInt($scope.item_per_page);
                $scope.language_tam = { language_id: $scope.language_id };
                var data = JSON.stringify(
                    {
                        customers: JSON.parse(JSON.stringify($scope.str_search)),
                        languages: JSON.parse(JSON.stringify($scope.language_tam)),
                        page: JSON.parse(JSON.stringify($scope.page)),
                    });
                // console.log("data", data);
                $http({
                    method: 'POST',
                    url: API_URL + "customers",
                    data: $.param({ cm: "customers_setup_app_report", dt: data }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function (response) {
                    utility.check_error403(response.err)
                    if (response.err === 0) {
                        $scope.items = response.dt.customers_list;
                        $scope.list_page = [];
                        $scope.currentPage = 1;
                        $scope.total_row = response.dt.page.total_row;
                        $scope.total_page = response.dt.page.total_page;
                        for (var i = 1; i <= $scope.total_page; i++) {
                            var j = { val: "", test: "" };
                            j.val = i;
                            j.test = i;
                            $scope.list_page.push(j);
                        }
                    } else {
                        utility.notify("Notice ", "Error", "error");
                    }
                }).error(function (response) {
                    utility.check_error403(response.err)
                    utility.notify("Notice ", "Error", "error");
                });
            }
            // search condition
            $scope.search = function () {
                 // "country_id":"VN",
                if ($scope.new_country_id !== null && $scope.new_country_id !== "" && $scope.new_country_id !== undefined && $scope.new_country_id === { "$$hashKey": "object:42" }) {
                    $scope.str_search.country_id = $scope.new_country_id;
                } else { $scope.str_search.country_id = "VN" }
                // "state":"79", state: "",/**Thành phố city */
                if ($scope.new_state_id !== null && $scope.new_state_id !== "" && $scope.new_state_id !== undefined) {
                    $scope.str_search.state = $scope.new_city_id;
                } else { $scope.str_search.state = "" }
                // "city":"DIS.0017", city: "",/**Quận dictrict state*/
                if ($scope.new_city_id !== null && $scope.new_city_id !== "" && $scope.new_city_id !== undefined) {
                    $scope.str_search.city = $scope.new_state_id;
                } else { $scope.str_search.city = "" }
                // "zip_code": "",
                if ($scope.new_app_id !== null && $scope.new_app_id !== "" && $scope.new_app_id !== undefined) {
                    $scope.str_search.app_id = $scope.new_app_id;
                } else { $scope.str_search.app_id = 0 }
                $scope.load_data();
            };