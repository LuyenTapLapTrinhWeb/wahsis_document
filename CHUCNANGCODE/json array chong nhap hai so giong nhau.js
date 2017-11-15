// fix cai bug chong nhap hai so giong nhau trong json array
var mang_order = []
for (var i = 0; i < $scope.new_config_value.length; i++) {
    mang_order.push($scope.new_config_value[i].order)
}
var sorted_order = mang_order.slice().sort();
var results_order = [];
for (var i = 0; i < mang_order.length - 1; i++) {
    if (sorted_order[i + 1] === sorted_order[i]) {
        results_order.push(sorted_order[i]);
    }
}
if (results_order.length > 0) {
    swal({ title: "Notice!", text: "You must not enter the same sort order number.", type: "warning" });
    $scope.is_save = true;
    return;
}