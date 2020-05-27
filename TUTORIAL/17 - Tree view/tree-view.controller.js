// - update 3 bước hoàn thiện tree-view
// 1/ cấu hình tree view có state opened false selected false
// 2/ vẽ tree view $('#container').jstree($scope.treeConfig);
// 3/ khi cây tree view đã vẽ xong thì set id cho nó
// data.instance.set_state({ core: { opened: [/* full array of nodes here to open and load from the server */], 'selected': [''/* array of nodes to select */] } })
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* FROM EDIT */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Cấu hình node ID động theo detail */
function get_tree_list() {
    /* Phần 2: Load khu vực */
    ApartmentService.getTreeLocation(language).then(function (response) {
        if (response.err === 0) {
            $scope.location_list = response.dt.locations_list;
            var str = JSON.stringify($scope.location_list);
            str = str.replace(/location_id/g, "id");
            str = str.replace(/location_name/g, "text");
            $scope.location_list = JSON.parse(str);
            $scope.treeConfig = {
                "core": { // core options go here
                    // "animation" : 0,
                    "multiple": false, // no multiselection
                    "themes": {
                        "variant": "large",
                        "dots": true // no connecting dots between dots,
                    },
                    "data": $scope.location_list
                },
                'plugins': ['types', 'search', 'wholerow', /* 'checkbox', */ 'state',],
                'types': {
                    'default': {
                        'icon': 'fa fa-folder',
                    },
                },
                'search': {
                    'show_only_matches_children': true,
                    'show_only_matches': true
                },
                'state': {
                    'opened': false,/* default false when adding new open popup*/
                    'selected': false,/* default false when adding new open popup */
                },
                /*  "checkbox": {
                     "keep_selected_style": false
                 }, */
            };
            $('#container').jstree($scope.treeConfig);
            if (item.ble_device_id !== 0) {
                var location_id = item.location_id.toString();
                $scope.it = angular.copy(item);
                $('#container').on('ready.jstree', function (e, data) {
                    data.instance.set_state({ core: { opened: [/* full array of nodes here to open and load from the server */], 'selected': [location_id/* array of nodes to select */] } })
                    e.preventDefault();
                });

            }
        }
    });
}
$scope.search_location = function () {
    $("#container").jstree(true).search($("#q").val());
}
$scope.update_location = function () {
    $('#container').on("changed.jstree", function (e, data) {
        if (data.selected.length) {
            $scope.tree_drop_down = data.instance.get_selected(data.selected[0])[0];
            $scope.it.location_id = parseInt($scope.tree_drop_down.id);
            $scope.it.location_name = $scope.tree_drop_down.text;
            e.preventDefault();
        }
    });
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* FROM SEARCH */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Cấu hình node id rỗng */
function get_tree_list() {
    /* Phần 2: Load khu vực */
    ApartmentService.getTreeLocation(language).then(function (response) {
        if (response.err === 0) {
            $scope.location_list = response.dt.locations_list;
            var str = JSON.stringify($scope.location_list);
            str = str.replace(/location_id/g, "id");
            str = str.replace(/location_name/g, "text");
            $scope.location_list = JSON.parse(str);
            $scope.treeConfig = {
                "core": { // core options go here
                    // "animation" : 0,
                    "multiple": false, // no multiselection
                    "themes": {
                        "variant": "large",
                        "dots": true // no connecting dots between dots,
                    },
                    "data": $scope.location_list
                },
                'plugins': ['types', 'search', 'wholerow', /* 'checkbox', */ 'state',],
                'types': {
                    'default': {
                        'icon': 'fa fa-folder',
                    },
                },
                'search': {
                    'show_only_matches_children': true,
                    'show_only_matches': true
                },
                'state': {
                    'opened': false,/* default false when adding new open popup*/
                    'selected': false,/* default false when adding new open popup */
                },
                /*  "checkbox": {
                     "keep_selected_style": false
                 }, */
            };
            $('#container').jstree($scope.treeConfig);
            $('#container').on('ready.jstree', function (e, data) {
                data.instance.set_state({ core: { opened: [/* full array of nodes here to open and load from the server */], 'selected': [''/* array of nodes to select */] } })
                e.preventDefault();
            });
        }
    });
}
$scope.search_location = function () {
    if ($("#q").val()) {
        $("#container").jstree(true).search($("#q").val());
    } else {
        $('#container').on('ready.jstree', function (e, data) {
            data.instance.set_state({ core: { opened: [/* full array of nodes here to open and load from the server */], 'selected': [''/* array of nodes to select */] } })
            e.preventDefault();
        });
    }
}
$scope.update_location = function () {
    $('#container').on("changed.jstree", function (e, data) {
        if (data.selected.length) {
            $scope.tree_drop_down = data.instance.get_selected(data.selected[0])[0];
            $scope.location_id = parseInt($scope.tree_drop_down.id);
            $scope.location_name = $scope.tree_drop_down.text;
            e.preventDefault();
        }
    });
}