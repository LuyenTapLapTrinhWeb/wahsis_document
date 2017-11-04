$scope.delete = function() {
  var previousWindowKeyDown = window.onkeydown;
  $rootScope.checkLogout();
  var row = $scope.selected;
  if (row.length > 0) {
    if (row[0].is_apply !== 1) {
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
          $scope.object = {
            resident_request_service_id: row[0].resident_request_service_id
          };
          var dtJSON = JSON.stringify({
            resident_request_service: JSON.parse(JSON.stringify($scope.object)),
            company: JSON.parse(JSON.stringify($scope.company))
          });
          UtilityService.getListObjectWithParam(
            "resident_request_service",
            "delete",
            dtJSON
          ).then(function(response) {
            if (response.data.err === 0) {
              swal("Notice!", "Delete Success.", "success");
              $scope.selected = [];
              $scope.page = {
                page_index: 1,
                page_size: $scope.item_per_page
              };

              var json = JSON.stringify({
                resident_request_service: JSON.parse(
                  JSON.stringify($scope.str_search)
                ),
                company: JSON.parse(JSON.stringify($scope.company)),
                languages: JSON.parse(JSON.stringify($scope.languageTemp)),
                page: JSON.parse(JSON.stringify($scope.page))
              });
              $scope.get_list(json);
            } else {
              swal("Deleted!", "Delete Error.", "error");
            }
          });
        }
      );
    } else {
      swal("Notice!", "Notification has been sent", "error");
    }
  } else {
    swal({
      title: "Please choose item to delete!",
      timer: 1240,
      showConfirmButton: false,
      type: "error"
    });
  }
};
