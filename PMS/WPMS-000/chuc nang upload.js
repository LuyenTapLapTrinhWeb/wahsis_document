/**master_public_camera_view.html*/
//hien upload hinh tren form search
<style>

    td.details-control  {
        background: url('../img/details_open.png') no-repeat center center;
        cursor: pointer;
    }
    .close{
        background: url('../img/details_close.png') no-repeat center center;
        cursor: pointer;
    }
    tr.details td.details-control {
        background: url('../img/details_close.png') no-repeat center center;
    }
</style>
/*
    <tr>
        <th style="white-space: nowrap;">{{"IMAGE"|translate}}</th>
    </tr>
    <tr ng-repeat="itemList in master_public_camera_list">
        <td style="white-space: nowrap;"><img style="height:40px;width:40px;" ng-src="{{itemList.image}}"</td>
    </tr>
*/
/**master_public_camera_new.html*/
// hienupload hinh tren form new
/*<label>{{"IMAGE"|translate}}</label>
<img ng-src={{img_master_public_camera}} class="img-responsive" style="margin-bottom: 5px;">
 
<label style="border: 1px solid #e7eaec" class="btn btn-default btn-xs red"  
ng-click="update_master_public_camera_image()"><i class="fa fa-upload"></i>{{"UPLOAD"||translate}}</label>*/

/**master_public_camera.controller.js */

$scope.str_search = {
  master_camera_name: "",
  manufactory_name: "",
  model: "",
  ip_address: "",
  port: 0,
  users_name: 1
};
Utilitymaster_public_camera.decentralization(
  "pms_setting_master_public_camera"
).then(function(response) {
  if (response.data.err === 0 && response.data.dt !== undefined) {
    $scope.allow = utility.get_allow(response.data);
    if (response.data.dt.permission_list.length > 0) {
      if (response.data.dt.permission_list[0].allow_edit === true) {
        $scope.master_public_camera_click = function(id, item) {};
        $scope.master_public_camera_dbclick = function(id, item) {};
        var json = JSON.stringify({
          master_public_camera: JSON.parse(JSON.stringify($scope.str_search)),
          company: JSON.parse(JSON.stringify(companyTemp)),
          page: JSON.parse(JSON.stringify($scope.page)),
          languages: JSON.parse(JSON.stringify($scope.languageTemp))
        });
        console.log(json);
        Utilitymaster_public_camera.searchObject("master_public_camera", json).then(function(
          response
        ) {
          console.log(response);
          if (response.data.err === 0) {
            $scope.master_public_camera_list =
              response.data.dt.master_public_camera_list;
            for (var i = 0; i < $scope.master_public_camera_list.length; i++) {
              $scope.master_public_camera_list[i].stt = i + 1;
              $scope.master_public_camera_list[
                i
              ].image = UtilityCheckFormatmaster_public_camera.getImagePath(
                API_URL_UPLOAD,
                $scope.master_public_camera_list[i].image_path
              );
            }
            if ($scope.master_public_camera_list.length === 0) {
              $scope.show = true;
            } else {
              $scope.show = false;
            }
            /*<div class="col-sm-2  " style="padding-left: 0px;padding-top: 0px; margin-bottom: 5px;padding-right: 0px">
                        <p ng-show="show" style="margin-bottom: 0px"><strong style="color: red">{{"NO_RESULT"|translate}}</strong></p>
                    </div> nam tren menu search*/
            $scope.currentPage1 = 1;
            $scope.total_page = response.data.dt.page.total_page;
            $scope.total_row = response.data.dt.page.total_row;
            $scope.list_page = [];
            for (var i = 1; i <= $scope.total_page; i++) {
              var j = { val: "", test: "" };
              j.val = i;
              j.test = i;
              $scope.list_page.push(j);
            }
          }
          $scope.selected = [];
        });
        $scope.item_per_page2 = function() {
            $scope.load_info(1, $scope.currentPage1);
          };
        };
      }
    }
  }
);

/**delete 
 * http://pms-dev.wahsis.net/api/master_public_camera?cm=delete&dt={
"company":{"company_id":40743},
"master_public_camera":{"master_camera_id":3}}
*/
$scope.delete = function() {
  var previousWindowKeyDown = window.onkeydown;
  $rootScope.checkLogout();
  var row = $scope.selected;
  if (row.length > 0) {
    var previousWindowKeyDown = window.onkeydown;
    swal(
      {
        title: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      function() {
        window.onkeydown = previousWindowKeyDown;
        $scope.object = {
          master_public_camera_id: row[0].master_public_camera_id
        };
        var dtJSON = JSON.stringify({
          master_public_camera: JSON.parse(JSON.stringify($scope.object)),
          company: JSON.parse(JSON.stringify($scope.company))
        });
        Utilitymaster_public_camera.deleteObject(
          "master_public_camera",
          dtJSON
        ).then(function(response) {
          // console.log(response, dtJSON);
          if (response.data.err === 0) {
            $scope.load_info($scope.item_per_page, 1);
            $scope.selected = [];
            swal("Deleted!", "Your has been deleted.", "success");
          } else {
            swal("Deleted!", "Delete Error.", "error");
          }
        });
      }
    );
  } else {
    swal({
      title: "Please choose item to delete!",
      timer: 1240,
      showConfirmButton: false,
      type: "error"
    });
  }
};
//**detail? */

/**su dung upload hinh tren form new */
/**add new 
http://pms-dev.wahsis.net/api/master_public_camera?cm=add&dt={
"company":{"company_id":40743},
"master_public_camera":{
"master_camera_name":"Camera 01",
"image_path":"",
"manufactory_name":"HP",
"model":"4959666",
"ip_address":"10.9.11.11",
"port":80,
"users_name":"admin",
"password":"123456",
"created_by_id":16,
"created_by_name":"admin",
"created_date":"2017-11-07"
}}
*/
function crudmaster_public_camera(){
    $scope.item = [];
    $scope.item = item;
    $rootScope.img_master_public_camera = UtilityCheckFormatmaster_public_camera.getImagePath(API_URL_UPLOAD, $scope.item.image_path);
    console.log("item", $scope.item);
    $scope.update_master_public_camera_image = function () {
        $scope.loaiupload = "master_public_camera";
        openPopupuploadLogo($scope.loaiupload);
    };
    function openPopupuploadLogo(loaiupload)
    {
        var modalInstance = $uibModal.open({
            templateUrl: 'upload_image/upload_image.html',
            controller: uploadImageController,
            windowClass: "animated fadeInDown",
            backdrop: false,
            dragable: false,
            size: 'sm',
            locked: true,
            resolve: {
                loaiupload: function () {
                    return loaiupload;
                }
            }

        });
    }
    $scope.ok = function () {
        $scope.data = {
            master_public_camera_id: $scope.item.master_public_camera_id,
            image_path: master_public_camera,
        }
         if ($scope.item.master_public_camera_id === 0 || $scope.item.master_public_camera_id === undefined)
         {
            var dt = JSON.stringify({master_public_camera: JSON.parse(JSON.stringify($scope.data)), company: JSON.parse(JSON.stringify($scope.company)), languages: JSON.parse(JSON.stringify($scope.languageTemp))});
            Utilitymaster_public_camera.addObject("master_public_camera", dt).then(function (response) {
                if (response.data.err === 0) {
                    $uibModalInstance.close(0);
                    swal("Success!", "Success!", "success");
                } else {
                    swal("Warning!", "Save error!", "warning");
                }
            });
            }else{
                var dt = JSON.stringify({master_public_cameras: JSON.parse(JSON.stringify($scope.data)), company: JSON.parse(JSON.stringify($scope.company)), languages: JSON.parse(JSON.stringify($scope.languageTemp))});
                console.log(dt);
                Utilitymaster_public_camera.updateObject($scope.tablemaster_public_cameras, dt).then(function (response) {
                    if (response.data.err === 0) {
                        console.log(response);
                        $uibModalInstance.close(1);
                        swal("Success!", "Success!", "success");
                    } else {
                        swal("Warning!", "Save error!", "warning");
                    }
                });
            }
            
        } 
}
/**update 
 * http://pms-dev.wahsis.net/api/master_public_camera?cm=update&dt={
"company":{"company_id":40743},
"master_public_camera":{
"master_camera_id":1,
"master_camera_name":"Camera 03",
"image_path":"",
"manufactory_name":"HP",
"model":"4959666",
"ip_address":"10.9.11.11",
"port":80,
"users_name":"admin",
"password":"123456",
"created_by_id":16,
"created_by_name":"admin",
"created_date":"2017-11-07"
}}
*/
