Location_Service,$timeout,
type_list roomTypeList
/**FIX CAI BUG TREE */
$scope.is_hide = true
$scope.change_hide = function () {
    $timeout(function () {
        if ($scope.is_hide == false) {
            $scope.is_hide = true
        } else {
            $scope.is_hide = false
        }
        $scope.$apply();
    }, 50)

}
var thaydoi = function () {
    if ($(".tree_left").hasClass("an")) {
        $(".tree_left").removeClass("an")
        $(".tree_left").addClass("hien")

        $scope.change_hide();

        $(".content_right").removeClass("col-md-12 col-xs-12")
        $(".content_right").addClass("col-md-9 col-xs-12 pull-right")

        $(".truong_search").removeClass("col-xs-12 col-md-4")
        $(".truong_search").addClass("col-xs-12 col-md-6")

    } else {
        $(".tree_left").removeClass("hien")
        $(".tree_left").addClass("an")
         
        $scope.change_hide();
        $(".content_right").removeClass("col-md-9 col-xs-12 pull-right")
        $(".content_right").addClass("col-md-12 col-xs-12")
        $(".truong_search").removeClass("col-xs-12 col-md-6")
        $(".truong_search").addClass("col-xs-12 col-md-4")
    }
}
$scope.thaydoi = () => {
    thaydoi();
} 
UtilityService.decentralization("pms_report_project_apartment_for_agents").then(function (response) {

    if (response.data.err === 0 && response.data.dt !== undefined) {
        $scope.allow = utility.get_allow(response.data);
        if (response.data.dt.permission_list.length > 0) {
            /**Dữ liệu cay tòa nhà */
            Location_Service.getList(language).then(function (response) {
                if (response.err === 0) {
                    $scope.treeData = []
                    $scope.location_list = response.dt.locations_list;
                    for (var i = 0; i < $scope.location_list.length; i++) {
                        $scope.tam = {
                            "id": "",
                            "parent": "",
                            "text": "",
                            "type": "",
                            "state": {
                                "opened": true,
                            },
                        }
                        if ($scope.location_list[i].location_id === 1) {
                            $scope.tam.id = $scope.location_list[i].location_id;
                            $scope.tam.parent = "#";
                            $scope.tam.text = $scope.location_list[i].location_name;
                            $scope.tam.type = "default";
                            $scope.treeData.push($scope.tam)
                        } else {
                            $scope.tam.id = $scope.location_list[i].location_id;
                            $scope.tam.parent = $scope.location_list[i].parent_id;
                            $scope.tam.text = $scope.location_list[i].location_name;
                            $scope.tam.type = "default";
                            $scope.treeData.push($scope.tam)
                        }
                    }
                    $scope.treeConfig = {
                        'plugins': ['types', 'dnd', 'checkbox'],
                        'types': {
                            'default': {
                                'icon': 'fa fa-folder',
                            },
                            'html': {
                                'icon': 'fa fa-file-code-o'
                            },
                            'svg': {
                                'icon': 'fa fa-file-picture-o'
                            },
                            'css': {
                                'icon': 'fa fa-file-code-o'
                            },
                            'img': {
                                'icon': 'fa fa-file-image-o'
                            },
                            'js': {
                                'icon': 'fa fa-file-text-o'
                            },
                            "checkbox": {
                                "keep_selected_style": false
                            },
                        }
                    };
                    console.log($scope.treeData)
                    $timeout(function () {
                        $('#jstree').jstree();
                        $('#jstree').on("changed.jstree", function (e, data) {
                            console.log($scope.rooms_list)
                            //                                console.log(data.selected);
                            $scope.selected = data.selected
                            console.log(data.selected)
                            $scope.rooms = []
                            $timeout(function () {
                                for (var i = 0; i < data.selected.length; i++)
                                {
                                    for (var j = 0; j < $scope.rooms_list.length; j++)
                                    {
                                        if (parseInt(data.selected[i]) === parseInt($scope.rooms_list[j].location_id))
                                            $scope.rooms.push($scope.rooms_list[j])
                                    }
                                }
                                console.log($scope.rooms)
                            }, 100);
                        });
                    }, 1);
                    $scope.branch = {company_id: com_id}
                    var dtJSONCompany = JSON.stringify({
                        company: $scope.branch
                    })
                    UtilityService.getListObjectWithParamDev("company", "detail", dtJSONCompany).then(function (response) {
                        if (response.data.err === 0) {
                            $scope.branch_detail = response.data.dt.company;
                            ///$scope.search();
                        }
                    });
                }
            });
        }
    }
})
/**Thêm location_id vào điều kiện search */
$scope.search = function () {
    $rootScope.checkLogout();
    
    if ($scope.selected.length > 0) {
        $scope.str_search_rooms.location_id = $scope.selected;
    } else {
        $scope.str_search_rooms.location_id = -1;
    }
}
<link href="css/style_form.css" rel="stylesheet" type="text/css" />
<!-- <link href="css/style_form_view.css" rel="stylesheet" type="text/css"/>
<style>


    /* ============================style for tree=========================== */

    .an {
        display: none
    }

    .hien {
        display: inherit
    }

    .text_doc {
        width: 150px;
        position: absolute;
        background: #00b193;
        color: white;
        /*border-radius: 7px;*/
        cursor: pointer;
        text-align: center;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .text_doc1 {
        padding: 0px;
        transform: rotate(90deg);
        transform-origin: left top;
    }
</style>
    /** tree html */
    <div class="ibox-title">
        <div class="row ">
            <div class="col-lg-12">
                <div class="pull-right">
                    <div class="btn-group" uib-dropdown>
                        <button type="button" class="btn btn-outline btn-primary btn-sm" uib-dropdown-toggle style="font-size:13px">
                            {{ "EXPORT"| translate }}
                            <span class="caret"></span>
                        </button>
                        <ul role="menu" uib-dropdown-menu="">
                            <!-- <li><a data-ng-click="excel()">Excel</a></li> -->
                    <li>
                                <a data-ng-click="pdf()">PDF</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    /** col 5-7 */
    <div class="ibox-content">
    <div class="panel-body row">
        <div class="col-md-1 row show_tree text_doc1 paddRight0" ng-if='is_hide'>
            <div ng-click="thaydoi()" class='tree_text text_doc'>
                {{ "FLOOR_PLAN"| translate }}
            </div>
        </div>
        <div class="col-md-3 row tree_left an paddRight0 rightTreeSmallScreen">
            <div class="col-md-12 title-floor">
                <div class="row">
                    {{ "FLOOR_PLAN"| translate }}
                    <div ng-click="thaydoi()" class="closeicon">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="well widthfloor">
                        <div>
                        </div>
                        <div id="jstree" js-tree="treeConfig" ng-model="treeData" tree="treeInstance">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12 well pull-right content_right">
            <div class="row flexWrap">
                <div class="col-md-4 col-sm-6 col-xs-12 truong_search marginBot5">
                    <div class="row">
                        <div class="col-md-5 col-sm-5 col-xs-12 ">
                            <label>
                                {{ "APARTMENT_TYPE"| translate }}
                            </label>
                        </div>
                        <div class="col-md-7 col-sm-7 col-xs-12">
                            <select chosen id="states" class="chosen-select width100" ng-model="room_type_id" ng-options="obj.room_type_id as obj.name for obj in type_list"
                                tabindex="4">
                                <option selected="" value="">
                                    {{"ALL"|translate}}
                                </option>
                                <option disabled></option>
                            </select>
                        </div>
                    </div>
                </div>


                <div class="col-md-4 col-sm-6 col-xs-12 truong_search marginBot5">
                    <div class="row">
                        <div class="col-md-5 col-sm-5 col-xs-12 ">
                            <label>
                                {{ "VIEW_APARTMENT"| translate }}
                            </label>
                        </div>
                        <div class="col-md-7 col-sm-7 col-xs-12">
                            <select chosen id="states" class="chosen-select width100" ng-model="view_id" ng-options="x.master_data_id as x.master_data_name for x in viewList"
                                type="text">
                                <option value="">
                                    {{"ALL"|translate}}
                                </option>

                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12 truong_search marginBot5">
                    <div class="row">
                        <div class="col-md-5 col-sm-5 col-xs-12 ">
                            <label>
                                {{ "GROUP_CODE"| translate }}
                            </label>
                        </div>
                        <div class="col-md-7 col-sm-7 col-xs-12">
                            <input type="text" class="form-control" ng-model="agent_code">

                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12 truong_search marginBot5">
                    <div class="row">
                        <div class="col-md-5 col-sm-5 col-xs-12 ">
                            <label>
                                {{ "SELLER_GROUP"| translate }}
                            </label>
                        </div>
                        <div class="col-md-7 col-sm-7 col-xs-12">
                            <select chosen="" class="chosen-select width100" id="states" ng-model="agent_name" ng-options="obj.agent_name  as obj.agent_name for obj in agentsListcbb"
                                required="true">
                                <option value="">
                                    {{"ALL"|translate}}
                                </option>
                                <option disabled="">
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 col-sm-6 col-xs-12 truong_search marginBot5">
                    <div class="row">
                        <div class="col-md-5 col-sm-5 col-xs-12 ">
                            <label>{{ "FROM_DAY"| translate }}</label>
                        </div>
                        <div class="col-md-7 col-sm-7 col-xs-12">
                            <input type="text" id="fromDate" ng-blur="kiemtradate()" class="form-control" ng-model="fromDate">
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12 truong_search marginBot5">
                    <div class="row">
                        <div class="col-md-5 col-sm-5 col-xs-12 ">
                            <label>{{ "TO_DAY"| translate }}</label>
                        </div>
                        <div class="col-md-7 col-sm-7 col-xs-12">
                            <input type="text" id="toDate" class="form-control" ng-blur="kiemtradate()" ng-model="toDate">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-md-12">
                <button class="btn btn-primary pull-right" data-ng-click="search()" ng-disabled="allow[1] === false" type="button">
                    <i class="fa fa-search"></i> {{ "SEARCH"| translate }}
                </button>
            </div>

        </div>
        <div class="row">
            <div class="col-sm-2 " style="padding-left: 0px;padding-top: 0px; margin-bottom: 5px;padding-right: 0px">
                <p ng-show="items.length === 0" style="margin-bottom: 0px">
                    <strong style="color: red">
                        {{"NO_RESULT"|translate}}
                    </strong>
                </p>
            </div>
            <div class='col-md-12'>
                <div class="text-right " id="div_paging">
                    <button ng-disabled="currentPage1 == 1" ng-click="load_data(4)" class="btn btn-default btn-xs black">
                        <i class="ion-arrow-left-a"></i>
                        {{ "FIRST"| translate }}
                    </button>
                    <button ng-disabled="currentPage1 == 1" ng-click="load_data(1)" class="btn btn-default btn-xs black">
                        <i class="ion-chevron-left"></i>
                        {{ "PREVIOUS"| translate }}
                    </button>
                    {{ "ITEM_PER_PAGE"| translate }}:
                    <select id="page" ng-model="item_per_page" ng-change="item_per_page2()" ng-options="x.value as x.text for x in item_per_page1"></select>
                    {{ "PAGE"| translate }}
                    <select id="page" class="page" ng-model="currentPage1" ng-change="load_data(2)" ng-options="x.val as x.test for x in list_page"></select>
                    {{ "TOTAL_PAGE"| translate }}: {{ total_page }}
                    <button ng-disabled="currentPage1 == total_page || total_page == 0" ng-click="load_data(3)" class="btn btn-default btn-xs black">
                        <i class="ion-chevron-right"></i>
                        {{ "NEXT"| translate }}
                    </button>
                    <button ng-disabled="currentPage1 == total_page || total_page == 0" ng-click="load_data(5)" class="btn btn-default btn-xs black">
                        <i class="ion-arrow-right-a"></i>
                        {{ "LAST"| translate }}
                    </button> | {{ "TOTAL_RESULT"| translate }}: {{ total_row }}
                </div>
            </div>
            <div class='col-md-12'>
                <div class="table-responsive" style="overflow-x: auto; ">
                    <table style="display: table;overflow-x: inherit; max-height: 300px; min-width:100%" data-page-length='{{page_length}}' datatable="ng"
                        dt-options="dtOptions" class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th style="white-space: nowrap;">{{"STT"|translate}}</th>
                                <th style="white-space: nowrap;">{{"GROUP_CODE"|translate}}</th>
                                <th style="white-space: nowrap;">{{"SELLER_GROUP"|translate}}</th>
                                <th style="white-space: nowrap;">{{"TOTAL_SALE"|translate}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="item in userList">
                                <td style="white-space: nowrap;">{{item.stt}}</td>
                                <td style="white-space: nowrap;">{{item.agent_code}}</td>
                                <td style="white-space: nowrap;">{{item.agent_name}}</td>

                                <td style="white-space: nowrap; text-align: right;font-weight: normal ">{{kieu(item.total_sales)}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
    /** col 4-8 */
    <div class="ibox-content">
        <div class="panel-body row" style="padding-top:0px">
            <div class="col-md-1 row show_tree text_doc1" style="padding-right: 0px;" ng-if='is_hide'>
                <div ng-click="thaydoi()" class='tree_text text_doc'>
                    {{ "FLOOR_PLAN"| translate }}
                </div>
            </div>
            <div class="col-md-3 row tree_left an">
                <div class="col-md-12" style="height: 25px;    background: #1eb293;color: white;    padding-top: 3px;padding-left: 25px;">
                    <div class="row">
                        {{ "FLOOR_PLAN"| translate }}
                        <div ng-click="thaydoi()" style="position: absolute;    right: 2%; top: 10%;">
                            <i class="fa fa-times" aria-hidden="true" style="transform: rotate(90deg)"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="row">
                        <div class="well" style="padding-bottom: 0px ;margin-bottom: 5px!important;padding-left: 0px;overflow-y: scroll;height: 426px">
                            <div>
                            </div>
                            <div id="jstree" js-tree="treeConfig" ng-model="treeData" tree="treeInstance">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="well content_right col-md-12 col-xs-12">
                <div class="row">
                    <div class="col-xs-12 col-md-4 truong_search">
                        <div class="form-group row">
                            <label class="col-xs-12 col-md-4">
                                {{ "APARTMENT_TYPE"| translate }}
                            </label>
                            <div class="col-xs-12 col-md-8">
                                <select chosen id="states" class="chosen-select" ng-options="x.room_type_id as x.name for x in type_list" ng-model="room_type_id">
                                    <option value="">{{ "ALL"| translate }}</option>
                                    <option disabled></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4 truong_search">
                        <div class="form-group row">
                            <label class="col-xs-12 col-md-4">
                                {{ "VIEW_APARTMENT"| translate }}
                            </label>
                            <div class="col-xs-12 col-md-8">
                                <select chosen id="states" class="chosen-select" ng-model="view_id" ng-options="x.master_data_id as x.master_data_name for x in viewList"
                                    type="text">
                                    <option value="">
                                        {{ "ALL"| translate }}
                                    </option>
                                    <option disabled></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4 truong_search">
                        <div class="form-group row">
                            <label class="col-xs-12 col-md-4">{{ "CONTRACT_NO"| translate }}</label>
                            <div class="col-xs-12 col-md-8">
                                <input class="form-control" type="text" ng-model="contract_no" />


                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4 truong_search">
                        <div class="form-group row">
                            <label class="col-xs-12 col-md-4">{{ "SALE_EMPLOYEES1"| translate }}</label>
                            <div class="col-xs-12 col-md-8">
                                <select chosen id="states" class="chosen-select" ng-model="handover_by_id" ng-change="" ng-options="obj.employee_id as obj.employee_name for obj in employee_list">
                                    <option value="">{{ "ALL"| translate }}</option>
                                    <option disabled></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4 truong_search">
                        <div class="form-group row">
                            <label class="col-xs-12 col-md-4">{{ "handover_content"| translate }}</label>
                            <div class="col-xs-12 col-md-8">
                                <input class="form-control" type="text" ng-model="handover_content" />

                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4 truong_search">
                        <div class="form-group row">
                            <label class="col-xs-12 col-md-4">{{ "repair_content"| translate }}</label>
                            <div class="col-xs-12 col-md-8">
                                <input class="form-control" type="text" ng-model="repair_content" />

                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4 truong_search">
                        <div class="form-group row">
                            <label class="col-xs-12 col-md-4">{{ "handover_date"| translate }}</label>
                            <div class="col-xs-12 col-md-8">
                                <input class="form-control" type="text" id='fromDate' placeholder="dd-MM-yyyy" ng-model="handover_date" />
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4 truong_search">
                        <div class="form-group row">
                            <label class="col-xs-12 col-md-4">{{ "TO_DATE2"| translate }}</label>
                            <div class="col-xs-12 col-md-8">
                                <input class="form-control" type="text" id='toDate' placeholder="dd-MM-yyyy" ng-model="to_date" />

                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4 truong_search">
                        <div class="form-group row">
                            <label class="col-xs-12 col-md-4">{{ "STATUS"| translate }}</label>
                            <div class="col-xs-12 col-md-8">
                                <select chosen id="states" class="chosen-select" ng-model="status_id" ng-change="status()" ng-options="obj.apartment_status_id as obj.value for obj in status1">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4 truong_search">
                        <div class="form-group row">
                            <label class="col-xs-12 col-md-4">{{ "REMARK"| translate }}</label>
                            <div class="col-xs-12 col-md-8">
                                <textarea class="form-control" ng-model="remark" type="text" rows="1"></textarea>

                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-12">
                        <button class="btn btn-primary pull-right" data-ng-click="search()" ng-disabled="allow[1] === false" type="button">
                            <i class="fa fa-search"></i> {{ "SEARCH"| translate }}
                        </button>
                    </div>
                    <div class='col-md-12'>
                                <div class="row">
                                    <div class="col-sm-2 pull-left">
                                        <p ng-show="items.length === 0" style="margin-bottom: 0px">
                                            <strong style="color: red">
                                                {{"NO_RESULT"|translate}}
                                            </strong>
                                        </p>
                                    </div>
                                    <div class="col-sm-8 pull-right text-right">
                                        <button ng-disabled="currentPage1 == 1" ng-click="load_data(4)" class="btn btn-default btn-xs black">
                                            <i class="ion-arrow-left-a"></i>
                                            {{ "FIRST"| translate }}
                                        </button>
                                        <button ng-disabled="currentPage1 == 1" ng-click="load_data(1)" class="btn btn-default btn-xs black">
                                            <i class="ion-chevron-left"></i>
                                            {{ "PREVIOUS"| translate }}
                                        </button>
                                        {{ "ITEM_PER_PAGE"| translate }}:
                                        <select id="page" ng-model="item_per_page" ng-change="item_per_page2()" ng-options="x.value as x.text for x in item_per_page1"></select>
                                        {{ "PAGE"| translate }}
                                        <select id="page" class="page" ng-model="currentPage1" ng-change="load_data(2)" ng-options="x.val as x.test for x in list_page"></select>
                                        {{ "TOTAL_PAGE"| translate }}: {{ total_page }}
                                        <button ng-disabled="currentPage1 == total_page || total_page == 0" ng-click="load_data(3)" class="btn btn-default btn-xs black">
                                            <i class="ion-chevron-right"></i>
                                            {{ "NEXT"| translate }}
                                        </button>
                                        <button ng-disabled="currentPage1 == total_page || total_page == 0" ng-click="load_data(5)" class="btn btn-default btn-xs black">
                                            <i class="ion-arrow-right-a"></i>
                                            {{ "LAST"| translate }}
                                        </button> | {{ "TOTAL_RESULT"| translate }}: {{ total_row }}
                                    </div>
                                </div>
                            </div>
                    <div class='col-md-12'>
                    
                        <div class="table-responsive" style="overflow-x: auto; ">
                            <table style="display: table;overflow-x: inherit; max-height: 300px; min-width:100%" data-page-length='{{page_length}}' datatable="ng" dt-options="dtOptions"
                                class="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th style="white-space: nowrap">{{ "STT"| translate }}</th>
                                        <th style="white-space: nowrap">{{ "CONTRACT_NO"| translate }}</th>
                                        <th style="white-space: nowrap">{{ "room_id"| translate }}</th>
                                        <th style="white-space: nowrap">{{ "MAINTENANCE_VALUE"| translate }}</th>
                                        <th style="white-space: nowrap">{{ "MAINTENANCE_FEE"| translate }}</th>
                                        <th style="white-space: nowrap">{{ "handover_by_id"| translate }}</th>
                                        <th style="white-space: nowrap">{{ "handover_date"| translate }}</th>
                                        <th style="white-space: nowrap">{{ "handover_content"| translate }}</th>
                                        <th style="white-space: nowrap">{{ "repair_content"| translate }}</th>
                                        <th style="white-space: nowrap">{{ "remark"| translate }}</th>
                                        <th style="white-space: nowrap">{{ "STATUS"| translate }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="item in handover_list" id="apartment_{{item.apartment_handover_id}}" ng-click="apartment_list_click(item.apartment_handover_id, item)"
                                        ng-dblclick="apartment_list_dbclick(item.apartment_handover_id, item)">
                                        <td style="white-space: nowrap">{{ item.stt }}</td>
                                        <td style="white-space: nowrap">{{ item.contract_no }}</td>
                                        <td style="white-space: nowrap">{{ item.room_name }}</td>
                                        <td style="white-space: nowrap;text-align: right">{{ item.maintenance_value }}</td>
                                        <td style="white-space: nowrap;text-align: right">{{ setchannumber(item.maintenance_fee)}}</td>
                                        <td style="white-space: nowrap">{{ item.handover_by_name }}</td>
                                        <td style="white-space: nowrap;text-align: center">{{ setdate(item.handover_date)}}</td>
                                        <td style="white-space: nowrap">{{ item.handover_content }}</td>
                                        <td style="white-space: nowrap">{{ item.repair_content }}</td>
                                        <td style="white-space: nowrap">{{ item.remark }}</td>
                                        <td style="white-space: nowrap">{{ item.status_name }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>