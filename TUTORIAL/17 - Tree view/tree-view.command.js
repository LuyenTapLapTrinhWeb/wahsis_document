
/* select_node(obj[, supress_event, prevent_open]) */
instance.select_node([
    location_id,
    false/* if set to true the changed.jstree event won't be triggered */,
    false/* if set to true parents of the selected node won't be opened */]);
/* ````````````````````````````````````````````````````````````````````````````````````````` */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ````````````````````````````````````````````````````````````````````````````````````````` */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
instance.deselect_all();
var s = instance.select_node(location_id);
console.log("instance.select_node(location_id)", s)
instance.deselect_all();
instance.select_node('select_node', String.toString(location_id));
instance.reference('#jstree').select_node('child_node_1');
$('#container').jstree('select_node', String.toString(location_id));



if (item.ble_device_id !== 0) {
    var location_id = item.location_id.toString();
    $scope.it = angular.copy(item);
    $('#container').jstree(true).select_node(location_id);
    $('#container').on('select_node.jstree', function (e, data) {
        console.log("data.instance.clear_state();", data.instance.clear_state())
        data.instance.select_node(location_id);
        if (data.instance.is_selected(location_id)) {
            console.log("data.instance.get_selected();", data.instance.get_selected(true))
        } else {
            console.error("data.instance.get_selected();", data.instance.get_selected(true))
        }
        e.preventDefault();
    });
}
$scope.it.location = data.instance.get_node(data.selected[0]);
console.log('The selected node is: ' + data.instance.get_node(data.selected[0]).text);
console.log("The selected nodes are:");
console.log($scope.tree_drop_down);
$scope.it.location_id = parseInt(data.instance.get_node(data.selected[0]).id);
$scope.it.location_name = data.instance.get_node(data.selected[0]).text;