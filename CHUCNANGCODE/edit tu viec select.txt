$scope.edit = function() {
    $rootScope.checkLogout();
    var row = $scope.selected;
    if (row.length > 0) {
      var room_posted_for_sale_id = row[0].room_posted_for_sale_id;
      openPopup(room_posted_for_sale_id,row[0]);
    } else {
      swal({
        title: "Please choose item to edit!",
        timer: 1240,
        showConfirmButton: false,
        type: "error"
      });
    }
  };