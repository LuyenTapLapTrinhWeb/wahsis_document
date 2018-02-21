/**DICH NGON NGU THEO COMBO BOX LANGUAGE */
$scope.$watch(
    $scope => {
      return ($scope.abc = $filter("translate")("NOTE_FORMAT1"));
    },
    () => {
      $scope.dich_ngon_ngu = (value) => {
        if (value === 1 && $scope.language_id === "en") {
          return "Yes"
        } else if (value === 0 && $scope.language_id === "en") {
          return "No"
        } else if (value === 1 && $scope.language_id === "vi") {
          return "Có"
        } else {
          return "Không"
        }
      }
      // var test = dich_ngon_ngu(0, "en")
      // alert(test)
      /**batdat viet {phuong_thuc:"load.api.search.landau"}*/
      /**ketthuc viet {phuong_thuc:"load.api.search.landau"}*/
    }
  );
$scope.loadInfo = function () {
    UtilityService.getListObject($scope.tableName, $scope.language_id).then(function (response) {
      console.log(response);
      if (response.data.err === 0) {
        $scope.apartmentFeeCategoriesList = response.data.dt.apartment_fee_categories_list;
        var ed_list = response.data.dt.apartment_fee_categories_list;
        /**LIST APARTMENT_FEE_GROUP */
        var jsonData = {};
        jsonData = JSON.stringify({
          languages: { language_id: $scope.language_id },
          company: { company_id: com_id }
        });
        UtilityService.getListObjectWithParam("apartment_fee_group", "list", jsonData).success(function (response) {
          if (checkNoErr(response.err) && checkValue(response.dt)) {
            $scope.apartment_fee_group_list = response.dt.apartment_fee_group_list;
            var afg_list = getArray($scope.apartment_fee_group_list);
            for (x in ed_list) {
              ed_list[x].stt = parseInt(x) + 1;
              afg_list.forEach(element => {
                if (ed_list[x].apartment_fee_group_id === element.apartment_fee_group_id) {
                  ed_list[x].apartment_fee_group_name = element.apartment_fee_group_name;
                }
              });
              /**0: no, 1:yes */
              ed_list[x].price = UtilityCheckFormatService.change_number(ed_list[x].price);
              ed_list[x].last_month_name = $scope.dich_ngon_ngu(getNumber(ed_list[x].last_month));
              ed_list[x].is_evrm_fee_name = $scope.dich_ngon_ngu(getNumber(ed_list[x].is_evrm_fee));
              ed_list[x].is_monthly_index_name = $scope.dich_ngon_ngu(getNumber(ed_list[x].is_monthly_index));
              ed_list[x].is_progressive_formula_name = $scope.dich_ngon_ngu(getNumber(ed_list[x].is_progressive_formula));
              ed_list[x].next_month_name = $scope.dich_ngon_ngu(getNumber(ed_list[x].next_month));
            }
             
            $scope.apartmentFeeCategoriesList = ed_list;

            console.log($scope.apartmentFeeCategoriesList);
          } else {
            swal(
              $filter("translate")("WARNING"),
              $filter("translate")("no_data"),
              "warning"
            );
          }
        });
      }
    });
    $scope.selected = [];
  };


/**  ============================================ fix loi trong project pos-wahsis-web ====================  */
  $scope.kieu_active = function (row) { 
    var value = row.entity.is_active;

    if (value === 1 && language_id === "en") {
        return "Active"
    } else if (value === 0 && language_id === "en") {
        return "Unactive"
    } else if (value === 1 && language_id === "vi") {
        return "Kích hoạt"
    } else {
        return "Không kích hoạt"
    }
};

$scope.gridOptions = {
    data: "items",
    enableRowSelection: true,
    enableRowHeaderSelection: false,
    filterOptions: $scope.filterOptions,
    multiSelect: false,
    rowTemplate: '<div ng-dblclick="grid.appScope.rowDblClick(row)" external-scopes="gridHandlers" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ \'ui-grid-row-header-cell\': col.isRowHeader }\" ui-grid-cell></div>',
    columnDefs: [
        { name: 'No.', field: 'No.', width: "5%", cellTemplate: '<div class="ui-grid-cell-contents">{{(grid.renderContainers.body.visibleRowCache.indexOf(row))+1}}</div>' },
        { field: "provider_name", displayName: "Provider Name" },
        { field: "provider_address", displayName: "Provider Address" },
        { field: "effective_date", displayName: "Effective Date" },
        // { field: "created_by_id", displayName: "Created By Id" },
        { field: "created_by_name", displayName: "Created by Name" },
        { field: 'is_active', displayName: 'Is active', width: 150, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.kieu_active(row)}}</div>' },
    ],
    onRegisterApi: function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
            $scope.selectedItems = gridApi.selection.getSelectedRows();
        });
    }
};