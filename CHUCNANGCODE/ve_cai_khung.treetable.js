company_user_image = "";
mainApp.controller("setup_master_resource_ctrl", ["$scope", "$rootScope", "$routeParams", "$uibModal", "$http", "API_URL", "API_URL_PMS_PARTNER", "API_URL_PARTNER", 'uiGridConstants', 'uiGridTreeViewConstants', function ($scope, $rootScope, $routeParams, $uibModal, $http, API_URL, API_URL_PMS_PARTNER, API_URL_PARTNER, uiGridConstants, uiGridTreeViewConstants) {
  $scope.items = [];
  $scope.selectedItems = [];
  $scope.filterOptions = {
    filterText: ""
  };
  $scope.selected = [];
  $scope.dbclick = false;
  $scope.trangthai = "";
  com_id = $routeParams.company_id;
  $scope.str_search = { parent_id: "pms_house_keeping", module_id: "" };
  function checkArray(array) {
    return array !== undefined ? true : false;
  }
  function getArray(array) {
    return checkArray(array) ? array : [];
  }
  function getLevel(level) {
    return checkArray(level) ? level : 0;
  }
  var writeoutNode = function (childArray, currentLevel, dataArray) {
    var childArray = getArray(childArray);
    var currentLevel = getLevel(currentLevel);
    var dataArray = getArray(dataArray);
    childArray.forEach(function (childNode) {
      if (childNode.children.length > 0) {
        childNode.$$treeLevel = currentLevel;
      }
      dataArray.push(childNode);
      writeoutNode(childNode.children, currentLevel + 1, dataArray);
    });
  };
  var URL_SEARCH =
    API_URL_PMS_PARTNER +
    "resources?cm=search&dt={'resources':" +
    JSON.stringify($scope.str_search) +
    ",'languages':{'language_id':" +
    language +
    "},'company':{'company_id':" +
    com_id +
    "}}";
  $scope.load_info = () => {
    $http.get(URL_SEARCH).success(function (response) {
      if (response.err === 0) {
        $scope.items = response.dt.resources_list;
        for (i in $scope.items) {
          $scope.items[i].id = i;
          $scope.items[i].resources_name = $scope.items[i].resources_name + " " + "(" + $scope.items[i].children.length + ")";
          for (j in $scope.items[i].children) {
            $scope.items[i].children[j].parentId = $scope.items[i].id
            $scope.items[i].children[j].children = []
          }
        }
        writeoutNode($scope.items, 0, $scope.gridOptions.data);
      } else {
        utility.notify("Notice ", "Error", "error");
      }
    });
  }
  /**API LIST */
  function getDatas() {
    var u = utility.get_url(u_id, "frm_company");
    $http.get(API_URL + u).success(function (response) {
      utility.check_error403(response.err);
      // console.log(response);
      if (response.err === 0 && response.dt !== undefined) {
        if (response.dt.permission_list.length > 0) {
          $scope.allow = utility.get_allow(response);
          $scope.load_info();
        }
      }
    });
  }
  //$scope.totalServerItems = 0;
  $scope.$on("$viewContentLoaded", function () {
    getDatas();
  });
  //---------------Funtion Method------------------------------
  $scope.create = function () {
    openPopup($scope.items, { users_id: 0 });
  };
  $scope.company = function () {
    window.location = "/#/company";
  };
  $scope.edit = function () {

    var row = $scope.selectedItems;
    if ($scope.dbclick === false) {
      var row = $scope.selectedItems;
    } else {
      var row = $scope.selected;
      $scope.dbclick = false;
    }
    if (row.length > 0) {
      openPopup($scope.items, row[0]);
    } else {
      Notify(
        "Please choose item to modify.",
        "top-right",
        "5000",
        "yellow",
        "fa-check",
        true
      );
    }
  };
  /**FIX CAI BUG TOGGLE TR TD */

  function handler(event) {
    var target = $(event.target);
    if (target.is("li")) {
      target.children().toggle();
    }
  }
  $("ul").click(handler).find("ul").hide();

  $scope.rowDblClick = function (row) {
    var tam = {};
    tam = row.entity;
    $scope.selected = [];
    $scope.selected.push(tam);
    $scope.dbclick = true;
    $scope.edit();
  };

  $scope.delete = function () {
    var row = $scope.selectedItems;
    if (row.length > 0) {
      utility.dialog("Do you want to delete it", "warning", function () {
        $http({
          method: "POST",
          url: API_URL_PARTNER + "users?cm=delete&dt={company:{company_id:" + $routeParams.company_id + "},resources:{resources_id:" + $scope.selectedItems[0].resources_id + "}}"
        }).success(function (data) {
          utility.check_error403(data.err)
          if (data.err === 0) {
            swal({ title: "Deleted!", text: "Delete Success", timer: 2000, type: "success" });
            $scope.load_info();
          } else {
            swal({ title: "Error", text: "Delete Error", timer: 2000, type: "error" });
          }
        }).error(function (data) {
          utility.check_error403(data.err)
          swal({ title: "Error", text: "Delete Error", timer: 2000, type: "error" });
        });
      }, function () {
        console.log("Nok");
        return;
      });
    } else {
      Notify('Please choose item size to delete', 'top-right', '5000', 'red', 'fa-error', true);
    }
  };

  //---------------End Funtion Method------------------------------
  //---------------Call popup------------------------------
  //---------------End Funtion Method------------------------------
  //---------------Call popup------------------------------
  function openPopup(item, loai) {
    var modalInstance = $uibModal.open({
      templateUrl: "views/setup_master_resource/setup_master_resource.new.html",
      controller: "crud_setup_master_resource_ctrl",
      windowClass: "window-class visible",
      backdrop: false, // "static",
      dragable: false,
      size: 'lg',
      locked: true,
      resolve: {
        item: function () {
          return item;
        },
        loai: function () {
          return loai;
        },
        lang: function () {
          return $scope.translation;
        },
      }
    }).result.then(function () {
      //reload page ngoai sau khi tat popup
      getDatas();
    });
  }
  $scope.gridOptions = {
    showTreeExpandNoChildren: true,
    enableRowSelection: false,
    enableRowHeaderSelection: false,
    filterOptions: $scope.filterOptions,
    multiSelect: false,
    enableSorting: true,
    rowTemplate: '<div ng-dblclick="grid.appScope.rowDblClick(row)" external-scopes="gridHandlers" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ \'ui-grid-row-header-cell\': col.isRowHeader }\" ui-grid-cell></div>',
    rowHeight: 36, columnDefs: [
      { field: 'resources_id', visible: false },
      {
        field: 'parent_id', visible: false, sort: {
          direction: uiGridConstants.ASC,
          priority: 1
        }
      },
      { field: 'resources_name', displayName: 'Resource' },
      { field: "module_id", displayName: "Module" },
      { field: "especially_id", displayName: "Especially" },
      { field: "priority", displayName: "Priority" },
      { field: "description", displayName: "Description" },
    ]

  };
  console.log($scope.gridOptions.data)
}
]);
mainApp.controller("crud_setup_master_resource_ctrl", ["$scope", "$rootScope", "$http", "item", "lang", '$uibModalInstance', 'API_URL', "$uibModal", "$timeout",
  function ($scope, $rootScope, $http, item, lang, $uibModalInstance, API_URL, $uibModal, $timeout) {
    $scope.lang = lang;

  }
])