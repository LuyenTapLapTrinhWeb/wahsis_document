/* cài đặt ng-disabled  ng-disabled="!grid.appScope.enableMe" */
$scope.gridOptions = {
    enableRowSelection: true,
    enableRowHeaderSelection: false,
    filterOptions: $scope.filterOptions,
    multiSelect: false,
    rowTemplate: '<div ng-dblclick="grid.appScope.rowDblClick(row)" external-scopes="gridHandlers" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ \'ui-grid-row-header-cell\': col.isRowHeader }\" ui-grid-cell></div>',
    rowHeight: 36,
    enableColumnMenus: false,
    enableSorting: false,
    columnDefs: [
        {
            field: 'check_row', displayName: '', width: 30,
            headerCellTemplate: `<div class="ui-grid-cell-contents ui-grid-header-cell-primary-focus" style="height:28px">
                <input type="checkbox" id="icheck_check_all_id"  icheck 
                    ng-model="grid.appScope.check_all" 
                    ng-disabled="!grid.appScope.enableMe"
                    ng-change="grid.appScope.change_check_all(grid.appScope.check_all)" 
                    ng-true-value="1" ng-false-value="0" ></div>`,
            cellTemplate: `<div class="ui-grid-cell-contents ng-binding ng-scope">
                <input type="checkbox" id="icheck_check_row_id" icheck  
                    ng-model="row.entity.check_row"
                    ng-disabled="!grid.appScope.enableMe" 
                    ng-change="grid.appScope.capnhat_check()" 
                    ng-true-value="1" ng-false-value="0"></div>`
        },
        { field: 'apartment_fee_category_name', displayName: $filter("translate")("APARTMENT_FEE_CATEGORY"), width: 130, enableCellEdit: false },
        { field: 'month_year', displayName: $filter("translate")("MONTH_YEAR"), width: 100, enableCellEdit: false, cellTemplate: '<div class="ui-grid-cell-contents" style="text-align:center">{{grid.getCellValue(row, col)}}</div>' },
        // {field: 'year', displayName: $filter("translate")("YEAR"), width: 70, enableCellEdit: false, cellTemplate: '<div class="ui-grid-cell-contents" style="text-align:center">{{grid.getCellValue(row, col)}}</div>'},
        { field: 'invoice_code', displayName: $filter("translate")("INVOICE_CODE"), width: 130, enableCellEdit: false },
        { field: 'effective_date', displayName: $filter("translate")("CREATE_DATE_INVOICE"), width: 150, enableCellEdit: false, cellTemplate: '<div class="ui-grid-cell-contents" style="text-align:center">{{grid.appScope.kieu_ngay(grid.getCellValue(row, col))}}</div>' },
        { field: 'total_amount', displayName: $filter("translate")("TOTAL_AMOUNT"), width: 105, cellTemplate: '<div class="ui-grid-cell-contents" style="text-align:right" >{{grid.appScope.kieu(grid.getCellValue(row, col))}}</div>' },
        //            {field: 'term_paid_date', displayName: $filter("translate")("TERM_PAID_DATE"), width: 100, enableCellEdit: false, cellTemplate: '<div class="ui-grid-cell-contents" style="text-align:center">{{grid.appScope.kieu_ngay(grid.getCellValue(row, col))}}</div>'},
        //            {field: 'term_paid', displayName: $filter("translate")("TERM_PAID"), width: 82, enableCellEdit: false, cellTemplate: '<div class="ui-grid-cell-contents" style="text-align:right" >{{grid.getCellValue(row, col)}}</div>'},
        //	{field: 'payment_type', displayName: $scope.lang.PAYMENT_METHOD, width: 150, enableCellEdit: false},
        //{field: 'payment_type', displayName: $scope.translation.PAYMENT_METHOD, width: 110,   cellTemplate: '<div class="ui-grid-cell-contents" style="text-align:left">{{grid.appScope.changePayment(grid.getCellValue(row, col))}}</div>'},
        //	{field: 'cash_type', displayName: $scope.lang.CASH_TYPE, width:  110, cellTemplate: '<div class="ui-grid-cell-contents" style="text-align:left">{{grid.appScope.changeType(grid.getCellValue(row, col))}}</div>'}
    ],
    onRegisterApi: function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
            $scope.selectedItems = gridApi.selection.getSelectedRows();
        });
    }
};