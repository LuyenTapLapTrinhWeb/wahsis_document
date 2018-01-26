/**Đặt chung với fix cai bug giao diện */
if (item.master_camera_id !== 0) {

    if ($scope.room_posted_for_sale_detail.image_path !== "" && $scope.room_posted_for_sale_detail.image_path !== "[]" && $scope.room_posted_for_sale_detail.image_path !== null && $scope.room_posted_for_sale_detail.image_path !== undefined)
    {
        $scope.reply_attachments_old = JSON.parse($scope.room_posted_for_sale_detail.image_path)
    }
    
    for (var i = 0; i < $scope.reply_attachments_old.length; i++)
    {
        var t = {
            img_link: API_URL_UPLOAD.replace("/api", "") + $scope.reply_attachments_old[i].img,
            img_name: "",
            vitri: i,
            loai: "old"
        }
        $scope.selected_image_list_old.push(t)
    }
}