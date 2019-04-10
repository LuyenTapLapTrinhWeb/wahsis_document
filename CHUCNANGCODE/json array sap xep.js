//fix cai bug sap xep theo mot cot trong json array
$scope.new_config_value.sort(function (a, b) {
    return Number(a.order) - Number(b.order);
});
let end_time_max = mang_doi_sang_so_gio_hien_thi.reduce(function (a, b) {
    return Math.max(a, b);
});
let start_time_min = mang_doi_sang_so_gio_hien_thi.reduce(function (a, b) {
    return Math.min(a, b);
});
function uniq_nhanvien_dadangky_phan_biet(dup_nhan_vien_list) {
    return Array.from(new Set(dup_nhan_vien_list));
}
/* so nam ngoai mang array */
mang_so_gio_hien_thi = mang_so_gio_hien_thi.filter(function (a) {
    return !doi_sang_mang_so_gio_hien_thi.includes(a);
});
SortByName(array);
// luoi grid hien thi
$scope.gridOptions_menuPMSGuest = {
    data: "config_value",
    enableSorting: true,
    enableRowSelection: true,
    enableRowHeaderSelection: false,
    //filterOptions: $scope.filterOptions,
    multiSelect: false,
    rowTemplate: '<div ng-dblclick="grid.appScope.rowDblClick(row)" external-scopes="gridHandlers" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ \'ui-grid-row-header-cell\': col.isRowHeader }\" ui-grid-cell></div>',
    rowHeight: 36,
    columnDefs: [
        { name: 'No.', field: 'No.', width: 50, cellTemplate: '<div class="ui-grid-cell-contents">{{(grid.renderContainers.body.visibleRowCache.indexOf(row))+1}}</div>' },
        { field: 'title', displayName: 'Title', width: 250, type: 'text' },
        { field: 'value', displayName: 'Status', width: 120, type: 'boolean', cellTemplate: '<input type="checkbox" ng-model="row.entity.value" ng-checked="grid.getCellValue(row, col)" style="opacity: 1 !important; position: static   !important;  ui-grid-edit  ui-grid-selection ng-true-value="true" ng-false-value="false" >' },
        { field: 'order', displayName: 'Order', width: 250, type: 'number', enableCellEdit: true, cellTemplate: '<input type="number" onclick="this.select()" ng-blur="grid.appScope.blur_room_price(row)" class="a" style="padding-left: 5px;height: 36px !important;margin-top:-1px;text-align:right;padding-right: 5px;" ng-model="row.entity.order"/>', width: 140 },
    ]
};

function SortByName(array) {
    array.sort(function (a, b) {
        if (a.firstname < b.firstname)
            return -1;
        if (a.firstname > b.firstname)
            return 1;
        return 0;
    });
}
function getAllNumbersBetween(x, y) {
    var numbers = [];
    // Set a temporary variable i to start at value x.
    // As long as the value of i is less than the value y, increment it.
    // The loop will end when i is equal to y.
    for (var i = x; i < y; i++) {
        numbers.push(i);
    }
    return numbers;
}