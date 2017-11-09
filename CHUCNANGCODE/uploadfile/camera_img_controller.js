$scope.reply_attachments = ""
$scope.reply_attachments1 = []
$scope.selected_image_list = [];
$scope.reply_attachments_old = []
$scope.selected_image_list_old = []
$scope.new_array_img = [];



$scope.capnhat_reply_attachments = function () {
    $scope.reply_attachments = "has_file"
    $scope.$apply();

}


$scope.xoahinh = function (item) {

    if (item.loai == 'new') {
        for (var i = 0; i < $scope.selected_image_list.length; i++) {
            if ($scope.selected_image_list[i].vitri == item.vitri) {
                $scope.selected_image_list.splice(i, 1)
                $("#form_upload_" + item.vitri).remove()
                break
            }
        }
    } else {
        for (var i = 0; i < $scope.selected_image_list_old.length; i++) {
            if ($scope.selected_image_list_old[i].vitri == item.vitri) {
                $scope.selected_image_list_old.splice(i, 1)
                break
            }
        }
    }
    if ($scope.selected_image_list.length == 0 && $scope.selected_image_list_old.length == 0) {
        $scope.reply_attachments = ""
    }

}



$scope.scroll_left = function () {

    $timeout(function () {
        var $target = $('#div_list_img');
        $target.animate({ scrollLeft: $target.scrollLeft() - 135 }, 1);

    }, 10)
}
$scope.scroll_right = function () {
    $timeout(function () {
        var $target = $('#div_list_img');
        $target.animate({ scrollLeft: $target.scrollLeft() + 135 }, 1);

    }, 10)
}