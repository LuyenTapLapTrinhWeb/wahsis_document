/**
* compare changing with db property
* KHONG CO SU THAY DOI THI KHONG CHO LUU (chỉ một loại)
*/
$scope.ngChangeEnableSaveByTyping = () => {
    //when update with change something.
    if (item.remark === $scope.it.remark) {
        $scope.flag.ngDisableSaveButton = true;
    } else {
        //when changing
        $scope.flag.ngDisableSaveButton = false;
    }
}
 
/**
* compare changing with db property
* KHONG CO SU THAY DOI THI KHONG CHO LUU (tất cả loại)
*/
$scope.ngChangeShowByTyping = (loai) => {
    if (loai === 'master_camera_name') {
      //when update with change something.
      if (item.master_camera_name === $scope.it.master_camera_name) {
        $scope.flag.ngDisableSaveButton = true;
      } else {
        $scope.flag.ngDisableSaveButton = false;
      }
    } if (loai === 'manufactory_name') {
      if (item.manufactory_name === $scope.it.manufactory_name) {
        $scope.flag.ngDisableSaveButton = true;
      } else {
        $scope.flag.ngDisableSaveButton = false;
      }
    }
  }