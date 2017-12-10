/**MO POPUP LIST MOBILE CAMERA */
{/* 
  
  <div ng-repeat="item in master_public_camera_list">
<img ng-src="{{item.image_path[0].img}}">
                        <b>{{item.master_camera_name}}</b>
                      </div>         
  <button class="btn  btn-primary btn-sm" ng-hide="false" data-ng-click="list_camera_mobile()" ng-disabled="allow[0] === false" type="button">
  <i class="glyphicon glyphicon-plus"></i> {{ "LIST_CAMERA_MOBILE"|translate }}</button> */}

function openpopup_list_camera_mobile(grid, ser) {
  var modalInstance = $uibModal.open({
    templateUrl: 'setting/camera_public/list_camera_mobile.html',
    controller: list_camera_mobileCtrl,
    windowClass: "animated fadeInDown",
    draggable: true,
    size: 'lg',
    locked: true,
    resolve: {
      grid: function () {
        return grid;
      },
      item: function () {
        return ser;
      }
    }
  }).result.then(function () {
    //reload page ngoai sau khi tat popup
  });
}
$scope.list_camera_mobile = function () {
  //         alert("add_employee_dependent")
  //        $rootScope.checkLogout()
  openpopup_list_camera_mobile(0, { master_camera_id: 0 });
};
function list_camera_mobileCtrl(
  $filter,
  $rootScope,
  $uibModal,
  API_URL_UPLOAD,
  UtilityCheckFormatService,
  item,
  grid,
  $http,
  $scope,
  $uibModalInstance,
  API_URL,
  currencyService,
  UtilityService,
  $timeout
) {
  /**
     http://pms-dev.wahsis.net/api/master_public_camera?cm=public_list&dt=
     {"master_public_camera":{
     "master_camera_name":"","manufactory_name":"","model":"","ip_address":"","port":-1,"users_name":"","status":1},
     "company":{"company_id":40743},
     "page":{"page_index":1,"page_size":10000},
     "languages":{"language_id":"vi"}}
   */
  $scope.master_public_camera_list = [];
  $scope.load_master_public_camera = () => {

    var dataED = JSON.stringify({
      "master_public_camera": { "employee_id": item.employee_id },
      "languages": $scope.languageTemp,
      "company": $scope.company
    });

    UtilityService.getListObjectWithParam("master_public_camera", 'public_list', dataED)
      .then(response => {
        if (response.data.err === 0) {
          //alert("success");
          $scope.master_public_camera_list = response.data.dt.master_public_camera_list;
          for (var i = 0; i < $scope.master_public_camera_list.length; i++) {
            $scope.master_public_camera_list[i].stt = i + 1;
          }
          //console.log( $scope.master_public_camera_list);
          console.log($scope.master_public_camera_list);
        }//end if
      }, err => {
        //alert("err");
        //end if
      })//end function
  }
}