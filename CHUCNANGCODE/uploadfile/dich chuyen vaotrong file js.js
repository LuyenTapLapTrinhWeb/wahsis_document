<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px;" ng-hide="it.group_id !== 'BANK'">

    <input type="file" name="file[]" id="upload_imageitem" style="  padding-top: 0px; font-size: 12px;display: none !important"
        onchange="readURL1(this);" accept="image/*">
        <div id="create_form_upload" style="display: none">
        </div>
        <form id="form_uploadthumb" method="POST" enctype="multipart/form-data">
            <input type="file" name="file[]" id="upload_imageitem1" style="  padding-top: 0px; font-size: 12px;display: none !important">
                <button id="s" style="display: none"></button>
                    </form>
            <!--<img id="output" class="an" style="    height: 75px; margin: 2px;" />
            <!-- Ch?nh l?i -->
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="row">
                    <!-- <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1" style="height: 105px;display: inline-block;vertical-align: top;font-size: 38px;padding: 0px;padding-top: 25px;    color: #c3c3c3;"
                        ng-click="scroll_left()">
                    </div> -->
                            <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9" id="div_list_img" style="height:145px;padding-top: 5px !important; overflow-x:visible ;white-space:nowrap; overflow-y:hidden;display: inline-block;padding: 0px;">
                        <div ng-repeat="img in selected_image_list_old" style="display: inline-block">
                            <div style="float: left; position: relative; background-image: url('http://pub.diamondisland.online/img/div-img.png'); background-size: 100% 100%;; top: -7px; margin: 0px 5px; width: 135px; height: 110px; display: flex; align-items: center">
                                <img ng-src="{{img.img_link}}" style=" height: 86%; margin: 5px auto; display: block; max-width: 119px;" />
                                <img src='http://pub.diamondisland.online/img/close-button.svg' style=" position: absolute; left: 115px; top: 5px; height: 15px;"
                                    ng-click="xoahinh(img)">
                                    </div>
                            </div>
                            <div ng-repeat="img in selected_image_list" style="display: inline-block">
                                <div style="float: left; position: relative; background-image: url('http://pub.diamondisland.online/img/div-img.png'); background-size: 100% 100%;; top: -7px; margin: 0px 5px; width: 135px; height: 110px; display: flex; align-items: center">
                                    <img ng-src="{{img.img_link}}" style=" height: 86%; margin: 5px auto; display: block; max-width: 119px;" />
                                    <img src='http://pub.diamondisland.online/img/close-button.svg' style=" position: absolute; left: 115px; top: 5px; height: 15px;"
                                        ng-click="xoahinh(img)">
                                    </div>
                                </div>
                                <label for="upload_imageitem" style="display: inline-block" ng-if="selected_image_list.length+selected_image_list_old.length<1">
                                    <div style="float: left; position: relative; background-image: url('http://pub.diamondisland.online/img/div-img-add.png'); background-size: 100% 100%;; top: -7px; margin: 0px 5px; width: 135px; height: 110px; display: flex; align-items: center; justify-content: center;">
                                        <p class="clickAddImg">{{ 'Click_to_add_images' | translate }}</p>
                                    </div>
                                </label>
                            </div>
                            <!-- <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1" style="height: 105px;display: inline-block;vertical-align: top;font-size: 38px;  padding: 0px; padding-top: 25px; color: #c3c3c3;text-align: right"
                                ng-click="scroll_right()"> > </div> -->
                        </div>
                    </div>
                    <!-- tu?ng trung cho d?u c?ng -->
                </div>
                <button ng-click="btn_ok()" type="button" class="btn btn-primary" ng-disabled="frmItem.$invalid" ng-model="myVar" ng-init="myVar = false"
                    ng-disabled="frm.$invalid">{{ "SAVE"| translate }}</button>
                <script>
                    function readURL1(input){
                        angular.element($("#item_edit")).scope().readURL1(input);
                    }
</script>
                /**Đặt chung với fix cai bug giao diện */
                if ($scope.item.electric_access_key_id !== 0 && $scope.item.electric_access_key_id !== undefined) {

                    /**hien thi hinh da  upload   */
                    $scope.reply_attachments_old = "";
                if ($scope.item.image_path !== "" && $scope.item.image_path !== "[]" && $scope.item.image_path !== null && $scope.item.image_path !== undefined) {
                    $scope.reply_attachments_old = JSON.parse($scope.item.image_path)
                }
                for (var i = 0; i < $scope.reply_attachments_old.length; i++) {
        var t = {
                    img_link: API_URL_UPLOAD.replace("/api", "") + $scope.reply_attachments_old[i].img,
                img_name: "",
                vitri: i,
                loai: "old"
            }
            $scope.selected_image_list_old.push(t)
        }
    }
    
    /**FIX CAI BUG UPLOAD HINH
        *
        * NHỚ CÀI ĐẶT THUỘC TÍNH image_path CHO JSONDATA ADD VÀ UPDATE
        */
    $scope.reply_attachments = ""
    $scope.reply_attachments1 = []
    $scope.selected_image_list = [];
    $scope.reply_attachments_old = []
    $scope.selected_image_list_old = []
    $scope.new_array_img = [];
    
    
    
$scope.capnhat_reply_attachments = function () {
                    $scope.reply_attachments = "has_file"
    $rootScope.$apply();
            
            }
            
            
$scope.xoahinh = function (item) {

    if (item.loai === 'new') {
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

                var t_img = [];
                var stt = 1;
                
$scope.readURL1 = (input) => {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function () {
            var fsize = "";
                var ftype = "";
                var fname = "";
            if ($("#upload_imageitem").val() !== "") {
                if (window.File && window.FileReader && window.FileList && window.Blob) {
                    for (var j = 0; j < $("#upload_imageitem")[0].files.length; j++) {
                        var fsize = $('#upload_imageitem')[0].files[j].size;
                var ftype = $('#upload_imageitem')[0].files[j].type;
                var fname = ($('#upload_imageitem')[0].files[j].name.split('.')[($('#upload_imageitem')[0].files[j].name.split('.')).length - 1]).toLowerCase();
                        switch (fname) {
                            case 'png':
                case 'gif':
                case 'jpg':
                case 'jpeg':
                case 'pjpeg':
                case 'webp':
                    break;
                default:
                    swal('Notice!', 'Unsupported File!', 'error');
                    return;
            }
        }
        var fileInput = document.getElementById('upload_imageitem');//d�ng cho vi?c thay doi d? li�u th� bi?n v?a g�n cung thay d?i theo
        $("#upload_imageitem1")[0].files = (fileInput.cloneNode()).files
        $("#upload_imageitem").val("")
                    var t = {
                    img_link: reader.result,
                img_name: $('#upload_imageitem1')[0].files[0].name,
                vitri: stt,
                loai: "new"
            }
            t_img.push(t)
            $scope.selected_image_list = t_img


            var f = document.createElement("form");
            f.setAttribute('method', "POST");
            f.setAttribute('id', "form_upload_" + stt);
            f.setAttribute('enctype', "multipart/form-data");

            var y = document.createElement("INPUT");
            y.setAttribute("type", "file");
            y.setAttribute("name", "file[]");
            y.setAttribute("id", "upload_file_" + stt);
            f.appendChild(y);
            var x = document.createElement("INPUT");
            x.setAttribute("type", "submit");
            x.setAttribute("id", "submit_form_" + stt);
            f.appendChild(x);
            document.getElementById("create_form_upload").appendChild(f);
            $("#upload_file_" + stt)[0].files = $("#upload_imageitem1")[0].files;
            stt++
            $scope.capnhat_reply_attachments();
        }
    }
}
reader.readAsDataURL(input.files[0]);
}
}
var token1 = getCookieJson('pms-dev-token')
var token = ""
if (token1 !== undefined && token1 !== null) {
                    token = 'Bearer ' + JSON.parse(token1).token;
                }
                $scope.is_send = true;
$scope.btn_ok = () => {
    if ($scope.is_send === true) {
                    setTimeout(function () {
                        $scope.is_send = false
                        //this triggers a $digest
                    }, 2000);
                if ($scope.selected_image_list_old.length > 0) {
                    $scope.reply_attachments_old = []
            for (var i = 0; i < $scope.selected_image_list_old.length; i++) {
                var img_obj = {order: 1, img: $scope.selected_image_list_old[i].img_link.replace(domain_name_pos.replace("/api", ""), "") }
                $scope.reply_attachments_old.push(img_obj);
            }
        }
        else {
                    $scope.reply_attachments_old = []

                }
                if ($scope.selected_image_list.length > 0) {
                    $scope.reply_attachments1 = []
            for (var i = 0; i < $scope.selected_image_list.length; i++) {
                var data = new FormData();
                data.append("file", document.getElementById("upload_file_" + $scope.selected_image_list[i].vitri).files[0]);
                var url = domain_name_pos + 'upload/controller?dt={"companyId": ' + com_id + ',"resourceType":"reply/images"}';
                function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    var obj = {};
                    if (typeof (response) !== typeof ({})) {
                    obj = JSON.parse(response);
                } else {
                    obj = response;
                }
                console.log(obj)
                    for (var i = 0; i < obj.data.length; i++) {
                        //$scope.reply_attachments1 = []
                        var img_obj = {order: 1, img: obj.data[i].relativePath }
                $scope.reply_attachments1.push(img_obj);
                break;
            }
        }
                function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log(response);
                swal('Notice!', 'Upload error: ' + response, 'error');
                $scope.is_send = true;
            }
            $http.post(url, data).then(successCallback, errorCallback);
        }
    }
        else {
                    $scope.reply_attachments1 = []

                }
                $scope.new_array_img = []
                $scope.new_array_img = $scope.reply_attachments_old.concat($scope.reply_attachments1)
                console.log($scope.new_array_img)
        
                $scope.ok();
            }
}