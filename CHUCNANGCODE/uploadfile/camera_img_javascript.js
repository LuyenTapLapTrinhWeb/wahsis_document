<!-- // copy vao file new html -->
// Nho cai dat id page_child cho page + id btn_ok cho nut save
<script src="js/jquery/jquery_3_1_1.js" type="text/javascript"></script>
<script>

    function InputNumberOne(txt, e) {
        var obj = document.all ? window.event : e;
        var touch = document.all ? obj.keyCode : obj.which;
        var txtValue = txt.value;
        var ch = String.fromCharCode(touch)

        if (String(parseInt(txtValue + ch)) == "NaN" || (touch < 48 || touch > 57)) {
            if (document.all) {
                obj.returnValue = false;
            } else {
                obj.preventDefault();
            }
        }
    }

    var t_img = [];
    var stt = 1
    function readURL1(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function () {

                var fsize = "";
                var ftype = "";
                var fname = "";
                if ($("#upload_imageitem").val() != "") {

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
                        angular.element($("#page_child")).scope().selected_image_list = t_img
                        angular.element($("#page_child")).scope().$apply()

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

                        angular.element($("#page_child")).scope().capnhat_reply_attachments();

                    }
                }

            }

            reader.readAsDataURL(input.files[0]);


        }
    }

    var token1 =getCookieJson('pms-dev-token')
    var token = ""
    if (token1 !== undefined && token1 !== null) {

        token = 'Bearer ' + JSON.parse(token1).token;

    }
console.log("camera_img")
    $("#page_child").on("click", "#btn_ok", function () {
        if (angular.element($("#page_child")).scope().is_send == true) {
            angular.element($("#page_child")).scope().is_send = false
            angular.element($("#page_child")).scope().$apply()
            // if (angular.element($("#page_child")).scope().dt.price === "" || angular.element($("#page_child")).scope().dt.price === undefined || angular.element($("#page_child")).scope().dt.price === null) {
            //     angular.element($("#page_child")).scope().is_send = true
            //     return;
            // }



            if (angular.element($("#page_child")).scope().selected_image_list_old.length > 0) {
                angular.element($("#page_child")).scope().reply_attachments_old = []
                for (var i = 0; i < angular.element($("#page_child")).scope().selected_image_list_old.length; i++) {
                    var img_obj = { order: 1, img: angular.element($("#page_child")).scope().selected_image_list_old[i].img_link.replace(domain_name_pos.replace("/api", ""), "") }
                    angular.element($("#page_child")).scope().reply_attachments_old.push(img_obj);
                    angular.element($("#page_child")).scope().$apply()

                }
            }
            else
            {
                angular.element($("#page_child")).scope().reply_attachments_old = []
                angular.element($("#page_child")).scope().$apply()
            }

            if (angular.element($("#page_child")).scope().selected_image_list.length > 0) {
                angular.element($("#page_child")).scope().reply_attachments1=[]
                for (var i = 0; i < angular.element($("#page_child")).scope().selected_image_list.length; i++) {
                    var data = new FormData();
                    data.append("file", document.getElementById("upload_file_" + angular.element($("#page_child")).scope().selected_image_list[i].vitri).files[0]);
                    $.ajax({
                        data: data,
                        type: "POST",
                        processData: false,
                        //contentType: 'multipart/form-data',
                        contentType: false,
                        cache: false,
                        //url:'http://dev.wahsis.net/upload/controller?dt={"companyId":333,"resourceType":"images"}',
                        url: domain_name_pos + 'upload/controller?dt={"companyId":' + com_id + ',"resourceType":"reply/images"}',
                        //url:'http://pos.wahsis.net/upload/controller',
                        beforeSend: function (xhr) {

                            xhr.setRequestHeader("Authorization", token);


                        },
                        success: function (response) {

                            var obj = JSON.parse(response);
                            console.log(obj)
                            for (var i = 0; i < obj.data.length; i++) {
                                //                                    angular.element($("#page_child")).scope().reply_attachments1 = []
                                var img_obj = { order: 1, img: obj.data[i].relativePath }
                                angular.element($("#page_child")).scope().reply_attachments1.push(img_obj);
                                angular.element($("#page_child")).scope().$apply()
                                break
                            }



                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(errorThrown);
                            swal('Notice!', 'Upload error', 'error');
                            angular.element($("#page_child")).scope().is_send = true
                            angular.element($("#page_child")).scope().$apply()
                        },
                        async: false
                    })

                }
            }
            else
            {
                angular.element($("#page_child")).scope().reply_attachments1=[]
                angular.element($("#page_child")).scope().$apply()  
            }
        
            angular.element($("#page_child")).scope().new_array_img = []
            angular.element($("#page_child")).scope().new_array_img = angular.element($("#page_child")).scope().reply_attachments_old.concat(angular.element($("#page_child")).scope().reply_attachments1)
            console.log(angular.element($("#page_child")).scope().new_array_img)
            angular.element($("#page_child")).scope().$apply()
            angular.element($("#page_child")).scope().ok()
        }
    })



</script>