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
        // $(".show_tree").removeClass("hien")
        // $(".show_tree").addClass("an")
        // $(".tree_text").removeClass("text_doc")

        $scope.change_hide();

        $(".content_right").removeClass("col-md-12 col-xs-12")
        $(".content_right").addClass("col-md-9 col-xs-12 pull-right")

        $(".truong_search").removeClass("col-xs-12 col-md-4")
        $(".truong_search").addClass("col-xs-12 col-md-6")

    } else {
        $(".tree_left").removeClass("hien")
        $(".tree_left").addClass("an")
        // $(".show_tree").removeClass("an")
        // $(".show_tree").addClass("hien")
        // $(".tree_text").addClass("text_doc")

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
                        <div class="table-responsive" style="overflow-x: auto; max-height: 300px">
                            <table style="display: table;overflow-x: inherit;min-width:100%" data-page-length='{{page_length}}' datatable="ng" dt-options="dtOptions"
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