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
            room_posted_for_sale_id: $scope.selected[0].room_posted_for_sale_id
          };
          var dtJSON = JSON.stringify({
            room_posted_for_sale: JSON.parse(JSON.stringify($scope.object)),
            company: JSON.parse(JSON.stringify($scope.company))
          });
          UtilityService.deleteObject(
            "room_posted_for_sale",
            dtJSON
          ).then(function(response) {
            // console.log(response, dtJSON);
            if (response.data.err === 0) {
              $scope.getData($scope.item_per_page, 1);
              $scope.selected = [];
              swal("Deleted!", "Your has been deleted.", "success");
            } else if (response.data.err === -1) {
              swal("Deleted!", "Delete Error.", "error");
            } else if (response.data.err === -2) {
              swal("Warning!", "Can't delete! This item was used", "warning");
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